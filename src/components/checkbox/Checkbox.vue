<template>
    <label class="checkbox" :disabled="disabled" :class="{ 'is-disabled': disabled }">
        <input
            type="checkbox"
            :disabled="disabled"
            :name="name"
            v-model="newValue"
            @change="$emit('change', newValue, $event)">
        <span><slot></slot></span>
    </label>
</template>

<script>
    export default {
        name: 'bCheckbox',
        props: {
            value: Boolean,
            disabled: Boolean,
            name: String,
            checked: Boolean,
            nosync: Boolean,
            customValue: [String, Number, Boolean]
        },
        data() {
            return {
                newValue: this.value || this.checked
            }
        },
        watch: {
            /**
             * When v-model change, set internal value.
             */
            value(value) {
                this.newValue = value
            },

            /**
             * Emit input event to update the user v-model.
             * Call updateValue from parent if it's a Checkbox Group.
             */
            newValue(value) {
                if (this.nosync) {
                    // Used internally by Table, will update only by prop
                    this.newValue = this.value
                    return
                }
                this.$emit('input', value)
                this.$parent.isCheckboxGroup && this.$parent.updateValue()
            }
        }
    }
</script>
