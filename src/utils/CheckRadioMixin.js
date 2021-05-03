export default {
    props: {
        modelValue: [String, Number, Boolean, Function, Object, Array],
        nativeValue: [String, Number, Boolean, Function, Object, Array],
        type: String,
        disabled: Boolean,
        required: Boolean,
        name: String,
        size: String
    },
    data() {
        return {
            newValue: this.modelValue
        }
    },
    computed: {
        computedValue: {
            get() {
                return this.newValue
            },
            set(value) {
                this.newValue = value
                this.$emit('update:modelValue', value)
            }
        },
        disabledOrUndefined() {
            // On Vue 3, setting a boolean attribute `false` does not remove it.
            // To remove it, `null` or `undefined` has to be given.
            // Setting `false` ends up with a grayed out component.
            return this.disabled || undefined
        }
    },
    watch: {
        /**
        * When v-model change, set internal value.
        */
        modelValue(value) {
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
