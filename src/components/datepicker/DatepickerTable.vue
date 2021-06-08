<template>
    <section class="datepicker-table">
        <header class="datepicker-header">
            <div
                v-for="(day, index) in visibleDayNames"
                :key="index"
                class="datepicker-cell">
                <span>{{ day }}</span>
            </div>
        </header>
        <div class="datepicker-body" :class="{'has-events':hasEvents}">
            <b-datepicker-table-row
                v-for="(week, index) in weeksInThisMonth"
                :key="index"
                :selected-date="value"
                :day="focused.day"
                :week="week"
                :month="focused.month"
                :min-date="minDate"
                :max-date="maxDate"
                :disabled="disabled"
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
                @rangeHoverEndDate="setRangeHoverEndDate"
                :multiple="multiple"
                @change-focus="changeFocus"/>
        </div>
    </section>
</template>

<script>
import DatepickerTableRow from './DatepickerTableRow'
import { isDefined } from '../../utils/helpers'

export default {
    name: 'BDatepickerTable',
    components: {
        [DatepickerTableRow.name]: DatepickerTableRow
    },
    props: {
        value: {
            type: [Date, Array]
        },
        dayNames: Array,
        monthNames: Array,
        firstDayOfWeek: Number,
        events: Array,
        indicators: String,
        minDate: Date,
        maxDate: Date,
        focused: Object,
        disabled: Boolean,
        dateCreator: Function,
        unselectableDates: [Array, Function],
        unselectableDaysOfWeek: Array,
        selectableDates: [Array, Function],
        nearbyMonthDays: Boolean,
        nearbySelectableMonthDays: Boolean,
        showWeekNumber: Boolean,
        weekNumberClickable: Boolean,
        rulesForFirstWeek: Number,
        range: Boolean,
        multiple: Boolean
    },
    data() {
        return {
            selectedBeginDate: undefined,
            selectedEndDate: undefined,
            hoveredEndDate: undefined
        }
    },
    computed: {
        multipleSelectedDates: {
            get() {
                return this.multiple && this.value ? this.value : []
            },
            set(value) {
                this.$emit('input', value)
            }
        },
        visibleDayNames() {
            const visibleDayNames = []
            let index = this.firstDayOfWeek
            while (visibleDayNames.length < this.dayNames.length) {
                const currentDayName = this.dayNames[(index % this.dayNames.length)]
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
        eventsInThisMonth() {
            if (!this.events) return []

            const monthEvents = []

            for (let i = 0; i < this.events.length; i++) {
                let event = this.events[i]

                if (!event.hasOwnProperty('date')) {
                    event = { date: event }
                }
                if (!event.hasOwnProperty('type')) {
                    event.type = 'is-primary'
                }
                if (
                    event.date.getMonth() === this.focused.month &&
                    event.date.getFullYear() === this.focused.year
                ) {
                    monthEvents.push(event)
                }
            }

            return monthEvents
        },
        /*
        * Return array of all weeks in the specified month
        */
        weeksInThisMonth() {
            this.validateFocusedDay()
            const month = this.focused.month
            const year = this.focused.year
            const weeksInThisMonth = []

            let startingDay = 1

            while (weeksInThisMonth.length < 6) {
                const newWeek = this.weekBuilder(startingDay, month, year)
                weeksInThisMonth.push(newWeek)
                startingDay += 7
            }

            return weeksInThisMonth
        },
        hoveredDateRange() {
            if (!this.range) {
                return []
            }
            if (!isNaN(this.selectedEndDate)) {
                return []
            }
            if (this.hoveredEndDate < this.selectedBeginDate) {
                return [this.hoveredEndDate, this.selectedBeginDate].filter(isDefined)
            }
            return [this.selectedBeginDate, this.hoveredEndDate].filter(isDefined)
        }
    },
    methods: {
        /*
        * Emit input event with selected date as payload for v-model in parent
        */
        updateSelectedDate(date) {
            if (!this.range && !this.multiple) {
                this.$emit('input', date)
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
        handleSelectRangeDate(date) {
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
                this.$emit('input', [this.selectedBeginDate, this.selectedEndDate])
            } else {
                this.selectedBeginDate = date
                this.$emit('range-start', date)
            }
        },

        /*
        * If selected date already exists list of selected dates, remove it from the list
        * Otherwise, add date to list of selected dates
        */
        handleSelectMultipleDates(date) {
            const multipleSelect = this.multipleSelectedDates.filter((selectedDate) =>
                selectedDate.getDate() === date.getDate() &&
                selectedDate.getFullYear() === date.getFullYear() &&
                selectedDate.getMonth() === date.getMonth()
            )
            if (multipleSelect.length) {
                this.multipleSelectedDates = this.multipleSelectedDates.filter((selectedDate) =>
                    selectedDate.getDate() !== date.getDate() ||
                    selectedDate.getFullYear() !== date.getFullYear() ||
                    selectedDate.getMonth() !== date.getMonth()
                )
            } else {
                this.multipleSelectedDates = [...this.multipleSelectedDates, date]
            }
        },

        /*
         * Return array of all days in the week that the startingDate is within
         */
        weekBuilder(startingDate, month, year) {
            const thisMonth = new Date(year, month)

            const thisWeek = []

            const dayOfWeek = new Date(year, month, startingDate).getDay()

            const end = dayOfWeek >= this.firstDayOfWeek
                ? (dayOfWeek - this.firstDayOfWeek)
                : ((7 - this.firstDayOfWeek) + dayOfWeek)

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
            const focusedDate = new Date(this.focused.year, this.focused.month, this.focused.day)
            if (this.selectableDate(focusedDate)) return

            let day = 0
            // Number of days in the current month
            const monthDays = new Date(this.focused.year, this.focused.month + 1, 0).getDate()
            let firstFocusable = null
            while (!firstFocusable && ++day < monthDays) {
                const date = new Date(this.focused.year, this.focused.month, day)
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
        selectableDate(day) {
            const validity = []

            if (this.minDate) {
                validity.push(day >= this.minDate)
            }

            if (this.maxDate) {
                validity.push(day <= this.maxDate)
            }

            if (this.nearbyMonthDays && !this.nearbySelectableMonthDays) {
                validity.push(day.getMonth() === this.focused.month)
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

        eventsInThisWeek(week) {
            return this.eventsInThisMonth.filter((event) => {
                const stripped = new Date(Date.parse(event.date))
                stripped.setHours(0, 0, 0, 0)
                const timed = stripped.getTime()

                return week.some((weekDate) => weekDate.getTime() === timed)
            })
        },

        setRangeHoverEndDate(day) {
            this.hoveredEndDate = day
        },

        changeFocus(day) {
            const focused = {
                day: day.getDate(),
                month: day.getMonth(),
                year: day.getFullYear()
            }
            this.$emit('update:focused', focused)
        }
    }
}
</script>
