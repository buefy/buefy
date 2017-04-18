<template>
    <div class="checkbox-group">
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
                isCheckboxGroup: true // Used internally by Checkbox
            }
        },
        watch: {
            /**
            * Sets checked state on all children Checkboxes when v-model changes.
            */
            value() {
                this.initChecked()
            }
        },
        methods: {
            /**
            * Update the checkedList property with all the Checkboxes that are active.
            * Called from Checkbox child.
            */
            updateValue() {
                this.checkedList = []
                this.$children.forEach((child) => {
                    child.newValue && this.checkedList.push(child.customValue)
                })
                this.$emit('input', this.checkedList)
                this.$emit('change', this.checkedList)
            },

            /**
            * Sets checked state on all children Checkboxes based on v-model.
            */
            initChecked() {
                this.$children.forEach((child) => {
                    if (this.value && this.value.indexOf(child.customValue) >= 0) {
                        child.newValue = true
                    } else {
                        child.newValue = false
                    }
                })
            }
        },
        mounted() {
            this.initChecked()
        }
    }
</script>
