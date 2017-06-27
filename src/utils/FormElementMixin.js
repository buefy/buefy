export default {
    props: {
        size: String,
        expanded: Boolean,
        loading: Boolean,
        icon: String,
        iconPack: String,

        // Native options to use in HTML5 validation
        autocomplete: String,
        required: Boolean,
        disabled: Boolean,
        max: [Number, String],
        maxlength: [Number, String],
        min: [Number, String],
        minlength: [Number, String],
        name: String,
        pattern: String,
        placeholder: String,
        readonly: Boolean,
        step: [Number, String]
    },
    data() {
        return {
            isValid: true // Used in Dialog and may be used in third party components
        }
    },
    computed: {
        /**
         * Get parent Field.
         */
        parentField() {
            return this.$parent.$data._isField
                ? this.$parent
                : this.$parent.$data._isAutocomplete && this.$parent.$parent.$data._isField
                    ? this.$parent.$parent
                    : null
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
         * Focus method that work dynamically depending on input type.
         */
        focus() {
            if (this.$refs[this.$data._elementRef] === undefined) return

            this.$nextTick(() => this.$refs[this.$data._elementRef].select())
        },

        /**
         * HTML5 validation, set isValid property.
         * If validation fail, send 'is-danger' type,
         * and error message to parent if it's a Field.
         */
        html5Validation() {
            if (this.$refs[this.$data._elementRef] === undefined) return

            let type = null
            let message = null
            let isValid = true
            if (!this.$refs[this.$data._elementRef].checkValidity()) {
                type = 'is-danger'
                message = this.$refs[this.$data._elementRef].validationMessage
                isValid = false
            }
            this.isValid = isValid
            if (!this.parentField) return

            // Set type only if user haven't defined
            if (!this.parentField.type) {
                this.parentField.newType = type
            }
            // Set message only if user haven't defined
            if (!this.parentField.message) {
                this.parentField.newMessage = message
            }
        }
    }
}
