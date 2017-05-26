<template>
    <li class="option"
        :class="{
            'is-subheader': subheader,
            'is-disabled': disabled,
            'is-separator': separator,
            'is-selected': value === $parent.$parent.selected
        }"
        @click="$parent.$parent.selectOption(value, isClickable)">

        <slot></slot>

    </li>
</template>

<script>
    import Icon from '../icon'

    export default {
        name: 'bDropdownOption',
        components: {
            [Icon.name]: Icon
        },
        props: {
            value: [String, Number, Object, Boolean],
            separator: Boolean,
            disabled: Boolean,
            subheader: Boolean
        },
        computed: {
            label() {
                return this.$slots.default !== undefined && this.$slots.default.length > 0
                    ? this.label || this.$slots.default[0].text.trim()
                    : ''
            },
            isClickable() {
                return !this.separator && !this.disabled && !this.subheader
            }
        },
        created() {
            // $parent is actually the transition-group
            if (!this.$parent.$parent.isDropdownComponent) {
                this.$destroy()
                throw new Error('You should wrap bDropdownOption on a bDropdown')
            }
        }
    }
</script>
