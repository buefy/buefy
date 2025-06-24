import { defineComponent } from 'vue'

// components that mix this in must have `input: HTMLElement` in `$refs`.
export default defineComponent({
    props: {
        modelValue: [String, Number, Boolean, Function, Object, Array],
        nativeValue: [String, Number, Boolean, Function, Object, Array],
        type: String,
        disabled: Boolean,
        required: Boolean,
        name: String,
        size: String
    },
    emits: {
        // eslint-disable-next-line max-len
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
        'update:modelValue': (value: any) => true
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            set(value: any) {
                this.newValue = value
                this.$emit('update:modelValue', value)
            }
        },
        disabledOrUndefined() {
            // On Vue 3, setting a boolean attribute `false` does not remove it.
            // To remove it, `null` or `undefined` has to be given.
            // Setting `false` ends up with a grayed out component.
            return this.disabled || undefined
        },
        requiredOrUndefined() {
            // On Vue 3, setting a boolean attribute `false` does not remove it,
            // `null` or `undefined` has to be given to remove it.
            return this.required || undefined
        }
    },
    watch: {
        /*
        * When v-model change, set internal value.
        */
        modelValue(value) {
            this.newValue = value
        }
    },
    methods: {
        focus() {
            // MacOS FireFox and Safari do not focus when clicked
            (this.$refs.input as HTMLElement).focus()
        }
    }
})
