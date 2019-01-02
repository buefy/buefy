<template>
    <label
        class="switch"
        :class="[size, { 'is-disabled': disabled }]"
        ref="label"
        :disabled="disabled"
        :tabindex="disabled ? false : 0"
        @keydown.prevent.enter.space="$refs.label.click()"
        @mousedown="isMouseDown = true"
        @mouseup="isMouseDown = false"
        @mouseout="isMouseDown = false"
        @blur="isMouseDown = false">
        <input
            v-model="computedValue"
            type="checkbox"
            @click.stop
            :disabled="disabled"
            :name="name"
            :required="required"
            :value="nativeValue"
            :true-value="trueValue"
            :false-value="falseValue">
        <span class="check" :class="[{ 'is-elastic': isMouseDown && !disabled }, type]"/>
        <span class="control-label"><slot/></span>
    </label>
</template>

<script>
    export default {
        name: 'BSwitch',
        props: {
            value: [String, Number, Boolean, Function, Object, Array, Symbol],
            nativeValue: [String, Number, Boolean, Function, Object, Array, Symbol],
            disabled: Boolean,
            type: String,
            name: String,
            required: Boolean,
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
                newValue: this.value,
                isMouseDown: false
            }
        },
        computed: {
            computedValue: {
                get() {
                    return this.newValue
                },
                set(value) {
                    this.newValue = value
                    this.$emit('input', value)
                }
            }
        },
        watch: {
            /**
             * When v-model change, set internal value.
             */
            value(value) {
                this.newValue = value
            }
        }
    }
</script>
