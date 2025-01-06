<template>
    <hr v-if="separator" class="dropdown-divider">
    <a
        v-else-if="!custom && !hasLink"
        class="dropdown-item"
        :class="anchorClasses"
        @click="selectItem"
        :role="ariaRoleItem"
        :tabindex="isFocusable ? 0 : undefined"
    >
        <slot />
    </a>
    <div
        v-else
        :class="itemClasses"
        @click="selectItem"
        :role="ariaRoleItem"
        :tabindex="isFocusable ? 0 : undefined"
    >
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

import Dropdown, { DROPDOWN_INJECTION_KEY } from './Dropdown.vue'
import type { ItemValueType } from './Dropdown.vue'

type DropdownInstance = InstanceType<typeof Dropdown>

export default defineComponent({
    name: 'BDropdownItem',
    inject: {
        parent: {
            from: DROPDOWN_INJECTION_KEY,
            default: undefined
        }
    },
    props: {
        value: {
            type: [String, Number, Boolean, Object, Array, Function] as PropType<ItemValueType>,
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
    emits: {
        click: () => true
    },
    computed: {
        anchorClasses() {
            return {
                'is-disabled': (this.parent as DropdownInstance).disabled || this.disabled,
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
            return this.ariaRole === 'menuitem' || this.ariaRole === 'listitem' ? this.ariaRole : undefined
        },
        isClickable() {
            return !(this.parent as DropdownInstance).disabled &&
                !this.separator &&
                !this.disabled &&
                !this.custom
        },
        isActive() {
            if ((this.parent as DropdownInstance).selected === null) return false
            if ((this.parent as DropdownInstance).multiple) {
                return (this.parent as DropdownInstance).selected.indexOf(this.value) >= 0
            }
            return this.value === (this.parent as DropdownInstance).selected
        },
        isFocusable() {
            return this.hasLink ? false : this.focusable
        }
    },
    methods: {
        /*
        * Click listener, select the item.
        */
        selectItem() {
            if (!this.isClickable) return

            (this.parent as DropdownInstance).selectItem(this.value)
            this.$emit('click')
        }
    }
})
</script>
