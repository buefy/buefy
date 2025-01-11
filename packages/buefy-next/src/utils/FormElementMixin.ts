import { defineComponent } from 'vue'

import config from '../utils/config'
import BField from '../components/field/Field.vue'
import type {
    FieldMessageProp,
    FieldTypeProp
} from '../components/field/Field.vue'

type BFieldComponent = InstanceType<typeof BField>

// HTMLElement that supports contraint validation;
// i.e., having `validationMessage`
// https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation#the_constraint_validation_api
type ConstraintValidationElement =
    | HTMLButtonElement
    | HTMLFieldSetElement
    | HTMLInputElement
    | HTMLOutputElement
    | HTMLSelectElement
    | HTMLTextAreaElement

const FormElementMixin = defineComponent({
    props: {
        size: String,
        expanded: Boolean,
        loading: Boolean,
        rounded: Boolean,
        icon: String,
        iconPack: String,
        // Native options to use in HTML5 validation
        autocomplete: String,
        maxlength: [Number, String],
        useHtml5Validation: {
            type: Boolean,
            default: () => config.defaultUseHtml5Validation
        },
        validationMessage: String,
        locale: {
            type: [String, Array<string>],
            default: () => {
                return config.defaultLocale
            }
        },
        statusIcon: {
            type: Boolean,
            default: () => {
                return config.defaultStatusIcon
            }
        }
    },
    emits: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        blur: (event?: Event) => true,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        focus: (event?: Event) => true
    },
    data() {
        return {
            isValid: true,
            isFocused: false,
            newIconPack: this.iconPack || config.defaultIconPack,
            // host component must override this
            _elementRef: ''
        }
    },
    computed: {
        /*
         * Find parent Field, max 3 levels deep.
         */
        parentField(): BFieldComponent | undefined {
            let parent = this.$parent
            for (let i = 0; i < 3; i++) {
                if (parent && !(parent as BFieldComponent).$data._isField) {
                    parent = parent.$parent
                }
            }
            // TODO: what if parent is defined but not a Field?
            return parent as BFieldComponent | undefined
        },

        /*
         * Get the type prop from parent if it's a Field.
         */
        statusType() {
            const { newType } = this.parentField || {}

            if (!newType) return

            if (typeof newType === 'string') {
                return newType
            } else {
                for (const key in newType) {
                    if (newType[key]) {
                        return key
                    }
                }
            }
            return undefined
        },

        /*
         * Get the message prop from parent if it's a Field.
         */
        statusMessage() {
            if (!this.parentField) return

            return this.parentField.newMessage || this.parentField.$slots.message
        },

        /*
         * Fix icon size for inputs, large was too big
         */
        iconSize() {
            switch (this.size) {
                case 'is-small': return this.size
                case 'is-medium': return
                case 'is-large': return this.newIconPack === 'mdi'
                    ? 'is-medium'
                    : ''
            }
            return undefined
        }
    },
    methods: {
        /*
         * Focus method that work dynamically depending on the component.
         */
        focus() {
            const el = this.getElement()
            if (el === undefined) return

            this.$nextTick(() => {
                if (el) el.focus()
            })
        },

        onBlur($event?: Event) {
            this.isFocused = false
            this.$emit('blur', $event)
            this.checkHtml5Validity()
        },

        onFocus($event?: Event) {
            this.isFocused = true
            this.$emit('focus', $event)
        },

        getElement(): ConstraintValidationElement {
            let el = this.$refs[this.$data._elementRef]
            while (el != null && typeof el === 'object' && '$refs' in el) {
                const form = el as unknown as typeof FormElementMixin
                el = form.$refs[form.$data._elementRef]
            }
            // TODO: what if el is not an HTMLElement? possibly null?
            return el as ConstraintValidationElement
        },

        setInvalid() {
            const type = 'is-danger'
            const message = this.validationMessage || this.getElement().validationMessage
            this.setValidity(type, message)
        },

        setValidity(type: FieldTypeProp | null, message: FieldMessageProp | null) {
            this.$nextTick(() => {
                if (this.parentField) {
                    // Set type only if not defined
                    if (!this.parentField.type) {
                        this.parentField.newType = type
                    }
                    // Set message only if not defined
                    if (!this.parentField.message) {
                        this.parentField.newMessage = message
                    }
                }
            })
        },

        /*
         * Check HTML5 validation, set isValid property.
         * If validation fail, send 'is-danger' type,
         * and error message to parent if it's a Field.
         */
        checkHtml5Validity() {
            if (!this.useHtml5Validation) return

            const el = this.getElement()
            if (el == null) return

            if (!el.checkValidity()) {
                this.setInvalid()
                this.isValid = false
            } else {
                this.setValidity(null, null)
                this.isValid = true
            }

            return this.isValid
        }
    }
})

export default FormElementMixin
