<template>
    <hr v-if="separator" class="dropdown-divider">
    <a v-else-if="!subheader && !hasLink"
        class="dropdown-item"
        :class="{
            'is-disabled': disabled,
            'is-paddingless': paddingless,
            'is-selected': value !== null && value === $parent.selected
        }"
        @click="selectOption">
        <slot></slot>
    </a>
    <div v-else
        :class="{
            'dropdown-item': !hasLink,
            'is-disabled': disabled,
            'is-paddingless': paddingless,
            'is-selected': value !== null && value === $parent.selected,
            'has-link': hasLink
        }"
        @click="selectOption">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'bDropdownOption',
        props: {
            value: {
                type: [String, Number, Boolean, Object, Array, Symbol, Function],
                default: null
            },
            separator: Boolean,
            disabled: Boolean,
            subheader: Boolean,
            paddingless: Boolean,
            hasLink: Boolean
        },
        computed: {
            /**
             * Check if option can be clickable.
             */
            isClickable() {
                return !this.separator && !this.disabled && !this.subheader
            }
        },
        methods: {
            /**
             * Click listener, select the option.
             */
            selectOption() {
                if (!this.isClickable) return

                this.$parent.selectOption(this.value)
                this.$emit('click')
            }
        },
        created() {
            if (!this.$parent.$data._isDropdown) {
                this.$destroy()
                throw new Error('You should wrap bDropdownOption on a bDropdown')
            }
        }
    }
</script>
