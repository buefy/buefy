<template>
    <div class="datepicker-row">
        <a class="datepicker-cell is-week-number" v-if="showWeekNumber">
            {{ getWeekNumber(week[6]) }}
        </a>
        <template v-for="(day, index) in week">
            <a
                v-if="selectableDate(day) && !disabled"
                :key="index"
                :class="[classObject(day), {'has-event': eventsDateMatch(day)}, indicators]"
                class="datepicker-cell"
                role="button"
                href="#"
                :disabled="disabled"
                @click.prevent="emitChosenDate(day)"
                @keydown.enter.prevent="emitChosenDate(day)"
                @keydown.space.prevent="emitChosenDate(day)"
                @mouseenter="setRangeHoverEndDate(day)">
                {{ day.getDate() }}
                <div class="events" v-if="eventsDateMatch(day)">
                    <div
                        class="event"
                        :class="event.type"
                        v-for="(event, index) in eventsDateMatch(day)"
                        :key="index"/>
                </div>
            </a>
            <div
                v-else
                :key="index"
                :class="classObject(day)"
                class="datepicker-cell">
                {{ day.getDate() }}
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'BDatepickerTableRow',
    props: {
        selectedDate: {
            type: [Date, Array]
        },
        hoveredDateRange: Array,
        week: {
            type: Array,
            required: true
        },
        month: {
            type: Number,
            required: true
        },
        minDate: Date,
        maxDate: Date,
        disabled: Boolean,
        unselectableDates: Array,
        unselectableDaysOfWeek: Array,
        selectableDates: Array,
        events: Array,
        indicators: String,
        dateCreator: Function,
        nearbyMonthDays: Boolean,
        nearbySelectableMonthDays: Boolean,
        showWeekNumber: {
            type: Boolean,
            default: () => false
        },
        range: Boolean,
        multiple: Boolean,
        rulesForFirstWeek: {
            type: Number,
            default: () => 4
        },
        firstDayOfWeek: Number
    },
    methods: {
        firstWeekOffset(year, dow, doy) {
            // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            const fwd = 7 + dow - doy
            // first-week day local weekday -- which local weekday is fwd
            const firstJanuary = new Date(year, 0, fwd)
            const fwdlw = (7 + firstJanuary.getDay() - dow) % 7
            return -fwdlw + fwd - 1
        },
        daysInYear(year) {
            return this.isLeapYear(year) ? 366 : 365
        },
        isLeapYear(year) {
            return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
        },
        getSetDayOfYear(input) {
            return Math.round((input - new Date(input.getFullYear(), 0, 1)) / 864e5) + 1
        },
        weeksInYear(year, dow, doy) {
            const weekOffset = this.firstWeekOffset(year, dow, doy)
            const weekOffsetNext = this.firstWeekOffset(year + 1, dow, doy)
            return (this.daysInYear(year) - weekOffset + weekOffsetNext) / 7
        },
        getWeekNumber(mom) {
            const dow = this.firstDayOfWeek // first day of week
            // Rules for the first week : 1 for the 1st January, 4 for the 4th January
            const doy = this.rulesForFirstWeek
            const weekOffset = this.firstWeekOffset(mom.getFullYear(), dow, doy)
            const week = Math.floor((this.getSetDayOfYear(mom) - weekOffset - 1) / 7) + 1
            let resWeek
            let resYear
            if (week < 1) {
                resYear = mom.getFullYear() - 1
                resWeek = week + this.weeksInYear(resYear, dow, doy)
            } else if (week > this.weeksInYear(mom.getFullYear(), dow, doy)) {
                resWeek = week - this.weeksInYear(mom.getFullYear(), dow, doy)
                resYear = mom.getFullYear() + 1
            } else {
                resYear = mom.getFullYear()
                resWeek = week
            }

            return resWeek
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
                validity.push(day.getMonth() === this.month)
            }

            if (this.selectableDates) {
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

            if (this.unselectableDates) {
                for (let i = 0; i < this.unselectableDates.length; i++) {
                    const disabledDate = this.unselectableDates[i]
                    validity.push(
                        day.getDate() !== disabledDate.getDate() ||
                            day.getFullYear() !== disabledDate.getFullYear() ||
                            day.getMonth() !== disabledDate.getMonth()
                    )
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

        /*
        * Emit select event with chosen date as payload
        */
        emitChosenDate(day) {
            if (this.disabled) return

            if (this.selectableDate(day)) {
                this.$emit('select', day)
            }
        },

        eventsDateMatch(day) {
            if (!this.events || !this.events.length) return false

            const dayEvents = []

            for (let i = 0; i < this.events.length; i++) {
                if (this.events[i].date.getDay() === day.getDay()) {
                    dayEvents.push(this.events[i])
                }
            }

            if (!dayEvents.length) {
                return false
            }

            return dayEvents
        },

        /*
        * Build classObject for cell using validations
        */
        classObject(day) {
            function dateMatch(dateOne, dateTwo, multiple) {
                // if either date is null or undefined, return false
                // if using multiple flag, return false
                if (!dateOne || !dateTwo || multiple) {
                    return false
                }

                if (Array.isArray(dateTwo)) {
                    return dateTwo.some((date) => (
                        dateOne.getDate() === date.getDate() &&
                        dateOne.getFullYear() === date.getFullYear() &&
                        dateOne.getMonth() === date.getMonth()
                    ))
                }
                return (dateOne.getDate() === dateTwo.getDate() &&
                    dateOne.getFullYear() === dateTwo.getFullYear() &&
                    dateOne.getMonth() === dateTwo.getMonth())
            }

            function dateWithin(dateOne, dates, multiple) {
                if (!Array.isArray(dates) || multiple) { return false }

                return dateOne > dates[0] && dateOne < dates[1]
            }

            return {
                'is-selected': dateMatch(day, this.selectedDate) || dateWithin(day, this.selectedDate, this.multiple),
                'is-first-selected':
                    dateMatch(
                        day,
                        Array.isArray(this.selectedDate) && this.selectedDate[0],
                        this.multiple
                    ),
                'is-within-selected':
                    dateWithin(day, this.selectedDate, this.multiple),
                'is-last-selected':
                    dateMatch(
                        day,
                        Array.isArray(this.selectedDate) && this.selectedDate[1],
                        this.multiple
                    ),
                'is-within-hovered-range':
                    this.hoveredDateRange && this.hoveredDateRange.length === 2 &&
                    (dateMatch(day, this.hoveredDateRange) ||
                        dateWithin(day, this.hoveredDateRange)),
                'is-first-hovered': dateMatch(
                    day,
                    Array.isArray(this.hoveredDateRange) && this.hoveredDateRange[0]
                ),
                'is-within-hovered':
                    dateWithin(day, this.hoveredDateRange),
                'is-last-hovered': dateMatch(
                    day,
                    Array.isArray(this.hoveredDateRange) && this.hoveredDateRange[1]
                ),
                'is-today': dateMatch(day, this.dateCreator()),
                'is-selectable': this.selectableDate(day) && !this.disabled,
                'is-unselectable': !this.selectableDate(day) || this.disabled,
                'is-invisible': !this.nearbyMonthDays && day.getMonth() !== this.month,
                'is-nearby': this.nearbySelectableMonthDays && day.getMonth() !== this.month
            }
        },
        setRangeHoverEndDate(day) {
            if (this.range) {
                this.$emit('rangeHoverEndDate', day)
            }
        }
    }
}
</script>
