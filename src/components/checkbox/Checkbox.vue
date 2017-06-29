<template>
    <label class="checkbox"
        :class="{ 'is-disabled': disabled }"
        ref="label"
        :disabled="disabled"
        :tabindex="disabled ? false : 0"
        @keydown.prevent.enter.space="updateValue(!newValue, $event)">
        <input
            v-model="newValue"
            type="checkbox"
            :disabled="disabled"
            :name="name"
            :true-value="trueValue"
            :false-value="falseValue"
            @change="updateValue(newValue, $event)">
        <span class="check"></span>
        <span class="control-label"><slot></slot></span>
    </label>
</template>

<script>
    export default {
        name: 'bCheckbox',
        props: {
            value: [String, Number, Boolean, Object, Array, Symbol, Function],
            disabled: Boolean,
            name: String,
            checked: Boolean,
            nosync: Boolean,
            trueValue: {
                type: [String, Number, Boolean, Object, Array, Symbol, Function],
                default: true
            },
            falseValue: {
                type: [String, Number, Boolean, Object, Array, Symbol, Function],
                default: false
            },
            customValue: [String, Number, Boolean, Object, Array, Symbol, Function]
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
        },
        methods: {
            /**
             * Set the newValue.
             * Emit change event.
             */
            updateValue(newValue, $event) {
                this.newValue = newValue
                this.$emit('change', newValue, $event)
            }
        }
    }
</script>
