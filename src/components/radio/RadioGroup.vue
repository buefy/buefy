<template>
    <div class="radio-group" :class="{ 'field has-addons': isRadioButtonGroup }">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'bRadioGroup',
        props: {
            value: [String, Number, Boolean],
            buttonSize: String
        },
        data() {
            return {
                isRadioGroupComponent: true, // Used internally by Radio and Radio Button
                isRadioButtonGroup: false // Used internally by Radio Button
            }
        },
        watch: {
            value() {
                this.findChecked()
            }
        },
        methods: {
            updateValue(value, event) {
                this.$emit('change', value, event)
                this.$emit('input', value)
            },
            findChecked() {
                this.$children.forEach((child) => {
                    child.size = this.buttonSize
                    this.isRadioButtonGroup = child.isRadioButton
                    child.isChecked = this.value === child.value
                })
            }
        },
        mounted() {
            this.findChecked()
        }
    }
</script>
