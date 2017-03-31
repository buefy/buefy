<template>
    <div class="radio-group field" :class="isRadioButtonGroup ? 'has-addons' : 'is-grouped'">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'bRadioGroup',
        props: {
            value: [String, Number, Boolean]
        },
        data() {
            return {
                isRadioButtonGroup: false
            }
        },
        watch: {
            value() {
                this.findChecked()
            }
        },
        methods: {
            updateValue(value) {
                this.$emit('input', value)
            },
            findChecked() {
                this.$children.forEach((child) => {
                    if (child.isRadioButton) {
                        this.isRadioButtonGroup = true
                    }

                    if (this.value === child.label) {
                        child.isChecked = true
                    } else {
                        child.isChecked = false
                    }
                })
            }
        },
        mounted() {
            this.findChecked()
        }
    }
</script>
