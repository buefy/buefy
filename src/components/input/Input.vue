<template>
    <div
        class="control"
        :class="rootClasses"
    >
        <input
            v-if="type !== 'textarea'"
            ref="input"
            class="input"
            :class="[inputClasses, customClass]"
            :type="newType"
            :autocomplete="newAutocomplete"
            :maxlength="maxlength"
            :value="computedValue"
            v-bind="$attrs"
            @input="onInput"
            @change="onChange"
            @blur="onBlur"
            @focus="onFocus">

        <textarea
            v-else
            ref="textarea"
            class="textarea"
            :class="[inputClasses, customClass]"
            :maxlength="maxlength"
            :value="computedValue"
            v-bind="$attrs"
            @input="onInput"
            @change="onChange"
            @blur="onBlur"
            @focus="onFocus"/>

        <b-icon
            v-if="icon"
            class="is-left"
            :class="{'is-clickable': iconClickable}"
            :icon="icon"
            :pack="iconPack"
            :size="iconSize"
            @click.native="iconClick('icon-click', $event)"/>

        <b-icon
            v-if="!loading && hasIconRight"
            class="is-right"
            :class="{ 'is-clickable': passwordReveal || iconRightClickable }"
            :icon="rightIcon"
            :pack="iconPack"
            :size="iconSize"
            :type="rightIconType"
            both
            @click.native="rightIconClick"/>

        <small
            v-if="maxlength && hasCounter && type !== 'number'"
            class="help counter"
            :class="{ 'is-invisible': !isFocused }">
            {{ valueLength }} / {{ maxlength }}
        </small>
    </div>
</template>

<script>
import Icon from '../icon/Icon'
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
        lazy: {
            type: Boolean,
            default: false
        },
        passwordReveal: Boolean,
        iconClickable: Boolean,
        hasCounter: {
            type: Boolean,
            default: () => config.defaultInputHasCounter
        },
        customClass: {
            type: String,
            default: ''
        },
        iconRight: String,
        iconRightClickable: Boolean,
        iconRightType: String
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
        computedValue: {
            get() {
                return this.newValue
            },
            set(value) {
                this.newValue = value
                this.$emit('input', value)
            }
        },
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
            return this.passwordReveal ||
                this.loading || (this.statusIcon && this.statusTypeIcon) || this.iconRight
        },
        rightIcon() {
            if (this.passwordReveal) {
                return this.passwordVisibleIcon
            } else if (this.iconRight) {
                return this.iconRight
            }
            return this.statusTypeIcon
        },
        rightIconType() {
            if (this.passwordReveal) {
                return 'is-primary'
            } else if (this.iconRight) {
                return this.iconRightType || null
            }
            return this.statusType
        },

        /**
        * Position of the icon or if it's both sides.
        */
        iconPosition() {
            let iconClasses = ''

            if (this.icon) {
                iconClasses += 'has-icons-left '
            }

            if (this.hasIconRight) {
                iconClasses += 'has-icons-right'
            }

            return iconClasses
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
            if (typeof this.computedValue === 'string') {
                return this.computedValue.length
            } else if (typeof this.computedValue === 'number') {
                return this.computedValue.toString().length
            }
            return 0
        }
    },
    watch: {
        /**
        * When v-model is changed:
        *   1. Set internal value.
        */
        value(value) {
            this.newValue = value
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
                this.focus()
            })
        },

        iconClick(emit, event) {
            this.$emit(emit, event)
            this.$nextTick(() => {
                this.focus()
            })
        },

        rightIconClick(event) {
            if (this.passwordReveal) {
                this.togglePasswordVisibility()
            } else if (this.iconRightClickable) {
                this.iconClick('icon-right-click', event)
            }
        },

        onInput(event) {
            if (!this.lazy) {
                const value = event.target.value
                this.updateValue(value)
            }
        },

        onChange(event) {
            if (this.lazy) {
                const value = event.target.value
                this.updateValue(value)
            }
        },

        updateValue(value) {
            this.computedValue = value
            !this.isValid && this.checkHtml5Validity()
        }
    }
}
</script>
