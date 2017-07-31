<template>
    <hr v-if="separator" class="dropdown-divider">
    <a v-else-if="!custom && !hasLink"
        class="dropdown-item"
        :class="{
            'is-disabled': disabled,
            'is-paddingless': paddingless,
            'is-active': value !== null && value === $parent.selected
        }"
        @click="selectItem">
        <slot></slot>
    </a>
    <div v-else
        :class="{
            'dropdown-item': !hasLink,
            'is-disabled': disabled,
            'is-paddingless': paddingless,
            'is-active': value !== null && value === $parent.selected,
            'has-link': hasLink
        }"
        @click="selectItem">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'bDropdownItem',
        props: {
            value: {
                type: [String, Number, Boolean, Object, Array, Symbol, Function],
                default: null
            },
            separator: Boolean,
            disabled: Boolean,
            custom: Boolean,
            paddingless: Boolean,
            hasLink: Boolean
        },
        computed: {
            /**
             * Check if item can be clickable.
             */
            isClickable() {
                return !this.separator && !this.disabled && !this.custom
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
