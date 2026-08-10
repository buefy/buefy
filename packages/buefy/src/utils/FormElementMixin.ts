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
export type ConstraintValidationElement =
    | HTMLButtonElement
    | HTMLFieldSetElement
    | HTMLInputElement
    | HTMLOutputElement
    | HTMLSelectElement
    | HTMLTextAreaElement

// Builds the mixin definition; only ever instantiated once (see `FormElementMixin`
// below) so that all host components share the same underlying methods object.
// `useFormElementMixin()` re-exposes that singleton under a narrower type instead
// of calling this again, so mixin/component identity (e.g. spying on
// `FormElementMixin.methods.xyz` in tests) keeps working across host components.
function buildFormElementMixin<T extends ConstraintValidationElement>() {
    return defineComponent({
        props: {
            size: String,
            expanded: Boolean,
            loading: Boolean,
            rounded: Boolean,
            icon: String,
            iconPack: String,
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
                    case 'is-small':
                    case 'is-medium': return this.size
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

            getElement(): T {
                let el = this.$refs[this.$data._elementRef]
                while (el != null && typeof el === 'object' && '$refs' in el) {
                    const form = el as unknown as { $refs: Record<string, unknown>, $data: { _elementRef: string } }
                    el = form.$refs[form.$data._elementRef]
                }
                // TODO: what if el is not an HTMLElement? possibly null?
                return el as T
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
            checkHtml5Validity(): boolean {
                if (!this.useHtml5Validation) {
                    return false
                }

                const el = this.getElement()
                if (el == null) {
                    return false
                }

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
}

type FormElementMixinDef<T extends ConstraintValidationElement> = ReturnType<typeof buildFormElementMixin<T>>

const FormElementMixin = buildFormElementMixin<ConstraintValidationElement>()

// Allows host components to narrow the return type of `getElement()`/`focus()`
// down to the specific element(s) they can actually render, instead of the
// full ConstraintValidationElement union. Returns the same singleton mixin,
// just reinterpreted under a more specific type.
export function useFormElementMixin<T extends ConstraintValidationElement = ConstraintValidationElement>(): FormElementMixinDef<T> {
    return FormElementMixin as unknown as FormElementMixinDef<T>
}

export default FormElementMixin
