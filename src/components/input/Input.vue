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
            v-if="passwordReveal && !loading"
            class="is-primary is-clickable is-right"
            :icon="passwordVisibleIcon"
            :size="size"
            both
            @click.native="togglePasswordVisibility">
        </b-icon>

        <b-icon
            v-if="hasIconRight && !loading"
            :class="[statusType, 'is-right']"
            :icon="statusTypeIcon"
            :size="size"
            both
            @click.native="togglePasswordVisibility">
        </b-icon>

        <small class="help counter" v-if="maxlength">{{ this.newValue.length }} / {{ maxlength }}</small>
    </p>
</template>

<script>
    import Vue from 'vue'
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
                isValid: true,
                isPasswordVisible: false
            }
        },
        watch: {
            value(value) {
                this.newValue = value
                !this.isValid && this.html5Validation()
            },
            newValue(value) {
                this.$emit('change', value)
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
                if (this.$parent.isFieldComponent) {
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
                return this.$parent.isFieldComponent && this.$parent.newMessage
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
             * Emit input event to update the user v-model.
             * We're sing value instead of v-model because
             * v-model cannot be binded with a dynamic type input
             */
            input(event) {
                const val = event.target.value
                this.newValue = val
                this.$emit('input', val)
            },

            /**
             * Toggle the visibility of a password-reveal input
             * by changing the type and focus the input right away.
             */
            togglePasswordVisibility() {
                this.isPasswordVisible = !this.isPasswordVisible
                this.newType = this.isPasswordVisible ? 'text' : 'password'

                Vue.nextTick(() => {
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
                if (!this.$refs[element].checkValidity()) {
                    if (this.$parent.isFieldComponent) {
                        this.$parent.newType = 'is-danger'
                        this.$parent.newMessage = this.$refs[element].validationMessage
                        this.isValid = false
                    }
                } else {
                    if (this.$parent.isFieldComponent) {
                        this.$parent.newType = null
                        this.$parent.newMessage = null
                        this.isValid = true
                    }
                }
            }
        }
    }
</script>
