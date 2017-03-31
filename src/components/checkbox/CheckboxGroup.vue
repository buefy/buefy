<template>
    <div class="checkbox-group field is-grouped">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'bCheckboxGroup',
        props: {
            value: Array
        },
        data() {
            return {
                checkedList: [],
                isCheckboxGroup: true
            }
        },
        methods: {
            updateValue() {
                this.checkedList = []
                this.$children.forEach((child) => {
                    child.newValue && this.checkedList.push(child.label)
                })
                this.$emit('input', this.checkedList)
            },
            initChecked() {
                this.$children.forEach((child) => {
                    if (this.value && this.value.indexOf(child.label) >= 0) {
                        child.newValue = true
                    }
                })
            }
        },
        mounted() {
            this.initChecked()
        }
    }
</script>
