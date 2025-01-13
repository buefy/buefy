<template>
    <div
        class="datepicker control"
        :class="[size, {'is-expanded': expanded}]"
        v-bind="rootAttrs"
    >
        <b-dropdown
            v-if="!isMobile || inline"
            ref="dropdown"
            :position="position"
            :disabled="disabledOrUndefined"
            :inline="inline"
            :mobile-modal="mobileModal"
            :trap-focus="trapFocus"
            :aria-role="ariaRole"
            :append-to-body="appendToBody"
            append-to-body-copy-parent
            @active-change="onActiveChange"
            :trigger-tabindex="-1"
        >
            <template #trigger="props" v-if="!inline">
                <slot name="trigger" v-bind="props">
                    <b-input
                        ref="input"
                        autocomplete="off"
                        :model-value="formattedValue"
                        :placeholder="placeholder"
                        :size="size"
                        :icon="icon"
                        :icon-right="iconRight"
                        :icon-right-clickable="iconRightClickable"
                        :icon-pack="iconPack"
                        :rounded="rounded"
                        :loading="loading"
                        :disabled="disabledOrUndefined"
                        :readonly="!editable"
                        v-bind="fallthroughAttrs"
                        :use-html5-validation="false"
                        @click="onInputClick"
                        @icon-right-click="$emit('icon-right-click', $event)"
                        @keyup.enter="togglePicker(true)"
                        @change="onChange($event.target.value)"
                        @focus="handleOnFocus"
                    />
                </slot>
            </template>

            <b-dropdown-item
                :disabled="disabledOrUndefined"
                :focusable="focusable"
                custom
                :class="{'dropdown-horizontal-timepicker': horizontalTimePicker}"
            >
                <div>
                    <header class="datepicker-header">
                        <template v-if="$slots.header !== undefined && $slots.header().length">
                            <slot name="header" />
                        </template>
                        <div
                            v-else
                            class="pagination field is-centered"
                            :class="size"
                        >
                            <a
                                v-show="!showPrev && !disabled"
                                class="pagination-previous"
                                role="button"
                                href="#"
                                :disabled="disabledOrUndefined"
                                :aria-label="ariaPreviousLabel"
                                @click.prevent="prev"
                                @keydown.enter.prevent="prev"
                                @keydown.space.prevent="prev"
                            >

                                <b-icon
                                    :icon="iconPrev"
                                    :pack="iconPack"
                                    both
                                    type="is-primary is-clickable"
                                />
                            </a>
                            <a
                                v-show="!showNext && !disabled"
                                class="pagination-next"
                                role="button"
                                href="#"
                                :disabled="disabledOrUndefined"
                                :aria-label="ariaNextLabel"
                                @click.prevent="next"
                                @keydown.enter.prevent="next"
                                @keydown.space.prevent="next"
                            >

                                <b-icon
                                    :icon="iconNext"
                                    :pack="iconPack"
                                    both
                                    type="is-primary is-clickable"
                                />
                            </a>
                            <div class="pagination-list">
                                <b-field>
                                    <b-select
                                        v-if="!isTypeMonth"
                                        v-model="focusedDateData.month"
                                        :disabled="disabledOrUndefined"
                                        :size="size"
                                    >
                                        <option
                                            v-for="month in listOfMonths"
                                            :value="month.index"
                                            :key="month.name"
                                            :disabled="month.disabled || undefined"
                                        >
                                            {{ month.name }}
                                        </option>
                                    </b-select>
                                    <b-select
                                        v-model="focusedDateData.year"
                                        :disabled="disabledOrUndefined"
                                        :size="size"
                                    >
                                        <option
                                            v-for="year in listOfYears"
                                            :value="year"
                                            :key="year"
                                        >
                                            {{ year }}
                                        </option>
                                    </b-select>
                                </b-field>
                            </div>
                        </div>
                    </header>
                    <div
                        v-if="!isTypeMonth"
                        class="datepicker-content"
                        :class="{'content-horizontal-timepicker': horizontalTimePicker}"
                    >
                        <b-datepicker-table
                            v-model="computedValue"
                            :day-names="newDayNames"
                            :month-names="newMonthNames"
                            :first-day-of-week="firstDayOfWeek"
                            :rules-for-first-week="rulesForFirstWeek"
                            :min-date="minDate"
                            :max-date="maxDate"
                            :focused="focusedDateData"
                            :disabled="disabledOrUndefined"
                            :unselectable-dates="unselectableDates"
                            :unselectable-days-of-week="unselectableDaysOfWeek"
                            :selectable-dates="selectableDates"
                            :events="events"
                            :indicators="indicators"
                            :date-creator="dateCreator"
                            :type-month="isTypeMonth"
                            :nearby-month-days="nearbyMonthDays"
                            :nearby-selectable-month-days="nearbySelectableMonthDays"
                            :show-week-number="showWeekNumber"
                            :week-number-clickable="weekNumberClickable"
                            :range="range"
                            :multiple="multiple"
                            @range-start="date => $emit('range-start', date)"
                            @range-end="date => $emit('range-end', date)"
                            @close="togglePicker(false)"
                            @update:focused="focusedDateData = $event"
                        />
                    </div>
                    <div v-else>
                        <b-datepicker-month
                            v-model="computedValue"
                            :month-names="newMonthNames"
                            :min-date="minDate"
                            :max-date="maxDate"
                            :focused="focusedDateData"
                            :disabled="disabledOrUndefined"
                            :unselectable-dates="unselectableDates"
                            :unselectable-days-of-week="unselectableDaysOfWeek"
                            :selectable-dates="selectableDates"
                            :events="events"
                            :indicators="indicators"
                            :date-creator="dateCreator"
                            :range="range"
                            :multiple="multiple"
                            @range-start="date => $emit('range-start', date)"
                            @range-end="date => $emit('range-end', date)"
                            @close="togglePicker(false)"
                            @change-focus="changeFocus"
                            @update:focused="focusedDateData = $event"
                        />
                    </div>
                </div>

                <footer
                    v-if="$slots.default !== undefined && $slots.default().length"
                    class="datepicker-footer"
                    :class="{'footer-horizontal-timepicker': horizontalTimePicker}"
                >
                    <slot />
                </footer>
            </b-dropdown-item>
        </b-dropdown>

        <b-input
            v-else
            ref="input"
            :type="!isTypeMonth ? 'date' : 'month'"
            autocomplete="off"
            :model-value="formatNative(computedValue as Date | null | undefined)"
            :placeholder="placeholder"
            :size="size"
            :icon="icon"
            :icon-pack="iconPack"
            :rounded="rounded"
            :loading="loading"
            :max="formatNative(maxDate)"
            :min="formatNative(minDate)"
            :disabled="disabledOrUndefined"
            :readonly="false"
            v-bind="fallthroughAttrs"
            :use-html5-validation="false"
            @change="onChangeNativePicker"
            @focus="onFocus"
            @blur="onBlur"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

import CompatFallthroughMixin from '../../utils/CompatFallthroughMixin'
import FormElementMixin from '../../utils/FormElementMixin'
import { isMobile, getMonthNames, getWeekdayNames, matchWithGroups } from '../../utils/helpers'
import config from '../../utils/config'

import BDropdown from '../dropdown/Dropdown.vue'
import BDropdownItem from '../dropdown/DropdownItem.vue'
import BInput from '../input/Input.vue'
import BField from '../field/Field.vue'
import BSelect from '../select/Select.vue'
import BIcon from '../icon/Icon.vue'

import BDatepickerTable from './DatepickerTable.vue'
import BDatepickerMonth from './DatepickerMonth.vue'
import type {
    DateFormatter,
    DateParser,
    DatepickerEvent,
    DateSelector,
    FocusedDate,
    IDatepicker
} from './types'

type BDropdownInstance = InstanceType<typeof BDropdown>
type BInputInstance = InstanceType<typeof BInput>

interface MonthInfo {
    name: string
    index: number
    disabled: boolean
}

const defaultDateFormatter: DateFormatter = (date, vm) => {
    const targetDates = Array.isArray(date) ? date : [date]
    const dates = targetDates.map((date) => {
        const d = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12)
        return !vm.isTypeMonth ? vm.dtf.format(d) : vm.dtfMonth.format(d)
    })
    return !vm.multiple ? dates.join(' - ') : dates.join(', ')
}

const defaultDateParser: DateParser = (date, vm) => {
    if (vm.dtf.formatToParts && typeof vm.dtf.formatToParts === 'function') {
        const formatRegex = (vm.isTypeMonth ? vm.dtfMonth : vm.dtf)
            .formatToParts(new Date(2000, 11, 25)).map((part) => {
                if (part.type === 'literal') {
                    return part.value
                }
                return `((?!=<${part.type}>)\\d+)`
            }).join('')
        const dateGroups = matchWithGroups(formatRegex, date)

        // We do a simple validation for the group.
        // If it is not valid, it will fallback to Date.parse below
        if (
            dateGroups.year &&
            dateGroups.year.length === 4 &&
            dateGroups.month &&
            +dateGroups.month <= 12
        ) {
            if (vm.isTypeMonth) return new Date(+dateGroups.year, +dateGroups.month - 1)
            else if (dateGroups.day && +dateGroups.day <= 31) {
                return new Date(+dateGroups.year, +dateGroups.month - 1, +dateGroups.day, 12)
            }
        }
    }
    // Fallback if formatToParts is not supported or if we were not able to parse a valid date
    if (!vm.isTypeMonth) return new Date(Date.parse(date))
    if (date) {
        const s = date.split('/')
        const year = s[0].length === 4 ? s[0] : s[1]
        const month = s[0].length === 2 ? s[0] : s[1]
        if (year && month) {
            return new Date(parseInt(year, 10), parseInt(month, 10) - 1, 1, 0, 0, 0, 0)
        }
    }
    return null
}

export default defineComponent({
    name: 'BDatepicker',
    components: {
        BDatepickerTable,
        BDatepickerMonth,
        BInput,
        BField,
        BSelect,
        BIcon,
        BDropdown,
        BDropdownItem
    },
    mixins: [CompatFallthroughMixin, FormElementMixin],
    provide() {
        return {
            $datepicker: this
        }
    },
    props: {
        modelValue: {
            type: [Date, Array<Date>, null] as PropType<Date | Date[] | null>
        },
        dayNames: {
            type: [Array<string>, null] as PropType<string[] | null>,
            default: () => {
                if (!Array.isArray(config.defaultDayNames)) {
                    return undefined
                }
                return config.defaultDayNames
            }
        },
        monthNames: {
            type: [Array<string>, null] as PropType<string[] | null>,
            default: () => {
                if (!Array.isArray(config.defaultMonthNames)) {
                    return undefined
                }
                return config.defaultMonthNames
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
        minDate: [Date, null] as PropType<Date | null>,
        maxDate: [Date, null] as PropType<Date | null>,
        focusedDate: Date,
        placeholder: String,
        editable: Boolean,
        disabled: Boolean,
        horizontalTimePicker: Boolean,
        unselectableDates: [Array, Function] as PropType<Date[] | DateSelector>,
        unselectableDaysOfWeek: {
            type: [Array<number>, null] as PropType<number[] | null>,
            default: () => config.defaultUnselectableDaysOfWeek
        },
        selectableDates: [Array, Function] as PropType<Date[] | DateSelector>,
        dateFormatter: {
            type: Function as PropType<DateFormatter>,
            default: (date: Date, vm: IDatepicker) => {
                if (typeof config.defaultDateFormatter === 'function') {
                    return config.defaultDateFormatter(date)
                } else {
                    return defaultDateFormatter(date, vm)
                }
            }
        },
        dateParser: {
            type: Function as PropType<DateParser>,
            default: (date: string, vm: IDatepicker) => {
                if (typeof config.defaultDateParser === 'function') {
                    return config.defaultDateParser(date)
                } else {
                    return defaultDateParser(date, vm)
                }
            }
        },
        dateCreator: {
            type: Function as PropType<() => Date>,
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
            default: () => config.defaultDatepickerMobileNative
        },
        position: String,
        iconRight: String,
        iconRightClickable: Boolean,
        events: Array<Date | DatepickerEvent>,
        indicators: {
            type: String,
            default: 'dots'
        },
        openOnFocus: Boolean,
        iconPrev: {
            type: String,
            default: () => config.defaultIconPrev
        },
        iconNext: {
            type: String,
            default: () => config.defaultIconNext
        },
        yearsRange: {
            type: Array<number>,
            default: () => config.defaultDatepickerYearsRange
        },
        type: {
            type: String,
            validator: (value) => {
                return [
                    'month'
                ].indexOf(value as string) >= 0
            }
        },
        nearbyMonthDays: {
            type: Boolean,
            default: () => config.defaultDatepickerNearbyMonthDays
        },
        nearbySelectableMonthDays: {
            type: Boolean,
            default: () => config.defaultDatepickerNearbySelectableMonthDays
        },
        showWeekNumber: {
            type: Boolean,
            default: () => config.defaultDatepickerShowWeekNumber
        },
        weekNumberClickable: {
            type: Boolean,
            default: () => config.defaultDatepickerWeekNumberClickable
        },
        rulesForFirstWeek: {
            type: Number,
            default: () => 4
        },
        range: {
            type: Boolean,
            default: false
        },
        closeOnClick: {
            type: Boolean,
            default: true
        },
        multiple: {
            type: Boolean,
            default: false
        },
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
        appendToBody: Boolean,
        ariaNextLabel: String,
        ariaPreviousLabel: String
    },
    emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        'active-change': (_active: boolean) => true,
        'change-month': (_month: number) => true,
        'change-year': (_year: number) => true,
        'icon-right-click': (_event: MouseEvent) => true,
        'range-end': (_date: Date) => true,
        'range-start': (_date: Date) => true,
        'update:modelValue': (_value: Date | Date[] | null | undefined) => true,
        'week-number-click': (_week: number, _year: number) => true // emitted by `DatepickerTableRow`
        /* eslint-enable @typescript-eslint/no-unused-vars */
    },
    data() {
        const focusedDate = (Array.isArray(this.modelValue)
            ? this.modelValue[0]
            : (this.modelValue)) || this.focusedDate || this.dateCreator()

        if (!this.modelValue &&
            this.maxDate &&
            this.maxDate.getFullYear() < focusedDate.getFullYear()) {
            focusedDate.setFullYear(this.maxDate.getFullYear())
        }

        return {
            dateSelected: this.modelValue,
            focusedDateData: {
                day: focusedDate.getDate(),
                month: focusedDate.getMonth(),
                year: focusedDate.getFullYear()
            } as FocusedDate,
            _elementRef: 'input',
            _isDatepicker: true
        }
    },
    computed: {
        computedValue: {
            get() {
                return this.dateSelected
            },
            set(value: Date | Date[] | null | undefined) {
                this.updateInternalState(value)
                if (!this.multiple) this.togglePicker(false)
                this.$emit('update:modelValue', value)
                if (this.useHtml5Validation) {
                    this.$nextTick(() => {
                        this.checkHtml5Validity()
                    })
                }
            }
        },
        formattedValue() {
            return this.formatValue(this.computedValue)
        },
        localeOptions() {
            return new Intl.DateTimeFormat(this.locale, {
                year: 'numeric',
                month: 'numeric'
            }).resolvedOptions() as Intl.DateTimeFormatOptions
        },
        dtf() {
            return new Intl.DateTimeFormat(this.locale)
        },
        dtfMonth() {
            return new Intl.DateTimeFormat(this.locale, {
                year: this.localeOptions.year || 'numeric',
                month: this.localeOptions.month || '2-digit'
            })
        },
        newMonthNames() {
            if (Array.isArray(this.monthNames)) {
                return this.monthNames
            }
            return getMonthNames(this.locale)
        },
        newDayNames() {
            if (Array.isArray(this.dayNames)) {
                return this.dayNames
            }
            return getWeekdayNames(this.locale)
        },
        listOfMonths(): MonthInfo[] {
            let minMonth = 0
            let maxMonth = 12
            if (this.minDate && this.focusedDateData.year === this.minDate.getFullYear()) {
                minMonth = this.minDate.getMonth()
            }
            if (this.maxDate && this.focusedDateData.year === this.maxDate.getFullYear()) {
                maxMonth = this.maxDate.getMonth()
            }
            return this.newMonthNames.map((name, index) => {
                return {
                    name,
                    index,
                    disabled: index < minMonth || index > maxMonth
                }
            })
        },
        /*
         * Returns an array of years for the year dropdown. If earliest/latest
         * dates are set by props, range of years will fall within those dates.
         */
        listOfYears() {
            let latestYear = this.focusedDateData.year + this.yearsRange[1]
            if (this.maxDate && this.maxDate.getFullYear() < latestYear) {
                latestYear = Math.max(this.maxDate.getFullYear(), this.focusedDateData.year)
            }

            let earliestYear = this.focusedDateData.year + this.yearsRange[0]
            if (this.minDate && this.minDate.getFullYear() > earliestYear) {
                earliestYear = Math.min(this.minDate.getFullYear(), this.focusedDateData.year)
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
        },

        ariaRole() {
            if (!this.inline) {
                return 'dialog'
            } else {
                return undefined
            }
        },

        disabledOrUndefined() {
            // On Vue 3, setting a boolean attribute `false` does not remove it,
            // `null` or `undefined` has to be given to remove it.
            return this.disabled || undefined
        }
    },
    watch: {
        /*
         * When v-model is changed:
         *   1. Update internal value.
         *   2. If it's invalid, validate again.
         */
        modelValue(value) {
            this.updateInternalState(value)
            if (!this.multiple) this.togglePicker(false)
        },

        focusedDate(value) {
            if (value) {
                this.focusedDateData = {
                    day: value.getDate(),
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
        onChange(value: string) {
            const date = this.dateParser(value, this)
            if (date && (!isNaN(date.valueOf()) ||
                (Array.isArray(date) && date.length === 2 && !isNaN(date[0]) && !isNaN(date[1])))) {
                this.computedValue = date
            } else {
                // Force refresh input value when not valid date
                this.computedValue = null
                if (this.$refs.input) {
                    (this.$refs.input as BInputInstance).newValue = this.computedValue
                }
            }
        },

        /*
         * Format date into string
         */
        formatValue(value: Date | Date[] | null | undefined) {
            if (Array.isArray(value)) {
                const isArrayWithValidDates =
                    Array.isArray(value) && value.every((v) => !isNaN(v?.valueOf() ?? NaN))
                return isArrayWithValidDates ? this.dateFormatter([...value], this) : null
            }
            return (value && !isNaN(value.valueOf())) ? this.dateFormatter(value, this) : null
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

        formatNative(value: Date | null | undefined) {
            return this.isTypeMonth
                ? this.formatYYYYMM(value)
                : this.formatYYYYMMDD(value)
        },

        /*
         * Format date into string 'YYYY-MM-DD'
         */
        formatYYYYMMDD(value: Date | null | undefined) {
            const date = new Date(value!)
            if (value && !isNaN(date.valueOf())) {
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
        formatYYYYMM(value: Date | null | undefined) {
            const date = new Date(value!)
            if (value && !isNaN(date.valueOf())) {
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
        onChangeNativePicker(event: { target?: { value: string } }) {
            const date = event.target!.value
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
        updateInternalState(value: Date | Date[] | null | undefined) {
            if (this.dateSelected === value) return
            const isArray = Array.isArray(value)
            const currentDate = isArray
                ? (!value.length ? this.dateCreator() : value[value.length - 1])
                : (!value ? this.dateCreator() : value)
            if (
                !isArray ||
                (this.dateSelected && value.length > (this.dateSelected as Date[]).length)
            ) {
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
        togglePicker(active: boolean) {
            if (this.$refs.dropdown) {
                const isActive = typeof active === 'boolean'
                    ? active
                    : !(this.$refs.dropdown as BDropdownInstance).isActive
                if (isActive) {
                    (this.$refs.dropdown as BDropdownInstance).isActive = isActive
                } else if (this.closeOnClick) {
                    (this.$refs.dropdown as BDropdownInstance).isActive = isActive
                }
            }
        },

        /*
         * Call default onFocus method and show datepicker
         */
        handleOnFocus(event?: Event) {
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
                const input = (this.$refs.input as BInputInstance).$refs.input as HTMLElement
                input.focus()
                input.click()
                return
            }
            (this.$refs.dropdown as BDropdownInstance).toggle()
        },

        /*
         * Avoid dropdown toggle when is already visible
         */
        onInputClick(event: MouseEvent) {
            if ((this.$refs.dropdown as BDropdownInstance).isActive) {
                event.stopPropagation()
            }
        },

        /*
         * Keypress event that is bound to the document.
         */
        keyPress({ key }: KeyboardEvent) {
            if (this.$refs.dropdown && (this.$refs.dropdown as BDropdownInstance).isActive && (key === 'Escape' || key === 'Esc')) {
                this.togglePicker(false)
            }
        },

        /*
         * Emit 'blur' event on dropdown is not active (closed)
         */
        onActiveChange(value: boolean) {
            if (!value) {
                this.onBlur()
            }
            /*
             * Emit 'active-change' when on dropdown active state change
             */
            this.$emit('active-change', value)
        },

        changeFocus(day: Date) {
            this.focusedDateData = {
                day: day.getDate(),
                month: day.getMonth(),
                year: day.getFullYear()
            }
        }
    },
    created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('keyup', this.keyPress)
        }
    },
    beforeUnmount() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('keyup', this.keyPress)
        }
    }
})
</script>
