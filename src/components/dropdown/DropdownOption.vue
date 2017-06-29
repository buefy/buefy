<template>
    <li class="option"
        :class="{
            'is-subheader': subheader,
            'is-disabled': disabled,
            'is-separator': separator,
            'is-selected': value !== null && value === $parent.$parent.selected,
            'has-link': hasLink
        }"
        @click="selectOption">

        <slot></slot>
    </li>
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

                this.$parent.$parent.selectOption(this.value)
                this.$emit('click')
            }
        },
        created() {
            // Parent is actually the transition-group
            if (!this.$parent.$parent.$data._isDropdown) {
                this.$destroy()
                throw new Error('You should wrap bDropdownOption on a bDropdown')
            }
        }
    }
</script>
