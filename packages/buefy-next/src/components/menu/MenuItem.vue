<template>
    <li :role="ariaRoleMenu" v-bind="rootAttrs">
        <component
            :is="tag"
            v-bind="fallthroughAttrs"
            :class="{
                'is-active': newActive,
                'is-expanded': newExpanded,
                'is-disabled': disabled,
                'icon-text': icon,
            }"
            @click="onClick()"
        >
            <b-icon
                v-if="icon"
                :icon="icon"
                :pack="iconPack"
                :size="size"
            />
            <span v-if="label"> {{ label }} </span>
            <slot
                v-else
                name="label"
                :expanded="newExpanded"
                :active="newActive"
            />
        </component>
        <!-- sub menu items -->
        <template v-if="$slots.default">
            <transition :name="animation">
                <ul v-show="newExpanded">
                    <slot />
                </ul>
            </transition>
        </template>
    </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import BIcon from '../icon/Icon.vue'
import config from '../../utils/config'
import CompatFallthroughMixin from '../../utils/CompatFallthroughMixin'
import BMenu from './Menu.vue'
import MenuItemContainerMixin from './MenuItemContainerMixin'
import type { MenuItemContainer } from './MenuItemContainerMixin'

type MenuInstance = InstanceType<typeof BMenu>

export default defineComponent({
    name: 'BMenuItem',
    components: {
        BIcon
    },
    mixins: [CompatFallthroughMixin, MenuItemContainerMixin],
    inject: {
        parent: {
            from: 'BMenuItemContainer',
            default: null
        }
    },
    // deprecated, to replace with default 'value' in the next breaking change
    props: {
        label: String,
        modelValue: Boolean,
        expanded: Boolean,
        disabled: Boolean,
        iconPack: String,
        icon: String,
        animation: {
            type: String,
            default: 'slide'
        },
        tag: {
            type: String,
            default: 'a',
            validator: (value) => {
                return config.defaultLinkTags.indexOf(value as string) >= 0
            }
        },
        ariaRole: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: 'is-small'
        }
    },
    emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        'update:modelValue': (_isActive: boolean) => true,
        'update:expanded': (_isExpanded: boolean) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
    },
    data() {
        return {
            newActive: this.modelValue,
            newExpanded: this.expanded
        }
    },
    computed: {
        ariaRoleMenu() {
            return this.ariaRole === 'menuitem' ? this.ariaRole : undefined
        }
    },
    watch: {
        modelValue(value) {
            this.newActive = value
        },
        expanded(value) {
            this.newExpanded = value
        }
    },
    methods: {
        onClick() {
            if (this.disabled) return
            const menu = this.getMenu()
            this.reset(this.parent as MenuItemContainer, menu)
            this.newExpanded = this.$props.expanded || !this.newExpanded
            this.$emit('update:expanded', this.newExpanded)
            if (menu && menu.activable) {
                this.newActive = true
                this.$emit('update:modelValue', this.newActive)
            }
        },
        reset(parent: MenuItemContainer | null, menu: MenuInstance | null) {
            if (parent == null) {
                return
            }
            parent.menuItems.forEach((item) => {
                if (item !== this) {
                    this.reset(item, menu)
                    if (
                        !parent.$data._isMenu ||
                        (parent.$data._isMenu && (parent as MenuInstance).accordion)
                    ) {
                        item.newExpanded = false
                        item.$emit('update:expanded', item.newExpanded)
                    }
                    if (menu && menu.activable) {
                        item.newActive = false
                        item.$emit('update:modelValue', item.newActive)
                    }
                }
            })
        },
        getMenu() {
            let parent = this.parent as MenuItemContainer
            while (parent && !parent.$data._isMenu) {
                parent = parent.parent as MenuItemContainer
            }
            return parent as MenuInstance | null
        }
    },
    mounted() {
        if (this.parent) {
            (this.parent as MenuItemContainer).appendMenuItem(this)
        }
    },
    beforeUnmount() {
        if (this.parent) {
            (this.parent as MenuItemContainer).removeMenuItem(this)
        }
    }
})
</script>
