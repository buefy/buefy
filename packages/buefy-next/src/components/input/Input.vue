<template>
    <div
        class="control"
        :class="rootClasses"
        v-bind="rootAttrs"
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
            v-bind="fallthroughAttrs"
            @input="onInput"
            @change="onChange"
            @blur="onBlur"
            @focus="onFocus"
        >

        <textarea
            v-else
            ref="textarea"
            class="textarea"
            :class="[inputClasses, customClass]"
            :maxlength="maxlength"
            :value="computedValue === null ? undefined : computedValue"
            v-bind="fallthroughAttrs"
            @input="onInput"
            @change="onChange"
            @blur="onBlur"
            @focus="onFocus"
        />

        <b-icon
            v-if="icon"
            class="is-left"
            :class="{'is-clickable': iconClickable}"
            :icon="icon"
            :pack="iconPack"
            :size="iconSize"
            @click="iconClick('icon-click', $event)"
        />

        <b-icon
            v-if="!loading && hasIconRight && rightIcon"
            class="is-right"
            :class="{ 'is-clickable': passwordReveal || iconRightClickable }"
            :icon="rightIcon"
            :pack="iconPack"
            :size="iconSize"
            :type="rightIconType"
            both
            @click="rightIconClick"
        />

        <small
            v-if="maxlength && hasCounter && type !== 'number'"
            class="help counter"
            :class="{ 'is-invisible': !isFocused }"
        >
            {{ valueLength }} / {{ maxlength }}
        </small>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

import BIcon from '../icon/Icon.vue'
import config from '../../utils/config'
import CompatFallthroughMixin from '../../utils/CompatFallthroughMixin'
import FormElementMixin from '../../utils/FormElementMixin'

export default defineComponent({
    name: 'BInput',
    components: { BIcon },
    mixins: [CompatFallthroughMixin, FormElementMixin],
    props: {
        modelValue: {
            type: [Number, String] as PropType<string | number | undefined | null>
        },
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
        iconRightType: String,
        // Native options to use in HTML5 validation
        autocomplete: String
    },
    emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        'icon-click': (event: MouseEvent) => true,
        'icon-right-click': (event: MouseEvent) => true,
        'update:modelValue': (value: string | number | undefined) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
    },
    data() {
        return {
            newValue: this.modelValue,
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
            set(value: string | number | undefined) {
                this.newValue = value
                this.$emit('update:modelValue', value)
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
                return this.iconRightType || undefined
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

        /*
        * Icon name (MDI) based on the type.
        */
        statusTypeIcon() {
            switch (this.statusType) {
                case 'is-success': return 'check'
                case 'is-danger': return 'alert-circle'
                case 'is-info': return 'information'
                case 'is-warning': return 'alert'
                default: return undefined
            }
        },

        /*
        * Check if have any message prop from parent if it's a Field.
        */
        hasMessage() {
            return !!this.statusMessage
        },

        /*
        * Current password-reveal icon name.
        */
        passwordVisibleIcon() {
            return !this.isPasswordVisible ? 'eye' : 'eye-off'
        },
        /*
        * Get value length
        */
        valueLength() {
            if (typeof this.computedValue === 'string') {
                return Array.from(this.computedValue).length
            } else if (typeof this.computedValue === 'number') {
                return this.computedValue.toString().length
            }
            return 0
        }
    },
    watch: {
        /*
        * When v-model is changed:
        *   1. Set internal value.
        *   2. Validate it if the value came from outside;
        *      i.e., not equal to computedValue
        */
        modelValue(value) {
            const fromOutside = this.computedValue != value // eslint-disable-line eqeqeq
            this.newValue = value
            if (fromOutside) {
                // validation must wait for DOM updated
                this.$nextTick(() => {
                    !this.isValid && this.checkHtml5Validity()
                })
            }
        },
        type(type) {
            this.newType = type
        }
    },
    methods: {
        /*
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

        iconClick(emit: 'icon-click' | 'icon-right-click', event: MouseEvent) {
            // $emit is overloaded for each of icon-click and icon-right-click
            // but not for both icon-click | icon-right-click
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.$emit(emit as any, event)
            this.$nextTick(() => {
                this.focus()
            })
        },

        rightIconClick(event: MouseEvent) {
            if (this.passwordReveal) {
                this.togglePasswordVisibility()
            } else if (this.iconRightClickable) {
                this.iconClick('icon-right-click', event)
            }
        },

        onInput(event: Event) {
            if (!this.lazy) {
                const value = (event.target as HTMLInputElement | HTMLTextAreaElement).value
                this.updateValue(value)
            }
        },

        onChange(event: Event) {
            if (this.lazy) {
                const value = (event.target as HTMLInputElement | HTMLTextAreaElement).value
                this.updateValue(value)
            }
        },

        updateValue(value: string | number | undefined) {
            this.computedValue = value
            !this.isValid && this.checkHtml5Validity()
        }
    }
})
</script>
