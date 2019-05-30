<template>
    <div class="datepicker control" :class="[size, {'is-expanded': expanded}]">
        <b-dropdown
            v-if="!isMobile || inline"
            ref="dropdown"
            :position="position"
            :disabled="disabled"
            :inline="inline">
            <b-input
                v-if="!inline"
                ref="input"
                slot="trigger"
                autocomplete="off"
                :value="formatValue(computedValue)"
                :placeholder="placeholder"
                :size="size"
                :icon="icon"
                :icon-pack="iconPack"
                :rounded="rounded"
                :loading="loading"
                :disabled="disabled"
                :readonly="!editable"
                v-bind="$attrs"
                @click.native="onInputClick"
                @keyup.native.enter="togglePicker(true)"
                @change.native="onChange($event.target.value)"
                @focus="handleOnFocus"
                @blur="onBlur" />

            <b-dropdown-item :disabled="disabled" custom>
                <header class="datepicker-header">
                    <template v-if="$slots.header !== undefined && $slots.header.length">
                        <slot name="header" />
                    </template>
                    <div
                        v-else
                        class="pagination field is-centered"
                        :class="size">
                        <a
                            v-show="!showPrev && !disabled"
                            class="pagination-previous"
                            role="button"
                            href="#"
                            :disabled="disabled"
                            @click.prevent="prev"
                            @keydown.enter.prevent="prev"
                            @keydown.space.prevent="prev">

                            <b-icon
                                icon="chevron-left"
                                :pack="iconPack"
                                both
                                type="is-primary is-clickable"/>
                        </a>
                        <a
                            v-show="!showNext && !disabled"
                            class="pagination-next"
                            role="button"
                            href="#"
                            :disabled="disabled"
                            @click.prevent="next"
                            @keydown.enter.prevent="next"
                            @keydown.space.prevent="next">

                            <b-icon
                                icon="chevron-right"
                                :pack="iconPack"
                                both
                                type="is-primary is-clickable"/>
                        </a>
                        <div class="pagination-list">
                            <b-field>
                                <b-select
                                    v-if="!isTypeMonth"
                                    v-model="focusedDateData.month"
                                    :disabled="disabled"
                                    :size="size">
                                    <option
                                        v-for="(month, index) in monthNames"
                                        :value="index"
                                        :key="month">
                                        {{ month }}
                                    </option>
                                </b-select>
                                <b-select
                                    v-model="focusedDateData.year"
                                    :disabled="disabled"
                                    :size="size">
                                    <option
                                        v-for="year in listOfYears"
                                        :value="year"
                                        :key="year">
                                        {{ year }}
                                    </option>
                                </b-select>
                            </b-field>
                        </div>
                    </div>
                </header>

                <div
                    v-if="!isTypeMonth"
                    class="datepicker-content">
                    <b-datepicker-table
                        v-model="computedValue"
                        :day-names="dayNames"
                        :month-names="monthNames"
                        :first-day-of-week="firstDayOfWeek"
                        :min-date="minDate"
                        :max-date="maxDate"
                        :focused="focusedDateData"
                        :disabled="disabled"
                        :unselectable-dates="unselectableDates"
                        :unselectable-days-of-week="unselectableDaysOfWeek"
                        :selectable-dates="selectableDates"
                        :events="events"
                        :indicators="indicators"
                        :date-creator="dateCreator"
                        :type-month="isTypeMonth"
                        @close="togglePicker(false)"/>
                </div>
                <div v-else>
                    <b-datepicker-month
                        v-model="computedValue"
                        :month-names="monthNames"
                        :min-date="minDate"
                        :max-date="maxDate"
                        :focused="focusedDateData"
                        :disabled="disabled"
                        :unselectable-dates="unselectableDates"
                        :unselectable-days-of-week="unselectableDaysOfWeek"
                        :selectable-dates="selectableDates"
                        :events="events"
                        :indicators="indicators"
                        :date-creator="dateCreator"
                        @close="togglePicker(false)"/>
                </div>

                <footer
                    v-if="$slots.default !== undefined && $slots.default.length"
                    class="datepicker-footer">
                    <slot/>
                </footer>
            </b-dropdown-item>
        </b-dropdown>

        <b-input
            v-else
            ref="input"
            :type="!isTypeMonth ? 'date' : 'month'"
            autocomplete="off"
            :value="formatNative(computedValue)"
            :placeholder="placeholder"
            :size="size"
            :icon="icon"
            :icon-pack="iconPack"
            :loading="loading"
            :max="formatNative(maxDate)"
            :min="formatNative(minDate)"
            :disabled="disabled"
            :readonly="false"
            v-bind="$attrs"
            @change.native="onChangeNativePicker"
            @focus="handleOnFocus"
            @blur="onBlur"/>
    </div>
</template>

<script>
    import FormElementMixin from '../../utils/FormElementMixin'
    import { isMobile } from '../../utils/helpers'
    import config from '../../utils/config'

    import Dropdown from '../dropdown/Dropdown'
    import DropdownItem from '../dropdown/DropdownItem'
    import Input from '../input/Input'
    import Field from '../field/Field'
    import Select from '../select/Select'
    import Icon from '../icon/Icon'

    import DatepickerTable from './DatepickerTable'
    import DatepickerMonth from './DatepickerMonth'

    const defaultDateFormatter = (date, vm) => {
        const yyyyMMdd = date.getFullYear() +
            '/' + (date.getMonth() + 1) +
            '/' + date.getDate()
        const d = new Date(yyyyMMdd)
        return !vm.isTypeMonth ? d.toLocaleDateString()
            : d.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit' })
    }

    const defaultDateParser = (date, vm) => {
        if (!vm.isTypeMonth) return new Date(Date.parse(date))
        if (date) {
            const s = date.split('/')
            const year = s[0].length === 4 ? s[0] : s[1]
            const month = s[0].length === 2 ? s[0] : s[1]
            if (year && month) {
                const d = new Date(parseInt(year, 10), parseInt(month - 1, 10), 1)
                d.setHours(0, 0, 0, 0)
                return d
            }
        }
        return null
    }

    export default {
        name: 'BDatepicker',
        components: {
            [DatepickerTable.name]: DatepickerTable,
            [DatepickerMonth.name]: DatepickerMonth,
            [Input.name]: Input,
            [Field.name]: Field,
            [Select.name]: Select,
            [Icon.name]: Icon,
            [Dropdown.name]: Dropdown,
            [DropdownItem.name]: DropdownItem
        },
        mixins: [FormElementMixin],
        inheritAttrs: false,
        props: {
            value: Date,
            dayNames: {
                type: Array,
                default: () => {
                    if (Array.isArray(config.defaultDayNames)) {
                        return config.defaultDayNames
                    } else {
                        return [
                            'Su',
                            'M',
                            'Tu',
                            'W',
                            'Th',
                            'F',
                            'S'
                        ]
                    }
                }
            },
            monthNames: {
                type: Array,
                default: () => {
                    if (Array.isArray(config.defaultMonthNames)) {
                        return config.defaultMonthNames
                    } else {
                        return [
                            'January',
                            'February',
                            'March',
                            'April',
                            'May',
                            'June',
                            'July',
                            'August',
                            'September',
                            'October',
                            'November',
                            'December'
                        ]
                    }
                }
            },
            firstDayOfWeek: {
                type: Number,
                default: () => {
                    if (typeof config.defaultFirstDayOfWeek === 'number') {
                        return config.defaultFirstDayOfWeek
                    } else {
                        return 0
                    }
                }
            },
            inline: Boolean,
            minDate: Date,
            maxDate: Date,
            focusedDate: Date,
            placeholder: String,
            editable: Boolean,
            disabled: Boolean,
            unselectableDates: Array,
            unselectableDaysOfWeek: {
                type: Array,
                default: () => { return config.defaultUnselectableDaysOfWeek }
            },
            selectableDates: Array,
            dateFormatter: {
                type: Function,
                default: (date, vm) => {
                    if (typeof config.defaultDateFormatter === 'function') {
                        return config.defaultDateFormatter(date)
                    } else {
                        return defaultDateFormatter(date, vm)
                    }
                }
            },
            dateParser: {
                type: Function,
                default: (date, vm) => {
                    if (typeof config.defaultDateParser === 'function') {
                        return config.defaultDateParser(date)
                    } else {
                        return defaultDateParser(date, vm)
                    }
                }
            },
            dateCreator: {
                type: Function,
                default: () => {
                    if (typeof config.defaultDateCreator === 'function') {
                        return config.defaultDateCreator()
                    } else {
                        return new Date()
                    }
                }
            },
            mobileNative: {
                type: Boolean,
                default: () => {
                    return config.defaultDatepickerMobileNative
                }
            },
            position: String,
            events: Array,
            indicators: {
                type: String,
                default: 'dots'
            },
            openOnFocus: Boolean,
            type: {
                type: String,
                validator: (value) => {
                    return [
                        'month'
                    ].indexOf(value) >= 0
                }
            }
        },
        data() {
            const focusedDate = this.value || this.focusedDate || this.dateCreator()

            return {
                dateSelected: this.value,
                focusedDateData: {
                    month: focusedDate.getMonth(),
                    year: focusedDate.getFullYear()
                },
                _elementRef: 'input',
                _isDatepicker: true
            }
        },
        computed: {
            computedValue: {
                get() {
                    return this.dateSelected
                },
                set(value) {
                    this.updateInternalState(value)
                    this.togglePicker(false)
                    this.$emit('input', value)
                }
            },
            /*
            * Returns an array of years for the year dropdown. If earliest/latest
            * dates are set by props, range of years will fall within those dates.
            */
            listOfYears() {
                let latestYear = this.focusedDateData.year + 3
                if (this.maxDate && this.maxDate.getFullYear() < latestYear) {
                    latestYear = this.maxDate.getFullYear()
                }

                let earliestYear = (latestYear - 100) + 3
                if (this.minDate && this.minDate.getFullYear() > earliestYear) {
                    earliestYear = this.minDate.getFullYear()
                }

                const arrayOfYears = []
                for (let i = earliestYear; i <= latestYear; i++) {
                    arrayOfYears.push(i)
                }

                return arrayOfYears.reverse()
            },

            showPrev() {
                if (!this.minDate) return false
                if (this.isTypeMonth) {
                    return this.focusedDateData.year <= this.minDate.getFullYear()
                }
                const dateToCheck = new Date(this.focusedDateData.year, this.focusedDateData.month)
                const date = new Date(this.minDate.getFullYear(), this.minDate.getMonth())
                return (dateToCheck <= date)
            },

            showNext() {
                if (!this.maxDate) return false
                if (this.isTypeMonth) {
                    return this.focusedDateData.year >= this.maxDate.getFullYear()
                }
                const dateToCheck = new Date(this.focusedDateData.year, this.focusedDateData.month)
                const date = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth())
                return (dateToCheck >= date)
            },

            isMobile() {
                return this.mobileNative && isMobile.any()
            },

            isTypeMonth() {
                return this.type === 'month'
            }
        },
        watch: {
            /**
             * When v-model is changed:
             *   1. Update internal value.
             *   2. If it's invalid, validate again.
             */
            value(value) {
                this.updateInternalState(value)
                this.togglePicker(false)
                !this.isValid && this.$refs.input.checkHtml5Validity()
            },

            focusedDate(value) {
                if (value) {
                    this.focusedDateData = {
                        month: value.getMonth(),
                        year: value.getFullYear()
                    }
                }
            },

            /*
            * Emit input event on month and/or year change
            */
            'focusedDateData.month'(value) {
                this.$emit('change-month', value)
            },
            'focusedDateData.year'(value) {
                this.$emit('change-year', value)
            }
        },
        methods: {
            /*
            * Parse string into date
            */
            onChange(value) {
                const date = this.dateParser(value, this)
                if (date && !isNaN(date)) {
                    this.computedValue = date
                } else {
                    // Force refresh input value when not valid date
                    this.computedValue = null
                    this.$refs.input.newValue = this.computedValue
                }
            },

            /*
            * Format date into string
            */
            formatValue(value) {
                if (value && !isNaN(value)) {
                    return this.dateFormatter(value, this)
                } else {
                    return null
                }
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
                this.computedValue = date ? new Date(date.replace(/-/g, '/')) : null
            },

            updateInternalState(value) {
                const currentDate = !value ? this.dateCreator() : value
                this.focusedDateData = {
                    month: currentDate.getMonth(),
                    year: currentDate.getFullYear()
                }
                this.dateSelected = value
            },

            /*
            * Toggle datepicker
            */
            togglePicker(active) {
                if (this.$refs.dropdown) {
                    this.$refs.dropdown.isActive = typeof active === 'boolean'
                        ? active
                        : !this.$refs.dropdown.isActive
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
            keyPress(event) {
                // Esc key
                if (this.$refs.dropdown && this.$refs.dropdown.isActive && event.keyCode === 27) {
                    this.togglePicker(false)
                }
            }
        },
        created() {
            if (typeof window !== 'undefined') {
                document.addEventListener('keyup', this.keyPress)
            }
        },
        beforeDestroy() {
            if (typeof window !== 'undefined') {
                document.removeEventListener('keyup', this.keyPress)
            }
        }
    }
</script>
