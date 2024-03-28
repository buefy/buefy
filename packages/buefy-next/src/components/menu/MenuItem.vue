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
            @click="onClick($event)"
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

<script>
import Icon from '../icon/Icon.vue'
import config from '../../utils/config'
import CompatFallthroughMixin from '../../utils/CompatFallthroughMixin'
import MenuItemContainerMixin from './MenuItemContainerMixin'

export default {
    name: 'BMenuItem',
    components: {
        [Icon.name]: Icon
    },
    mixins: [CompatFallthroughMixin, MenuItemContainerMixin],
    inject: {
        parent: {
            from: 'BMenuItemContainer',
            default: null
        }
    },
    // deprecated, to replace with default 'value' in the next breaking change
    model: {
        prop: 'active',
        event: 'update:active'
    },
    props: {
        label: String,
        active: Boolean,
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
                return config.defaultLinkTags.indexOf(value) >= 0
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
    emits: ['update:active', 'update:expanded'],
    data() {
        return {
            newActive: this.active,
            newExpanded: this.expanded
        }
    },
    computed: {
        ariaRoleMenu() {
            return this.ariaRole === 'menuitem' ? this.ariaRole : null
        }
    },
    watch: {
        active(value) {
            this.newActive = value
        },
        expanded(value) {
            this.newExpanded = value
        }
    },
    methods: {
        onClick(event) {
            if (this.disabled) return
            const menu = this.getMenu()
            this.reset(this.parent, menu)
            this.newExpanded = this.$props.expanded || !this.newExpanded
            this.$emit('update:expanded', this.newExpanded)
            if (menu && menu.activable) {
                this.newActive = true
                this.$emit('update:active', this.newActive)
            }
        },
        reset(parent, menu) {
            if (parent == null) {
                return
            }
            parent.menuItems.forEach((item) => {
                if (item !== this) {
                    this.reset(item, menu)
                    if (!parent.$data._isMenu || (parent.$data._isMenu && parent.accordion)) {
                        item.newExpanded = false
                        item.$emit('update:expanded', item.newActive)
                    }
                    if (menu && menu.activable) {
                        item.newActive = false
                        item.$emit('update:active', item.newActive)
                    }
                }
            })
        },
        getMenu() {
            let parent = this.$parent
            while (parent && !parent.$data._isMenu) {
                parent = parent.$parent
            }
            return parent
        }
    },
    mounted() {
        if (this.parent) {
            this.parent.appendMenuItem(this)
        }
    },
    beforeUnmount() {
        if (this.parent) {
            this.parent.removeMenuItem(this)
        }
    }
}
</script>
