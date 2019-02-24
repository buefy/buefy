<template>
    <hr v-if="separator" class="dropdown-divider">
    <a
        v-else-if="!custom && !hasLink"
        class="dropdown-item"
        :class="anchorClasses"
        @click="selectItem"
        :role="ariaRoleItem"
        tabindex="0">
        <slot/>
    </a>
    <div
        v-else
        :class="itemClasses"
        @click="selectItem"
        :role="ariaRoleItem"
        tabindex="0">
        <slot/>
    </div>
</template>

<script>
    export default {
        name: 'BDropdownItem',
        props: {
            value: {
                type: [String, Number, Boolean, Object, Array, Symbol, Function],
                default: null
            },
            separator: Boolean,
            disabled: Boolean,
            custom: Boolean,
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
                    'is-disabled': this.$parent.disabled || this.disabled,
                    'is-paddingless': this.paddingless,
                    'is-active': this.value !== null && this.value === this.$parent.selected
                }
            },
            itemClasses() {
                return {
                    'dropdown-item': !this.hasLink,
                    'is-disabled': this.disabled,
                    'is-paddingless': this.paddingless,
                    'is-active': this.value !== null && this.value === this.$parent.selected,
                    'has-link': this.hasLink
                }
            },
            ariaRoleItem() {
                return this.ariaRole === 'menuitem' || this.ariaRole === 'listitem' ? this.ariaRole : null
            },
            /**
             * Check if item can be clickable.
             */
            isClickable() {
                return !this.$parent.disabled && !this.separator && !this.disabled && !this.custom
            }
        },
        methods: {
            /**
             * Click listener, select the item.
             */
            selectItem() {
                if (!this.isClickable) return

                this.$parent.selectItem(this.value)
                this.$emit('click')
            }
        },
        created() {
            if (!this.$parent.$data._isDropdown) {
                this.$destroy()
                throw new Error('You should wrap bDropdownItem on a bDropdown')
            }
        }
    }
</script>
