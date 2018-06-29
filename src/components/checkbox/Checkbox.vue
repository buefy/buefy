<template>
    <label
        class="b-checkbox checkbox"
        :class="[size, { 'is-disabled': disabled }]"
        ref="label"
        :disabled="disabled"
        :tabindex="disabled ? false : 0"
        @keydown.prevent.enter.space="$refs.label.click()">
        <input
            v-model="newValue"
            type="checkbox"
            :disabled="disabled"
            :name="name"
            :value="nativeValue"
            :true-value="trueValue"
            :false-value="falseValue">
        <span class="check" :class="type" />
        <span class="control-label"><slot/></span>
    </label>
</template>

<script>
    export default {
        name: 'BCheckbox',
        props: {
            value: [String, Number, Boolean, Function, Object, Array, Symbol],
            nativeValue: [String, Number, Boolean, Function, Object, Array, Symbol],
            type: String,
            disabled: Boolean,
            name: String,
            size: String,
            trueValue: {
                type: [String, Number, Boolean, Function, Object, Array, Symbol],
                default: true
            },
            falseValue: {
                type: [String, Number, Boolean, Function, Object, Array, Symbol],
                default: false
            }
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
             */
            newValue(value) {
                this.$emit('input', value)
            }
        }
    }
</script>
