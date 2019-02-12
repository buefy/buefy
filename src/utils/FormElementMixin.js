import config from '../utils/config'

export default {
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
        }
    },
    data() {
        return {
            isValid: true,
            isFocused: false,
            newIconPack: this.iconPack || config.defaultIconPack
        }
    },
    computed: {
        /**
         * Find parent Field, max 3 levels deep.
         */
        parentField() {
            let parent = this.$parent
            for (let i = 0; i < 3; i++) {
                if (parent && !parent.$data._isField) {
                    parent = parent.$parent
                }
            }
            return parent
        },

        /**
         * Get the type prop from parent if it's a Field.
         */
        statusType() {
            if (!this.parentField) return
            if (!this.parentField.newType) return
            if (typeof this.parentField.newType === 'string') {
                return this.parentField.newType
            } else {
                for (let key in this.parentField.newType) {
                    if (this.parentField.newType[key]) {
                        return key
                    }
                }
            }
        },

        /**
         * Get the message prop from parent if it's a Field.
         */
        statusMessage() {
            if (!this.parentField) return

            return this.parentField.newMessage
        },

        /**
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
        }
    },
    methods: {
        /**
         * Focus method that work dynamically depending on the component.
         */
        focus() {
            if (this.$data._elementRef === undefined) return

            this.$nextTick(() => this.$el.querySelector(this.$data._elementRef).focus())
        },

        onBlur($event) {
            this.isFocused = false
            this.$emit('blur', $event)
            this.checkHtml5Validity()
        },

        onFocus($event) {
            this.isFocused = true
            this.$emit('focus', $event)
        },

        /**
         * Check HTML5 validation, set isValid property.
         * If validation fail, send 'is-danger' type,
         * and error message to parent if it's a Field.
         */
        checkHtml5Validity() {
            if (!this.useHtml5Validation) return

            if (this.$refs[this.$data._elementRef] === undefined) return

            const el = this.$el.querySelector(this.$data._elementRef)

            let type = null
            let message = null
            let isValid = true
            if (!el.checkValidity()) {
                type = 'is-danger'
                message = el.validationMessage
                isValid = false
            }
            this.isValid = isValid

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

            return this.isValid
        }
    }
}
