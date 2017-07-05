<template>
    <div class="control"
        :class="[iconPosition, {
            'is-expanded': expanded,
            'is-loading': loading,
            'is-clearfix': !hasMessage
        }]">
        <input v-if="type !== 'textarea'"
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

        <textarea v-else
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
            :rows="rows"
            :value="newValue"
            @input="input"
            @blur="blur"
            @focus="$emit('focus', $event)"
            @change="$emit('change', newValue)">
        </textarea>

        <b-icon v-if="icon"
            class="is-left"
            :icon="icon"
            :pack="iconPack"
            :size="size">
        </b-icon>

        <b-icon v-if="!loading && (passwordReveal || statusType)"
            class="is-right"
            :class="[!passwordReveal ? statusType : null, { 'is-primary is-clickable': passwordReveal }]"
            :icon="passwordReveal ? passwordVisibleIcon : statusTypeIcon"
            :size="size"
            both
            @click.native="togglePasswordVisibility">
        </b-icon>

        <small class="help counter" v-if="maxlength">{{ valueLength }} / {{ maxlength }}</small>
    </div>
</template>

<script>
    import Icon from '../icon'
    import config from '../../utils/config'
    import FormElementMixin from '../../utils/FormElementMixin'

    export default {
        name: 'bInput',
        mixins: [FormElementMixin],
        components: {
            [Icon.name]: Icon
        },
        props: {
            value: [Number, String],
            type: {
                type: String,
                default: 'text'
            },
            passwordReveal: Boolean
        },
        data() {
            return {
                newValue: this.value,
                newType: this.type,
                newAutocomplete: this.autocomplete || config.defaultInputAutocomplete,
                isPasswordVisible: false,
                _elementRef: this.type === 'textarea'
                    ? 'textarea'
                    : 'input'
            }
        },
        computed: {
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
                    return 'has-icons-left has-icons-right'
                } else if (!this.icon && this.hasIconRight) {
                    return 'has-icons-right'
                } else if (this.icon) {
                    return 'has-icons-left'
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
            },
            /**
             * Get value length
             */
            valueLength() {
                return this.newValue ? this.newValue.length : 0
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
                !this.isValid && this.checkHtml5Validity()
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
                !this.isValid && this.checkHtml5Validity()
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
                this.checkHtml5Validity()
            }
        }
    }
</script>
