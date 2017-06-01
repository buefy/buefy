<template>
    <li class="option"
        :class="{
            'is-subheader': subheader,
            'is-disabled': disabled,
            'is-separator': separator,
            'is-selected': value !== null && value === $parent.$parent.selected
        }"
        @click="$parent.$parent.selectOption(value, isClickable)">

        <slot></slot>
    </li>
</template>

<script>
    export default {
        name: 'bDropdownOption',
        props: {
            value: {
                type: [String, Number, Object, Boolean, Array],
                default: null
            },
            separator: Boolean,
            disabled: Boolean,
            subheader: Boolean
        },
        computed: {
            isClickable() {
                return !this.separator && !this.disabled && !this.subheader
            }
        },
        created() {
            // $parent is actually the transition-group
            if (!this.$parent.$parent.$data._isDropdown) {
                this.$destroy()
                throw new Error('You should wrap bDropdownOption on a bDropdown')
            }
        }
    }
</script>
