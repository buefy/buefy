<template>
    <li
        class="b-tree-node"
        :class="{
            'is-expanded': isExpanded,
            'is-selected': isSelected,
            'is-disabled': isDisabled,
            'is-loading': isLoading,
            'has-load-error': hasLoadError
        }"
        role="treeitem"
        :aria-expanded="hasExpandToggle ? isExpanded : undefined"
        :aria-selected="tree.selectionMode !== 'checkbox' && tree.selectionMode !== 'none'
            ? isSelected
            : undefined"
        :aria-checked="tree.selectionMode === 'checkbox'
            ? (checkState === 'indeterminate' ? 'mixed' : checkState === 'checked')
            : undefined"
        :aria-level="depth"
        :aria-setsize="setsize"
        :aria-posinset="posinset"
        :aria-disabled="isDisabled || undefined"
        :tabindex="isFocused ? 0 : -1"
        :data-node-key="myKeyStr"
        @click.stop="onClick"
        @focus="onFocus"
    >
        <div class="b-tree-node-content">
            <span
                class="b-tree-node-toggle"
                :class="{ 'is-invisible': !hasExpandToggle }"
                @click.stop="onToggleClick"
            >
                <b-icon
                    v-if="isLoading"
                    icon="loading"
                    class="b-tree-loading-icon"
                />
                <b-icon
                    v-else-if="hasExpandToggle"
                    :icon="isExpanded ? 'menu-down' : 'menu-right'"
                />
            </span>

            <span
                v-if="tree.selectionMode === 'checkbox'"
                class="b-tree-node-checkbox"
                @click.stop="onCheckboxClick"
            >
                <b-checkbox
                    :model-value="checkState === 'checked'"
                    :indeterminate="checkState === 'indeterminate'"
                    :disabled="isDisabled"
                    tabindex="-1"
                    @update:model-value="onCheckboxClick"
                />
            </span>

            <component v-if="iconSlotComponent" :is="iconSlotComponent" />
            <template v-else>
                <b-icon
                    v-if="hasExpandToggle || isLoading"
                    :icon="isExpanded ? 'folder-open-outline' : 'folder-outline'"
                    class="b-tree-node-icon"
                />
                <b-icon
                    v-else
                    icon="file-outline"
                    class="b-tree-node-icon"
                />
            </template>

            <span class="b-tree-node-label">
                <component v-if="labelSlotComponent" :is="labelSlotComponent" />
                <template v-else>{{ label }}</template>
            </span>

            <span v-if="hasLoadError" class="b-tree-node-error">
                <b-icon icon="alert-circle-outline" type="is-danger" />
            </span>
        </div>

        <ul
            v-if="isExpanded && effectiveChildren.length"
            class="b-tree-children"
            role="group"
        >
            <b-tree-node
                v-for="(child, idx) in effectiveChildren"
                :key="resolveChildKey(child, idx)"
                :data="child"
                :depth="depth + 1"
                :setsize="effectiveChildren.length"
                :posinset="idx + 1"
            />
        </ul>
    </li>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import type { PropType, Component } from 'vue'
import BIcon from '../icon/Icon.vue'
import BCheckbox from '../checkbox/Checkbox.vue'
import type { BTreeProvide } from './TreeTypes'
import {
    getLabel,
    getChildren,
    getIsLeaf,
    getNodeKey,
    isNodeDisabled,
    computeCheckState,
    nodeOrDescendantMatches
} from '../../utils/TreeHelpers'
import type { TreeNodeData } from '../../utils/TreeHelpers'

export default defineComponent({
    name: 'BTreeNode',

    components: { BIcon, BCheckbox },

    props: {
        data: {
            type: Object as PropType<TreeNodeData>,
            required: true
        },
        depth: {
            type: Number,
            required: true
        },
        setsize: {
            type: Number,
            required: true
        },
        posinset: {
            type: Number,
            required: true
        }
    },

    setup() {
        const tree = inject<BTreeProvide>('BTree')
        if (!tree) throw new Error('BTreeNode must be used inside BTree')
        return { tree }
    },

    computed: {
        fields() {
            return this.tree.resolvedFields
        },

        myKey(): unknown {
            return getNodeKey(this.data, this.fields)
        },

        myKeyStr(): string {
            return String(this.myKey ?? '')
        },

        label(): string {
            return getLabel(this.data, this.fields)
        },

        ownChildren(): TreeNodeData[] {
            return getChildren(this.data, this.fields) ?? []
        },

        lazyChildren(): TreeNodeData[] {
            if (!this.tree.lazy || this.myKey === undefined || this.myKey === null) return []
            return this.tree.lazyChildrenCache[this.myKeyStr] ?? []
        },

        effectiveChildren(): TreeNodeData[] {
            return this.ownChildren.length > 0 ? this.ownChildren : this.lazyChildren
        },

        isLeafNode(): boolean {
            return getIsLeaf(this.data, this.fields)
        },

        isDisabled(): boolean {
            return isNodeDisabled(this.data, this.fields)
        },

        isExpanded(): boolean {
            return this.tree.internalExpandedKeys.includes(this.myKey)
        },

        isSelected(): boolean {
            if (this.tree.selectionMode === 'single') {
                return this.tree.internalSelected === this.myKey
            }
            if (this.tree.selectionMode === 'multiple') {
                return (this.tree.internalSelected as unknown[]).includes(this.myKey)
            }
            return false
        },

        checkState() {
            if (this.tree.selectionMode !== 'checkbox') return 'unchecked' as const
            return computeCheckState(this.data, this.tree.internalCheckedKeys, this.fields)
        },

        isLoading(): boolean {
            return this.tree.loadingKeys.includes(this.myKey)
        },

        hasLoadError(): boolean {
            return this.tree.loadErrorKeys.includes(this.myKey)
        },

        isFocused(): boolean {
            if (this.tree.focusedKey === null && this.posinset === 1 && this.depth === 1) {
                return true
            }
            return this.tree.focusedKey === this.myKey
        },

        hasExpandToggle(): boolean {
            if (this.isLeafNode) return false
            if (this.ownChildren.length > 0) return true
            if (this.tree.lazy && !this.isLoading) return true
            return false
        },

        isVisible(): boolean {
            if (!this.tree.filter) return true
            return nodeOrDescendantMatches(this.data, this.tree.filter, this.fields)
        },

        labelSlotComponent(): Component | null {
            const slot = this.tree.$slots['default']
            if (!slot) return null
            const self = this
            return (() => slot({
                node: self.data,
                data: self.data,
                depth: self.depth,
                expanded: self.isExpanded,
                checked: self.checkState === 'checked',
                indeterminate: self.checkState === 'indeterminate',
                selected: self.isSelected
            })) as Component
        },

        iconSlotComponent(): Component | null {
            const slot = this.tree.$slots['icon']
            if (!slot) return null
            const self = this
            return (() => slot({ node: self.data, expanded: self.isExpanded })) as Component
        }
    },

    mounted() {
        if (this.myKey !== undefined && this.myKey !== null) {
            this.tree.registerNode(this.myKey, this.data)
        }
    },

    beforeUnmount() {
        if (this.myKey !== undefined && this.myKey !== null) {
            this.tree.unregisterNode(this.myKey)
        }
    },

    methods: {
        resolveChildKey(child: TreeNodeData, idx: number): string | number | symbol {
            const k = getNodeKey(child, this.fields)
            return k !== undefined && k !== null ? k as string | number | symbol : idx
        },

        onClick(): void {
            if (this.isDisabled) return
            this.tree.handleNodeClick(this.myKey, this.data)
        },

        onToggleClick(): void {
            if (this.isDisabled) return
            if (this.hasExpandToggle) {
                this.tree.toggleExpand(this.myKey, this.data)
            }
        },

        onCheckboxClick(): void {
            if (this.isDisabled) return
            this.tree.toggleCheck(this.myKey, this.data)
        },

        onFocus(): void {
            this.tree.setFocused(this.myKey)
        }
    }
})
</script>
