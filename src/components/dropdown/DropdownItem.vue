<template>
    <hr v-if="separator" class="dropdown-divider">
    <a
        v-else-if="!custom && !hasLink"
        class="dropdown-item"
        :class="anchorClasses"
        @click="selectItem"
        :role="ariaRoleItem"
        :tabindex="isFocusable ? 0 : null">
        <slot/>
    </a>
    <div
        v-else
        :class="itemClasses"
        @click="selectItem"
        :role="ariaRoleItem"
        :tabindex="isFocusable ? 0 : null">
        <slot/>
    </div>
</template>

<script>
import InjectedChildMixin from '../../utils/InjectedChildMixin'

export default {
    name: 'BDropdownItem',
    mixins: [InjectedChildMixin('dropdown')],
    props: {
        value: {
            type: [String, Number, Boolean, Object, Array, Function],
            default: null
        },
        separator: Boolean,
        disabled: Boolean,
        custom: Boolean,
        focusable: {
            type: Boolean,
            default: true
        },
        paddingless: Boolean,
        hasLink: Boolean,
        ariaRole: {
            type: String,
            default: ''
        }
    },
    computed: {
        anchorClasses() {
            return {
                'is-disabled': this.parent.disabled || this.disabled,
                'is-paddingless': this.paddingless,
                'is-active': this.isActive
            }
        },
        itemClasses() {
            return {
                'dropdown-item': !this.hasLink,
                'is-disabled': this.disabled,
                'is-paddingless': this.paddingless,
                'is-active': this.isActive,
                'has-link': this.hasLink
            }
        },
        ariaRoleItem() {
            return this.ariaRole === 'menuitem' || this.ariaRole === 'listitem' ? this.ariaRole : null
        },
        isClickable() {
            return !this.parent.disabled && !this.separator && !this.disabled && !this.custom
        },
        isActive() {
            if (this.parent.selected === null) return false
            if (this.parent.multiple) return this.parent.selected.indexOf(this.value) >= 0
            return this.value === this.parent.selected
        },
        isFocusable() {
            return this.hasLink ? false : this.focusable
        }
    },
    methods: {
        /**
        * Click listener, select the item.
        */
        selectItem() {
            if (!this.isClickable) return

            this.parent.selectItem(this.value)
            this.$emit('click')
        }
    }
}
</script>
