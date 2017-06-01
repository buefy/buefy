<template>
    <p
        class="control"
        :class="[iconPosition, {
            'has-icon': hasIcon,
            'is-expanded': expanded,
            'is-loading': loading,
            'is-clearfix': !hasMessage
        }]">
        <input
            v-if="type !== 'textarea'"
            class="input"
            :class="[statusType, size]"
            ref="input"
            :type="newType"
            :name="name"
            :placeholder="placeholder"
            :disabled="disabled"
            :readonly="readonly"
            :maxlength="maxlength"
            :minlength="minlength"
            :autocomplete="newAutocomplete"
            :required="required"
            :min="min"
            :max="max"
            :step="step"
            :pattern="pattern"
            :value="newValue"
            @input="input"
            @blur="blur"
            @focus="$emit('focus', $event)"
            @change="$emit('change', newValue)">

        <textarea
            v-else
            class="textarea"
            :class="[statusType, size]"
            ref="textarea"
            :name="name"
            :placeholder="placeholder"
            :disabled="disabled"
            :readonly="readonly"
            :required="required"
            :maxlength="maxlength"
            :minlength="minlength"
            :value="newValue"
            @input="input"
            @blur="blur"
            @focus="$emit('focus', $event)"
            @change="$emit('change', newValue)">
        </textarea>

        <b-icon
            v-if="icon"
            :icon="icon"
            :pack="iconPack"
            :size="size">
        </b-icon>

        <b-icon
            v-if="!loading && (passwordReveal || statusType)"
            class="is-right"
            :class="[!passwordReveal ? statusType : null, { 'is-primary is-clickable': passwordReveal }]"
            :icon="passwordReveal ? passwordVisibleIcon : statusTypeIcon"
            :size="size"
            both
            @click.native="togglePasswordVisibility">
        </b-icon>

        <small class="help counter" v-if="maxlength">{{ this.newValue.length }} / {{ maxlength }}</small>
    </p>
</template>

<script>
    import Icon from '../icon'
    import config from '../../utils/config'

    export default {
        name: 'bInput',
        components: {
            [Icon.name]: Icon
        },
        props: {
            value: [Number, String],
            type: {
                type: String,
                default: 'text'
            },
            size: String,
            expanded: Boolean,
            passwordReveal: Boolean,
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
                // This is necessary because, for some reason, textarea
                // returns undefined if there's no v-model or value.
                newValue: this.value || '',
                newType: this.type,
                newAutocomplete: this.autocomplete || config.defaultInputAutocomplete,
                isValid: true, // Used in Dialog and may be used in third party components
                isPasswordVisible: false
            }
        },
        watch: {
            /**
             * When v-model is changed:
             *   1. Set internal value.
             *   2. If it's invalid, validate again.
             */
            value(value) {
                this.newValue = value
                !this.isValid && this.html5Validation()
            }
        },
        computed: {
            /**
             * Check if have any icon (defined or internal).
             */
            hasIcon() {
                return this.icon || this.hasIconRight
            },

            /**
             * Check if have any icon in the right side.
             */
            hasIconRight() {
                return this.passwordReveal || this.loading || this.statusType
            },

            /**
             * Position of the icon or if it's both sides.
             */
            iconPosition() {
                if (this.icon && this.hasIconRight) {
                    return 'has-both-icon'
                } else if (!this.icon && this.hasIconRight) {
                    return 'has-icon-right'
                }
            },

            /**
             * Get the type prop from parent if it's a Field.
             */
            statusType() {
                if (this.$parent.$data._isField) {
                    return this.$parent.newType
                }
            },

            /**
             * Icon name (MDI) based on the type.
             */
            statusTypeIcon() {
                switch (this.statusType) {
                    case 'is-success': return 'done'
                    case 'is-danger': return 'error'
                    case 'is-info': return 'info'
                    case 'is-warning': return 'warning'
                }
            },

            /**
             * Check if have any message prop from parent if it's a Field.
             */
            hasMessage() {
                return this.$parent.$data._isField && this.$parent.newMessage
            },

            /**
             * Current password-reveal icon name.
             */
            passwordVisibleIcon() {
                return !this.isPasswordVisible ? 'visibility' : 'visibility_off'
            }
        },
        methods: {
            /**
             * Input's input listener.
             *
             *   1. Emit input event to update the user v-model.
             *   2. If it's invalid, validate again.
             *
             * We're using value instead of v-model because
             * v-model cannot be binded with a dynamic type input.
             */
            input(event) {
                const value = event.target.value
                this.newValue = value
                this.$emit('input', value)
                this.$emit('change', value)
                !this.isValid && this.html5Validation()
            },

            /**
             * Toggle the visibility of a password-reveal input
             * by changing the type and focus the input right away.
             */
            togglePasswordVisibility() {
                this.isPasswordVisible = !this.isPasswordVisible
                this.newType = this.isPasswordVisible ? 'text' : 'password'

                this.$nextTick(() => {
                    this.$refs.input.focus()
                })
            },

            /**
             * Blur listener.
             * Fire the HTML5 validation.
             */
            blur(event) {
                this.$emit('blur', event)
                this.html5Validation()
            },

            /**
             * HTML5 validation, set isValid property.
             * If validation fail, send 'is-danger' type,
             * and error message to parent if it's a Field.
             */
            html5Validation() {
                const element = this.newType === 'textarea' ? 'textarea' : 'input'
                if (this.$refs[element] === undefined) return

                let type = null
                let message = null
                let isValid = true
                if (!this.$refs[element].checkValidity()) {
                    type = 'is-danger'
                    message = this.$refs[element].validationMessage
                    isValid = false
                }
                this.isValid = isValid
                if (this.$parent.$data._isField) {
                    // Set type only if user haven't defined
                    if (!this.$parent.type) {
                        this.$parent.newType = type
                    }
                    // Set message only if user haven't defined
                    if (!this.$parent.message) {
                        this.$parent.newMessage = message
                    }
                }
            }
        }
    }
</script>
