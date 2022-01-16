<template>
    <div
        class="colorpicker control"
    >
        <b-dropdown
            v-if="!isMobile || inline"
            ref="dropdown"
            :position="position"
            :disabled="disabled"
            :inline="inline"
            :mobile-modal="mobileModal"
            :trap-focus="trapFocus"
            :aria-role="ariaRole"
            :aria-modal="!inline"
            :append-to-body="appendToBody"
            append-to-body-copy-parent
            @active-change="onActiveChange"
        >
            <template #trigger v-if="!inline">
                <slot name="trigger">
                    <b-button
                        :style="{ background, color: foreground }"
                        :disabled="disabled"
                    >
                        <span class="color-name">{{ colorFormatter(colorSelected) }}</span>
                    </b-button>
                </slot>
            </template>

            <b-dropdown-item
                :disabled="disabled"
                :focusable="focusable"
                custom
                :class="{'dropdown-horizonal-colorpicker': horizontalColorPicker}"
            >
                <div>
                    <header class="colorpicker-header">
                        <template v-if="$slots.header !== undefined && $slots.header.length">
                            <slot name="header" />
                        </template>
                    </header>
                    <div class="colorpicker-content">
                        <b-colorpicker-spectrum-s-v-g v-model="colorSelected"/>
                    </div>
                </div>
                <footer class="colorpicker-footer">
                    <template v-if="$slots.footer !== undefined && $slots.footer.length">
                        <slot name="footer" :color="colorSelected"/>
                    </template>
                </footer>
            </b-dropdown-item>
        </b-dropdown>
    </div>
</template>

<script>
import FormElementMixin from '../../utils/FormElementMixin'
import { isMobile } from '../../utils/helpers'
import config from '../../utils/config'
import Color from '../../utils/color'

import Dropdown from '../dropdown/Dropdown'
import DropdownItem from '../dropdown/DropdownItem'
import Input from '../input/Input'
import Field from '../field/Field'
import Select from '../select/Select'
import Icon from '../icon/Icon'

import ColorPickerSpectrumSVG from './ColorPickerSpectrumSVG'

const defaultColorFormatter = (color, vm) => {
    return color.toString('hex')
}

const defaultColorParser = (color, vm) => {
    return Color.parse(color)
}

export default {
    name: 'BColorpicker',
    components: {
        [ColorPickerSpectrumSVG.name]: ColorPickerSpectrumSVG,
        [Input.name]: Input,
        [Field.name]: Field,
        [Select.name]: Select,
        [Icon.name]: Icon,
        [Dropdown.name]: Dropdown,
        [DropdownItem.name]: DropdownItem
    },
    mixins: [FormElementMixin],
    inheritAttrs: false,
    provide() {
        return {
            $colorpicker: this
        }
    },
    props: {
        value: {
            type: [String, Number]
        },
        inline: Boolean,
        disabled: Boolean,
        horizontalColorPicker: Boolean,
        colorFormatter: {
            type: Function,
            default: (color, vm) => {
                if (typeof config.defaultColorFormatter === 'function') {
                    return config.defaultColorFormatter(color)
                } else {
                    return defaultColorFormatter(color, vm)
                }
            }
        },
        colorParser: {
            type: Function,
            default: (color, vm) => {
                if (typeof config.defaultColorParser === 'function') {
                    return config.defaultColorParser(color)
                } else {
                    return defaultColorParser(color, vm)
                }
            }
        },
        position: String,
        mobileModal: {
            type: Boolean,
            default: () => config.defaultDatepickerMobileModal
        },
        focusable: {
            type: Boolean,
            default: true
        },
        trapFocus: {
            type: Boolean,
            default: () => config.defaultTrapFocus
        },
        appendToBody: Boolean
    },
    data() {
        return {
            colorSelected: new Color(this.value)
        }
    },
    computed: {
        hue() {
            return this.colorSelected.hue
        },

        background() {
            return this.colorSelected.toString('hex')
        },
        foreground() {
            const { red, green, blue } = this.colorSelected
            return (red * 0.299 + green * 0.587 + blue * 0.114) > 186
                ? '#000000'
                : '#FFFFFF'
        },

        isMobile() {
            return this.mobileNative && isMobile.any()
        },

        ariaRole() {
            if (!this.inline) {
                return 'dialog'
            }
        }
    },
    watch: {
        value(value) {
            this.colorSelected = new Color(value)
        }
    },
    methods: {
        /*
         * Parse string into date
         */
        onChange(value) {
            const date = this.dateParser(value, this)
            if (date && (!isNaN(date) ||
                (Array.isArray(date) && date.length === 2 && !isNaN(date[0]) && !isNaN(date[1])))) {
                this.computedValue = date
            } else {
                // Force refresh input value when not valid date
                this.computedValue = null
                if (this.$refs.input) {
                    this.$refs.input.newValue = this.computedValue
                }
            }
        },

        /*
         * Format date into string
         */
        formatValue(value) {
            if (Array.isArray(value)) {
                const isArrayWithValidDates = Array.isArray(value) && value.every((v) => !isNaN(v))
                return isArrayWithValidDates ? this.dateFormatter([...value], this) : null
            }
            return (value && !isNaN(value)) ? this.dateFormatter(value, this) : null
        },

        /*
         * Either decrement month by 1 if not January or decrement year by 1
         * and set month to 11 (December) or decrement year when 'month'
         */
        prev() {
            if (this.disabled) return

            if (this.isTypeMonth) {
                this.focusedDateData.year -= 1
            } else {
                if (this.focusedDateData.month > 0) {
                    this.focusedDateData.month -= 1
                } else {
                    this.focusedDateData.month = 11
                    this.focusedDateData.year -= 1
                }
            }
        },

        /*
         * Either increment month by 1 if not December or increment year by 1
         * and set month to 0 (January) or increment year when 'month'
         */
        next() {
            if (this.disabled) return

            if (this.isTypeMonth) {
                this.focusedDateData.year += 1
            } else {
                if (this.focusedDateData.month < 11) {
                    this.focusedDateData.month += 1
                } else {
                    this.focusedDateData.month = 0
                    this.focusedDateData.year += 1
                }
            }
        },

        formatNative(value) {
            return this.isTypeMonth
                ? this.formatYYYYMM(value) : this.formatYYYYMMDD(value)
        },

        /*
         * Format date into string 'YYYY-MM-DD'
         */
        formatYYYYMMDD(value) {
            const date = new Date(value)
            if (value && !isNaN(date)) {
                const year = date.getFullYear()
                const month = date.getMonth() + 1
                const day = date.getDate()
                return year + '-' +
                    ((month < 10 ? '0' : '') + month) + '-' +
                    ((day < 10 ? '0' : '') + day)
            }
            return ''
        },

        /*
         * Format date into string 'YYYY-MM'
         */
        formatYYYYMM(value) {
            const date = new Date(value)
            if (value && !isNaN(date)) {
                const year = date.getFullYear()
                const month = date.getMonth() + 1
                return year + '-' +
                    ((month < 10 ? '0' : '') + month)
            }
            return ''
        },

        /*
         * Parse date from string
         */
        onChangeNativePicker(event) {
            const date = event.target.value
            const s = date ? date.split('-') : []
            if (s.length === 3) {
                const year = parseInt(s[0], 10)
                const month = parseInt(s[1]) - 1
                const day = parseInt(s[2])
                this.computedValue = new Date(year, month, day)
            } else {
                this.computedValue = null
            }
        },
        updateInternalState(value) {
            if (this.dateSelected === value) return
            const isArray = Array.isArray(value)
            const currentDate = isArray
                ? (!value.length ? this.dateCreator() : value[value.length - 1])
                : (!value ? this.dateCreator() : value)
            if (!isArray ||
                (isArray && this.dateSelected && value.length > this.dateSelected.length)) {
                this.focusedDateData = {
                    day: currentDate.getDate(),
                    month: currentDate.getMonth(),
                    year: currentDate.getFullYear()
                }
            }
            this.dateSelected = value
        },

        /*
         * Toggle datepicker
         */
        togglePicker(active) {
            if (this.$refs.dropdown) {
                const isActive = typeof active === 'boolean'
                    ? active
                    : !this.$refs.dropdown.isActive
                if (isActive) {
                    this.$refs.dropdown.isActive = isActive
                } else if (this.closeOnClick) {
                    this.$refs.dropdown.isActive = isActive
                }
            }
        },

        /*
         * Call default onFocus method and show datepicker
         */
        handleOnFocus(event) {
            this.onFocus(event)
            if (this.openOnFocus) {
                this.togglePicker(true)
            }
        },

        /*
         * Toggle dropdown
         */
        toggle() {
            if (this.mobileNative && this.isMobile) {
                const input = this.$refs.input.$refs.input
                input.focus()
                input.click()
                return
            }
            this.$refs.dropdown.toggle()
        },

        /*
         * Avoid dropdown toggle when is already visible
         */
        onInputClick(event) {
            if (this.$refs.dropdown.isActive) {
                event.stopPropagation()
            }
        },

        /**
         * Keypress event that is bound to the document.
         */
        keyPress({ key }) {
            if (this.$refs.dropdown && this.$refs.dropdown.isActive && (key === 'Escape' || key === 'Esc')) {
                this.togglePicker(false)
            }
        },

        /**
         * Emit 'blur' event on dropdown is not active (closed)
         */
        onActiveChange(value) {
            if (!value) {
                this.onBlur()
            }
            /*
             * Emit 'active-change' when on dropdown active state change
             */
            this.$emit('active-change', value)
        }
    }
}
</script>
