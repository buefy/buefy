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
             * Set checked state on all children Checkboxes when v-model change.
             */
            value() {
                this.initChecked()
            }
        },
        methods: {
            /**
             * Update the checkedList property with all the Checkboxes that are active.
             * This is called from a child Checkbox.
             * Emit input event to update the user v-model.
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
             * Set checked state on all children Checkboxes based on v-model.
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
