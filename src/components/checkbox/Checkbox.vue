<template>
    <label
        class="b-checkbox checkbox"
        :class="[size, { 'is-disabled': disabled }]"
        ref="label"
        :disabled="disabled"
        @click="focus"
        @keydown.prevent.enter="$refs.label.click()">
        <input
            v-model="computedValue"
            :indeterminate.prop="indeterminate"
            type="checkbox"
            ref="input"
            @click.stop
            :disabled="disabled"
            :required="required"
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
        value: [String, Number, Boolean, Function, Object, Array],
        nativeValue: [String, Number, Boolean, Function, Object, Array],
        indeterminate: Boolean,
        type: String,
        disabled: Boolean,
        required: Boolean,
        name: String,
        size: String,
        trueValue: {
            type: [String, Number, Boolean, Function, Object, Array],
            default: true
        },
        falseValue: {
            type: [String, Number, Boolean, Function, Object, Array],
            default: false
        }
    },
    data() {
        return {
            newValue: this.value
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
    },
    methods: {
        focus() {
            // MacOS FireFox and Safari do not focus when clicked
            this.$refs.input.focus()
        }
    }
}
</script>
