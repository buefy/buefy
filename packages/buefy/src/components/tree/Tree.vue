<template>
    <ul
        ref="rootEl"
        class="b-tree"
        :class="[size]"
        role="tree"
        :aria-label="ariaLabel || undefined"
        :aria-multiselectable="selectionMode === 'multiple' || selectionMode === 'checkbox' || undefined"
        @keydown="onKeydown"
    >
        <b-tree-node
            v-for="(item, idx) in data"
            :key="resolveKey(item, idx)"
            :data="item"
            :depth="1"
            :setsize="data.length"
            :posinset="idx + 1"
        />
        <li
            v-if="!data.length"
            class="b-tree-empty"
            role="presentation"
        >
            <slot name="empty">No data</slot>
        </li>
    </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import BTreeNode from './TreeNode.vue'
import type { BTreeProvide } from './TreeTypes'
import {
    DEFAULT_FIELDS,
    mergeFields,
    getNodeKey,
    getDescendantKeys,
    computeCheckState,
    addToChecked,
    removeFromChecked
} from '../../utils/TreeHelpers'
import type { TreeNodeData, TreeFieldMapping, SelectionMode } from '../../utils/TreeHelpers'

export default defineComponent({
    name: 'BTree',

    components: { BTreeNode },

    provide(): { BTree: BTreeProvide } {
        return { BTree: this as unknown as BTreeProvide }
    },

    props: {
        data: {
            type: Array as PropType<TreeNodeData[]>,
            required: true
        },
        fields: {
            type: Object as PropType<Partial<TreeFieldMapping>>,
            default: () => ({})
        },
        selectionMode: {
            type: String as PropType<SelectionMode>,
            default: 'none'
        },
        selected: {
            type: [String, Number, Array] as PropType<string | number | unknown[] | null>,
            default: null
        },
        expandedKeys: {
            type: Array as PropType<unknown[]>,
            default: () => []
        },
        checkedKeys: {
            type: Array as PropType<unknown[]>,
            default: () => []
        },
        defaultExpandAll: {
            type: Boolean,
            default: false
        },
        expandOnClickNode: {
            type: Boolean,
            default: true
        },
        lazy: {
            type: Boolean,
            default: false
        },
        load: {
            type: Function as PropType<(node: TreeNodeData) => Promise<TreeNodeData[]>>,
            default: null
        },
        filter: {
            type: [String, Function] as PropType<string | ((node: TreeNodeData) => boolean)>,
            default: null
        },
        size: {
            type: String,
            default: undefined
        },
        ariaLabel: {
            type: String,
            default: undefined
        }
    },

    emits: {
        'update:selected': (_value: unknown) => true,
        'update:expandedKeys': (_value: unknown[]) => true,
        'update:checkedKeys': (_value: unknown[]) => true,
        'select': (_data: TreeNodeData, _key: unknown) => true,
        'check': (_data: TreeNodeData, _checked: boolean, _indeterminate: boolean) => true,
        'expand': (_data: TreeNodeData, _key: unknown) => true,
        'collapse': (_data: TreeNodeData, _key: unknown) => true,
        'node-click': (_data: TreeNodeData, _key: unknown) => true,
        'load-start': (_data: TreeNodeData, _key: unknown) => true,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        'load-error': (_data: TreeNodeData, _key: unknown, _err: any) => true
    },

    data() {
        return {
            internalExpandedKeys: this.defaultExpandAll ? [] : ([...this.expandedKeys] as unknown[]),
            internalCheckedKeys: [...this.checkedKeys] as unknown[],
            internalSelected: (this.selectionMode === 'multiple'
                ? (Array.isArray(this.selected) ? [...this.selected] : [])
                : (this.selected ?? null)) as unknown,
            focusedKey: null as unknown,
            lazyChildrenCache: {} as Record<string, TreeNodeData[]>,
            loadingKeys: [] as unknown[],
            loadErrorKeys: [] as unknown[],
            nodeDataMap: {} as Record<string, TreeNodeData>
        }
    },

    computed: {
        resolvedFields(): TreeFieldMapping {
            return mergeFields(this.fields)
        }
    },

    watch: {
        expandedKeys(val: unknown[]) {
            this.internalExpandedKeys = [...val]
        },
        checkedKeys(val: unknown[]) {
            this.internalCheckedKeys = [...val]
        },
        selected(val: unknown) {
            if (this.selectionMode === 'multiple') {
                this.internalSelected = Array.isArray(val) ? [...val] : []
            } else {
                this.internalSelected = val
            }
        }
    },

    mounted() {
        if (this.defaultExpandAll) {
            this.internalExpandedKeys = this.collectAllKeys(this.data)
        }
    },

    methods: {
        resolveKey(item: TreeNodeData, fallbackIdx: number): string | number | symbol {
            const k = getNodeKey(item, this.resolvedFields)
            return k !== undefined && k !== null ? k as string | number | symbol : fallbackIdx
        },

        collectAllKeys(nodes: TreeNodeData[]): unknown[] {
            const keys: unknown[] = []
            for (const node of nodes) {
                const k = getNodeKey(node, this.resolvedFields)
                if (k !== undefined && k !== null) keys.push(k)
                const children = node[this.resolvedFields.children]
                if (Array.isArray(children)) {
                    keys.push(...this.collectAllKeys(children as TreeNodeData[]))
                }
            }
            return keys
        },

        registerNode(key: unknown, nodeData: TreeNodeData): void {
            this.nodeDataMap[String(key)] = nodeData
        },

        unregisterNode(key: unknown): void {
            delete this.nodeDataMap[String(key)]
        },

        toggleExpand(key: unknown, nodeData: TreeNodeData): void {
            const idx = this.internalExpandedKeys.indexOf(key)
            if (idx >= 0) {
                this.internalExpandedKeys.splice(idx, 1)
                this.$emit('collapse', nodeData, key)
            } else {
                this.internalExpandedKeys.push(key)
                this.$emit('expand', nodeData, key)
                if (this.lazy && key !== null && key !== undefined &&
                    !this.lazyChildrenCache[String(key)]) {
                    this.loadNode(key, nodeData)
                }
            }
            this.$emit('update:expandedKeys', [...this.internalExpandedKeys])
        },

        async loadNode(key: unknown, nodeData: TreeNodeData): Promise<void> {
            if (!this.load) return
            this.loadingKeys = [...this.loadingKeys, key]
            this.$emit('load-start', nodeData, key)
            try {
                const children = await this.load(nodeData)
                this.lazyChildrenCache = {
                    ...this.lazyChildrenCache,
                    [String(key)]: children
                }
                this.loadingKeys = this.loadingKeys.filter(k => k !== key)
                this.loadErrorKeys = this.loadErrorKeys.filter(k => k !== key)
            } catch (err) {
                this.loadingKeys = this.loadingKeys.filter(k => k !== key)
                this.loadErrorKeys = [...this.loadErrorKeys, key]
                this.$emit('load-error', nodeData, key, err)
            }
        },

        toggleCheck(key: unknown, nodeData: TreeNodeData): void {
            const fields = this.resolvedFields
            const descendantKeys = getDescendantKeys(nodeData, fields)
            const currentState = computeCheckState(nodeData, this.internalCheckedKeys, fields)
            let newKeys: unknown[]
            if (currentState === 'checked') {
                newKeys = removeFromChecked(this.internalCheckedKeys, [key, ...descendantKeys])
            } else {
                newKeys = addToChecked(this.internalCheckedKeys, [key, ...descendantKeys])
            }
            this.internalCheckedKeys = newKeys
            this.$emit('update:checkedKeys', [...newKeys])
            this.$emit('check', nodeData, newKeys.includes(key), currentState === 'indeterminate')
        },

        handleSelect(key: unknown, nodeData: TreeNodeData): void {
            if (this.selectionMode === 'single') {
                this.internalSelected = this.internalSelected === key ? null : key
                this.$emit('update:selected', this.internalSelected)
                this.$emit('select', nodeData, key)
            } else if (this.selectionMode === 'multiple') {
                const arr = this.internalSelected as unknown[]
                const idx = arr.indexOf(key)
                if (idx >= 0) {
                    arr.splice(idx, 1)
                } else {
                    arr.push(key)
                }
                this.$emit('update:selected', [...arr])
                this.$emit('select', nodeData, key)
            }
        },

        handleNodeClick(key: unknown, nodeData: TreeNodeData): void {
            this.$emit('node-click', nodeData, key)
            if (this.selectionMode === 'checkbox') {
                this.toggleCheck(key, nodeData)
            } else {
                this.handleSelect(key, nodeData)
            }
            if (this.expandOnClickNode) {
                this.toggleExpand(key, nodeData)
            }
        },

        setFocused(key: unknown): void {
            this.focusedKey = key
        },

        onKeydown(e: KeyboardEvent): void {
            const el = this.$el as HTMLElement
            const items = Array.from(
                el.querySelectorAll<HTMLElement>('[role="treeitem"]')
            )
            if (!items.length) return

            const active = document.activeElement as HTMLElement
            let currentIdx = items.indexOf(active)
            if (currentIdx < 0) currentIdx = items.findIndex(i => i.tabIndex === 0)
            if (currentIdx < 0) currentIdx = 0

            let nextIdx = currentIdx

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault()
                    nextIdx = Math.min(currentIdx + 1, items.length - 1)
                    break
                case 'ArrowUp':
                    e.preventDefault()
                    nextIdx = Math.max(currentIdx - 1, 0)
                    break
                case 'Home':
                    e.preventDefault()
                    nextIdx = 0
                    break
                case 'End':
                    e.preventDefault()
                    nextIdx = items.length - 1
                    break
                case 'ArrowRight': {
                    e.preventDefault()
                    const cur = items[currentIdx]
                    if (!cur) break
                    if (cur.getAttribute('aria-expanded') === 'false') {
                        const keyStr = cur.getAttribute('data-node-key')
                        if (keyStr !== null) {
                            const nodeData = this.nodeDataMap[keyStr]
                            if (nodeData) this.toggleExpand(keyStr, nodeData)
                        }
                    } else if (cur.getAttribute('aria-expanded') === 'true') {
                        nextIdx = Math.min(currentIdx + 1, items.length - 1)
                    }
                    break
                }
                case 'ArrowLeft': {
                    e.preventDefault()
                    const cur = items[currentIdx]
                    if (!cur) break
                    if (cur.getAttribute('aria-expanded') === 'true') {
                        const keyStr = cur.getAttribute('data-node-key')
                        if (keyStr !== null) {
                            const nodeData = this.nodeDataMap[keyStr]
                            if (nodeData) this.toggleExpand(keyStr, nodeData)
                        }
                    } else {
                        let parent = cur.parentElement
                        while (parent && parent !== el) {
                            if (parent.getAttribute('role') === 'treeitem') {
                                const pidx = items.indexOf(parent as HTMLElement)
                                if (pidx >= 0) nextIdx = pidx
                                break
                            }
                            parent = parent.parentElement
                        }
                    }
                    break
                }
                case 'Enter':
                case ' ':
                    e.preventDefault()
                    items[currentIdx]?.click()
                    break
            }

            if (nextIdx !== currentIdx) {
                items[nextIdx].focus()
            }
        }
    }
})
</script>
