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
            v-model="newValue"
            type="checkbox"
            @click.stop
            :name="name"
            :value="nativeValue"
            :disabled="disabled"
            :true-value="trueValue"
            :false-value="falseValue">
        <span class="check" :class="[{ 'is-elastic': isMouseDown }, type]"/>
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
                isMouseDown: false
            }
        },
        computed: {
            newValue: {
                get() {
                    return this.value
                },
                set(value) {
                    this.$emit('input', value)
                }
            }
        }
    }
</script>
