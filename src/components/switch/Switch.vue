<template>
    <label
        class="switch"
        :class="newClass"
        ref="label"
        :disabled="disabled"
        @click="focus"
        @keydown.prevent.enter="$refs.label.click()"
        @mousedown="isMouseDown = true"
        @mouseup="isMouseDown = false"
        @mouseout="isMouseDown = false"
        @blur="isMouseDown = false">
        <input
            v-model="computedValue"
            type="checkbox"
            ref="input"
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
        value: [String, Number, Boolean, Function, Object, Array, Date],
        nativeValue: [String, Number, Boolean, Function, Object, Array, Date],
        disabled: Boolean,
        type: String,
        name: String,
        required: Boolean,
        size: String,
        trueValue: {
            type: [String, Number, Boolean, Function, Object, Array, Date],
            default: true
        },
        falseValue: {
            type: [String, Number, Boolean, Function, Object, Array, Date],
            default: false
        },
        rounded: {
            type: Boolean,
            default: true
        },
        outlined: {
            type: Boolean,
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
        },
        newClass() {
            return [
                this.size,
                { 'is-disabled': this.disabled },
                { 'is-rounded': this.rounded },
                { 'is-outlined': this.outlined }
            ]
        }
    },
    watch: {
        /**
        * When v-model change, set internal value.
        */
        value(value) {
            this.newValue = value
        }
    },
    methods: {
        focus() {
            // MacOS FireFox and Safari do not focus when clicked
            this.$refs.input.focus()
        }
    }
}
</script>
