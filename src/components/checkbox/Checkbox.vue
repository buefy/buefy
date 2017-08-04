<template>
    <label class="checkbox"
        :class="{ 'is-disabled': disabled }"
        ref="label"
        :disabled="disabled"
        :tabindex="disabled ? false : 0"
        @keydown.prevent.enter.space="$refs.label.click()">
        <input v-model="newValue"
            type="checkbox"
            :disabled="disabled"
            :name="name"
            :value="nativeValue"
            :true-value="trueValue"
            :false-value="falseValue">
        <span class="check"></span>
        <span class="control-label"><slot></slot></span>
    </label>
</template>

<script>
    export default {
        name: 'bCheckbox',
        props: {
            value: {},
            nativeValue: {},
            trueValue: {
                type: [String, Number, Boolean, Function, Object, Array, Symbol],
                default: true
            },
            falseValue: {
                type: [String, Number, Boolean, Function, Object, Array, Symbol],
                default: false
            },
            disabled: Boolean,
            name: String
        },
        data() {
            return {
                newValue: this.value
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
             * Call update event from parent if it's a bCheckboxGroup.
             */
            newValue(value) {
                this.$emit('input', value)
                this.$parent.$data._isCheckboxGroup && this.$parent.update()
            }
        }
    }
</script>
