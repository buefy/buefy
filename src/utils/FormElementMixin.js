export default {
    props: {
        size: String,
        expanded: Boolean,
        loading: Boolean,
        icon: String,
        iconPack: String,

        // Native options to use in HTML5 validation
        autocomplete: String,
        maxlength: [Number, String]
    },
    data() {
        return {
            isValid: true
        }
    },
    computed: {
        /**
         * Find parent Field, max 3 levels deep.
         */
        parentField() {
            // return this.$parent.$data._isField
            //     ? this.$parent
            //     : this.$parent.$data._isAutocomplete && this.$parent.$parent.$data._isField
            //         ? this.$parent.$parent
            //         : this.$parent.$data._isDatepicker && this.$parent.$parent.$parent.$data._isField
            //             ? this.$parent.$parent.$parent
            //             : null

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

            return this.parentField.newType
        }
    },
    methods: {
        /**
         * Focus method that work dynamically depending on the component.
         */
        focus() {
            if (this.$refs[this.$data._elementRef] === undefined) return

            if (!this.$data._isSelect && !this.$data._isAutocomplete && !this.$data._isDatepicker) {
                this.$nextTick(() => this.$refs[this.$data._elementRef].select())
            } else {
                this.$nextTick(() => this.$refs[this.$data._elementRef].focus())
            }
        },

        /**
         * Check HTML5 validation, set isValid property.
         * If validation fail, send 'is-danger' type,
         * and error message to parent if it's a Field.
         */
        checkHtml5Validity() {
            if (this.$refs[this.$data._elementRef] === undefined) return

            const el = this.$data._isAutocomplete || this.$data._isDatepicker
                ? this.$refs.input.$refs.input
                : this.$refs[this.$data._elementRef]

            let type = null
            let message = null
            let isValid = true
            if (!el.checkValidity()) {
                type = 'is-danger'
                message = el.validationMessage
                isValid = false
            }
            this.isValid = isValid

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

            return this.isValid
        }
    }
}
