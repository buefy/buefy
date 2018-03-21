<template>
    <div class="control" :class="rootClasses">
        <input
            v-if="type !== 'textarea'"
            ref="input"
            class="input"
            :class="inputClasses"
            :type="newType"
            :autocomplete="newAutocomplete"
            :maxlength="maxlength"
            :value="newValue"
            v-bind="$attrs"
            @input="onInput"
            @blur="onBlur"
            @focus="onFocus">

        <textarea
            v-else
            ref="textarea"
            class="textarea"
            :class="inputClasses"
            :maxlength="maxlength"
            :value="newValue"
            v-bind="$attrs"
            @input="onInput"
            @blur="onBlur"
            @focus="onFocus"/>

        <b-icon
            v-if="icon"
            class="is-left"
            :icon="icon"
            :pack="iconPack"
            :size="iconSize"/>

        <b-icon
            v-if="!loading && (passwordReveal || statusType)"
            class="is-right"
            :class="{ 'is-clickable': passwordReveal }"
            :icon="passwordReveal ? passwordVisibleIcon : statusTypeIcon"
            :pack="iconPack"
            :size="iconSize"
            :type="!passwordReveal ? statusType : 'is-primary'"
            both
            @click.native="togglePasswordVisibility"/>

        <small
            v-if="maxlength && hasCounter"
            class="help counter"
            :class="{ 'is-invisible': !isFocused }">
            {{ valueLength }} / {{ maxlength }}
        </small>
    </div>
</template>

<script>
    import Icon from '../icon'
    import config from '../../utils/config'
    import FormElementMixin from '../../utils/FormElementMixin'

    export default {
        name: 'BInput',
        components: {
            [Icon.name]: Icon
        },
        mixins: [FormElementMixin],
        inheritAttrs: false,
        props: {
            value: [Number, String],
            type: {
                type: String,
                default: 'text'
            },
            passwordReveal: Boolean,
            hasCounter: {
                type: Boolean,
                default: true
            }
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
            rootClasses() {
                return [
                    this.iconPosition,
                    this.size,
                    {
                        'is-expanded': this.expanded,
                        'is-loading': this.loading,
                        'is-clearfix': !this.hasMessage
                    }
                ]
            },
            inputClasses() {
                return [
                    this.statusType,
                    this.size,
                    { 'is-rounded': this.rounded }
                ]
            },
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
                    case 'is-success': return 'check'
                    case 'is-danger': return 'alert-circle'
                    case 'is-info': return 'information'
                    case 'is-warning': return 'alert'
                }
            },

            /**
             * Check if have any message prop from parent if it's a Field.
             */
            hasMessage() {
                return !!this.statusMessage
            },

            /**
             * Current password-reveal icon name.
             */
            passwordVisibleIcon() {
                return !this.isPasswordVisible ? 'eye' : 'eye-off'
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
            },

            /**
             * Update user's v-model and validate again whenever
             * internal value is changed.
             */
            newValue(value) {
                this.$emit('input', value)
                !this.isValid && this.checkHtml5Validity()
            }
        },
        methods: {
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
             * Input's 'input' event listener, 'nextTick' is used to prevent event firing
             * before ui update, helps when using masks (Cleavejs and potentially others).
             */
            onInput(event) {
                this.$nextTick(() => { this.newValue = event.target.value })
            }
        }
    }
</script>
