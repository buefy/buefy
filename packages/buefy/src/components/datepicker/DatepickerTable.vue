<template>
    <section class="datepicker-table">
        <header class="datepicker-header">
            <div
                v-for="(day, index) in visibleDayNames"
                :key="index"
                class="datepicker-cell"
            >
                <span>{{ day }}</span>
            </div>
        </header>
        <div class="datepicker-body" :class="{'has-events':hasEvents}">
            <b-datepicker-table-row
                v-for="(week, index) in weeksInThisMonth"
                :key="index"
                :selected-date="modelValue ?? undefined"
                :day="focused!.day"
                :week="week"
                :month="focused!.month"
                :min-date="minDate"
                :max-date="maxDate"
                :disabled="disabledOrUndefined"
                :unselectable-dates="unselectableDates"
                :unselectable-days-of-week="unselectableDaysOfWeek"
                :selectable-dates="selectableDates"
                :events="eventsInThisWeek(week)"
                :indicators="indicators"
                :date-creator="dateCreator"
                :nearby-month-days="nearbyMonthDays"
                :nearby-selectable-month-days="nearbySelectableMonthDays"
                :show-week-number="showWeekNumber"
                :week-number-clickable="weekNumberClickable"
                :first-day-of-week="firstDayOfWeek"
                :rules-for-first-week="rulesForFirstWeek"
                :range="range"
                :hovered-date-range="hoveredDateRange"
                @select="updateSelectedDate"
                @range-hover-end-date="setRangeHoverEndDate"
                :multiple="multiple"
                @change-focus="changeFocus"
            />
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

import BDatepickerTableRow from './DatepickerTableRow.vue'
import type { DatepickerEvent, DateSelector, FocusedDate } from './types'
import { isDefined } from '../../utils/helpers'

export default defineComponent({
    name: 'BDatepickerTable',
    components: {
        BDatepickerTableRow
    },
    props: {
        modelValue: {
            type: [Date, Array<Date>, null] as PropType<Date | Date[] | null>
        },
        dayNames: [Array<string>, null] as PropType<string[] | null>,
        monthNames: [Array<string>, null] as PropType<string[] | null>,
        firstDayOfWeek: [Number, null] as PropType<number | null>,
        events: Array<Date | DatepickerEvent>,
        indicators: String,
        minDate: [Date, null] as PropType<Date | null>,
        maxDate: [Date, null] as PropType<Date | null>,
        focused: Object as PropType<FocusedDate>,
        disabled: Boolean,
        dateCreator: Function as PropType<() => Date>,
        unselectableDates: [Array, Function, null] as PropType<Date[] | DateSelector | null>,
        unselectableDaysOfWeek: [Array<number>, null] as PropType<number[] | null>,
        selectableDates: [Array, Function, null] as PropType<Date[] | DateSelector | null>,
        nearbyMonthDays: Boolean,
        nearbySelectableMonthDays: Boolean,
        showWeekNumber: Boolean,
        weekNumberClickable: Boolean,
        rulesForFirstWeek: Number,
        range: Boolean,
        multiple: Boolean
    },
    emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        'range-end': (_date: Date) => true,
        'range-start': (_date: Date) => true,
        'update:focused': (_focused: FocusedDate) => true,
        'update:modelValue': (_value: Date | Date[] | undefined) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
    },
    data() {
        return {
            selectedBeginDate: undefined as Date | undefined,
            selectedEndDate: undefined as Date | undefined,
            hoveredEndDate: undefined as Date | undefined
        }
    },
    computed: {
        multipleSelectedDates: {
            get() {
                return this.multiple && this.modelValue ? this.modelValue : []
            },
            set(value: Date | Date[] | undefined) {
                this.$emit('update:modelValue', value)
            }
        },
        visibleDayNames() {
            const visibleDayNames = []
            let index = this.firstDayOfWeek!
            while (visibleDayNames.length < this.dayNames!.length) {
                const currentDayName = this.dayNames![(index % this.dayNames!.length)]
                visibleDayNames.push(currentDayName)
                index++
            }
            if (this.showWeekNumber) visibleDayNames.unshift('')
            return visibleDayNames
        },

        hasEvents() {
            return this.events && this.events.length
        },

        /*
        * Return array of all events in the specified month
        */
        eventsInThisMonth(): DatepickerEvent[] {
            if (!this.events) return []

            const monthEvents = []

            for (let i = 0; i < this.events.length; i++) {
                let event = this.events[i]

                if (!Object.prototype.hasOwnProperty.call(event, 'date')) {
                    event = { date: event as Date, type: 'is-primary' }
                }
                if (!Object.prototype.hasOwnProperty.call(event, 'type')) {
                    (event as DatepickerEvent).type = 'is-primary'
                }
                if (
                    (event as DatepickerEvent).date.getMonth() === this.focused!.month &&
                    (event as DatepickerEvent).date.getFullYear() === this.focused!.year
                ) {
                    monthEvents.push(event as DatepickerEvent)
                }
            }

            return monthEvents
        },
        /*
        * Return array of all weeks in the specified month
        */
        weeksInThisMonth() {
            this.validateFocusedDay()
            const month = this.focused!.month
            const year = this.focused!.year
            const weeksInThisMonth = []

            let startingDay = 1

            while (weeksInThisMonth.length < 6) {
                const newWeek = this.weekBuilder(startingDay, month, year)
                weeksInThisMonth.push(newWeek)
                startingDay += 7
            }

            return weeksInThisMonth
        },
        hoveredDateRange(): Date[] {
            if (!this.range) {
                return []
            }
            if (!isNaN(this.selectedEndDate?.valueOf() ?? NaN)) {
                return []
            }
            if (this.hoveredEndDate! < this.selectedBeginDate!) {
                return [this.hoveredEndDate, this.selectedBeginDate].filter(isDefined)
            }
            return [this.selectedBeginDate, this.hoveredEndDate].filter(isDefined)
        },

        disabledOrUndefined() {
            // On Vue 3, setting a boolean attribute `false` does not remove it,
            // `null` or `undefined` has to be given to remove it.
            return this.disabled || undefined
        }
    },
    methods: {
        /*
        * Emit input event with selected date as payload for v-model in parent
        */
        updateSelectedDate(date: Date) {
            if (!this.range && !this.multiple) {
                this.$emit('update:modelValue', date)
            } else if (this.range) {
                this.handleSelectRangeDate(date)
            } else if (this.multiple) {
                this.handleSelectMultipleDates(date)
            }
        },

        /*
        * If both begin and end dates are set, reset the end date and set the begin date.
        * If only begin date is selected, emit an array of the begin date and the new date.
        * If not set, only set the begin date.
        */
        handleSelectRangeDate(date: Date) {
            if (this.selectedBeginDate && this.selectedEndDate) {
                this.selectedBeginDate = date
                this.selectedEndDate = undefined
                this.$emit('range-start', date)
            } else if (this.selectedBeginDate && !this.selectedEndDate) {
                if (this.selectedBeginDate > date) {
                    this.selectedEndDate = this.selectedBeginDate
                    this.selectedBeginDate = date
                } else {
                    this.selectedEndDate = date
                }
                this.$emit('range-end', date)
                this.$emit('update:modelValue', [this.selectedBeginDate, this.selectedEndDate])
            } else {
                this.selectedBeginDate = date
                this.$emit('range-start', date)
            }
        },

        /*
        * If selected date already exists list of selected dates, remove it from the list
        * Otherwise, add date to list of selected dates
        */
        handleSelectMultipleDates(date: Date) {
            const multipleSelect = (this.multipleSelectedDates as Date[]).filter((selectedDate) =>
                selectedDate.getDate() === date.getDate() &&
                selectedDate.getFullYear() === date.getFullYear() &&
                selectedDate.getMonth() === date.getMonth()
            )
            if (multipleSelect.length) {
                this.multipleSelectedDates = (this.multipleSelectedDates as Date[])
                    .filter((selectedDate) =>
                        selectedDate.getDate() !== date.getDate() ||
                        selectedDate.getFullYear() !== date.getFullYear() ||
                        selectedDate.getMonth() !== date.getMonth()
                    )
            } else {
                this.multipleSelectedDates = [...(this.multipleSelectedDates as Date[]), date]
            }
        },

        /*
         * Return array of all days in the week that the startingDate is within
         */
        weekBuilder(startingDate: number, month: number, year: number) {
            const thisMonth = new Date(year, month)

            const thisWeek = []

            const dayOfWeek = new Date(year, month, startingDate).getDay()

            const end = dayOfWeek >= this.firstDayOfWeek!
                ? (dayOfWeek - this.firstDayOfWeek!)
                : ((7 - this.firstDayOfWeek!) + dayOfWeek)

            let daysAgo = 1
            for (let i = 0; i < end; i++) {
                thisWeek.unshift(new Date(
                    thisMonth.getFullYear(),
                    thisMonth.getMonth(),
                    startingDate - daysAgo)
                )
                daysAgo++
            }

            thisWeek.push(new Date(year, month, startingDate))

            let daysForward = 1
            while (thisWeek.length < 7) {
                thisWeek.push(new Date(year, month, startingDate + daysForward))
                daysForward++
            }

            return thisWeek
        },

        validateFocusedDay() {
            const focusedDate = new Date(this.focused!.year, this.focused!.month, this.focused!.day)
            if (this.selectableDate(focusedDate)) return

            let day = 0
            // Number of days in the current month
            const monthDays = new Date(this.focused!.year, this.focused!.month + 1, 0).getDate()
            let firstFocusable = null
            while (!firstFocusable && ++day < monthDays) {
                const date = new Date(this.focused!.year, this.focused!.month, day)
                if (this.selectableDate(date)) {
                    firstFocusable = focusedDate

                    const focused = {
                        day: date.getDate(),
                        month: date.getMonth(),
                        year: date.getFullYear()
                    }
                    this.$emit('update:focused', focused)
                }
            }
        },

        /*
         * Check that selected day is within earliest/latest params and
         * is within this month
         */
        selectableDate(day: Date) {
            const validity = []

            if (this.minDate) {
                validity.push(day >= this.minDate)
            }

            if (this.maxDate) {
                validity.push(day <= this.maxDate)
            }

            if (this.nearbyMonthDays && !this.nearbySelectableMonthDays) {
                validity.push(day.getMonth() === this.focused!.month)
            }

            if (this.selectableDates) {
                if (typeof this.selectableDates === 'function') {
                    if (this.selectableDates(day)) {
                        return true
                    } else {
                        validity.push(false)
                    }
                } else {
                    for (let i = 0; i < this.selectableDates.length; i++) {
                        const enabledDate = this.selectableDates[i]
                        if (day.getDate() === enabledDate.getDate() &&
                            day.getFullYear() === enabledDate.getFullYear() &&
                            day.getMonth() === enabledDate.getMonth()) {
                            return true
                        } else {
                            validity.push(false)
                        }
                    }
                }
            }

            if (this.unselectableDates) {
                if (typeof this.unselectableDates === 'function') {
                    validity.push(!this.unselectableDates(day))
                } else {
                    for (let i = 0; i < this.unselectableDates.length; i++) {
                        const disabledDate = this.unselectableDates[i]
                        validity.push(
                            day.getDate() !== disabledDate.getDate() ||
                                day.getFullYear() !== disabledDate.getFullYear() ||
                                day.getMonth() !== disabledDate.getMonth()
                        )
                    }
                }
            }

            if (this.unselectableDaysOfWeek) {
                for (let i = 0; i < this.unselectableDaysOfWeek.length; i++) {
                    const dayOfWeek = this.unselectableDaysOfWeek[i]
                    validity.push(day.getDay() !== dayOfWeek)
                }
            }

            return validity.indexOf(false) < 0
        },

        eventsInThisWeek(week: Date[]) {
            return this.eventsInThisMonth.filter((event) => {
                // TODO: we may do `new Date(event.date)` instead
                const stripped = new Date(Date.parse(event.date + ''))
                stripped.setHours(0, 0, 0, 0)
                const timed = stripped.getTime()

                return week.some((weekDate) => weekDate.getTime() === timed)
            })
        },

        setRangeHoverEndDate(day: Date) {
            this.hoveredEndDate = day
        },

        changeFocus(day: Date) {
            const focused = {
                day: day.getDate(),
                month: day.getMonth(),
                year: day.getFullYear()
            }
            this.$emit('update:focused', focused)
        }
    }
})
</script>
