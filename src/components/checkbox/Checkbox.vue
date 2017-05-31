<template>
    <label class="checkbox"
        :class="{ 'is-disabled': disabled }"
        ref="label"
        :disabled="disabled"
        :tabindex="disabled ? false : 0"
        @keydown.prevent.enter.space="newValue = !newValue">
        <input
            type="checkbox"
            :disabled="disabled"
            :name="name"
            v-model="newValue"
            @change="$emit('change', newValue, $event)">
        <span class="check"></span>
        <span class="control-label"><slot></slot></span>
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
            customValue: [String, Number, Boolean, Object]
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
