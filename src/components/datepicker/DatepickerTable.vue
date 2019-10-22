<template>
    <section class="datepicker-table">
        <header class="datepicker-header">
            <div
                v-for="(day, index) in visibleDayNames"
                :key="index"
                class="datepicker-cell">
                {{ day }}
            </div>
        </header>
        <div class="datepicker-body" :class="{'has-events':hasEvents}">
            <b-datepicker-table-row
                v-for="(week, index) in weeksInThisMonth"
                :key="index"
                :selected-date="value"
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
                :first-day-of-week="firstDayOfWeek"
                :rules-for-first-week="rulesForFirstWeek"
                :range="range"
                :hovered-date-range="hoveredDateRange"
                @select="updateSelectedDate"
                @rangeHoverEndDate="setRangeHoverEndDate"
                :multiple="multiple"/>
        </div>
    </section>
</template>

<script>
import DatepickerTableRow from './DatepickerTableRow'

const isDefined = (d) => d !== undefined

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
        unselectableDates: Array,
        unselectableDaysOfWeek: Array,
        selectableDates: Array,
        nearbyMonthDays: Boolean,
        nearbySelectableMonthDays: Boolean,
        showWeekNumber: {
            type: Boolean,
            default: () => false
        },
        rulesForFirstWeek: {
            type: Number,
            default: () => 4
        },
        range: Boolean,
        multiple: Boolean
    },
    data() {
        return {
            selectedBeginDate: undefined,
            selectedEndDate: undefined,
            hoveredEndDate: undefined,
            multipleSelectedDates: []
        }
    },
    computed: {
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
            } else if (this.selectedBeginDate && !this.selectedEndDate) {
                if (this.selectedBeginDate > date) {
                    this.selectedEndDate = this.selectedBeginDate
                    this.selectedBeginDate = date
                } else {
                    this.selectedEndDate = date
                }
                this.$emit('input', [this.selectedBeginDate, this.selectedEndDate])
            } else {
                this.selectedBeginDate = date
            }
        },

        /*
        * If selected date already exists list of selected dates, remove it from the list
        * Otherwise, add date to list of selected dates
        */
        handleSelectMultipleDates(date) {
            if (
                this.multipleSelectedDates.find((selectedDate) =>
                    selectedDate.valueOf() === date.valueOf()
                )
            ) {
                this.multipleSelectedDates = this.multipleSelectedDates.filter((selectedDate) =>
                    selectedDate.valueOf() !== date.valueOf()
                )
            } else {
                this.multipleSelectedDates.push(date)
            }
            this.$emit('input', this.multipleSelectedDates)
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
        }
    }
}
</script>
