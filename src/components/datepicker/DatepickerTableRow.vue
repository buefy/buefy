<template>
    <div class="datepicker-row">
        <a
            class="datepicker-cell is-week-number"
            :class="{'is-clickable': weekNumberClickable }"
            v-if="showWeekNumber"
            @click.prevent="clickWeekNumber(getWeekNumber(week[6]))">
            <span>{{ getWeekNumber(week[6]) }}</span>
        </a>
        <template v-for="(weekDay, index) in week">
            <a
                :ref="`day-${weekDay.getMonth()}-${weekDay.getDate()}`"
                v-if="selectableDate(weekDay) && !disabled"
                :key="index"
                :class="classObject(weekDay)"
                class="datepicker-cell"
                role="button"
                href="#"
                :disabled="disabled"
                @click.prevent="emitChosenDate(weekDay)"
                @mouseenter="setRangeHoverEndDate(weekDay)"
                @keydown="manageKeydown($event, weekDay)"
                :tabindex="day === weekDay.getDate() ? null : -1">
                <span>{{ weekDay.getDate() }}</span>
                <div class="events" v-if="eventsDateMatch(weekDay)">
                    <div
                        class="event"
                        :class="event.type"
                        v-for="(event, index) in eventsDateMatch(weekDay)"
                        :key="index"/>
                </div>
            </a>
            <div
                v-else
                :key="index"
                :class="classObject(weekDay)"
                class="datepicker-cell">
                <span>{{ weekDay.getDate() }}</span>
                <div class="events" v-if="eventsDateMatch(weekDay)">
                    <div
                        class="event"
                        :class="event.type"
                        v-for="(event, index) in eventsDateMatch(weekDay)"
                        :key="index"/>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'BDatepickerTableRow',
    inject: {
        $datepicker: { name: '$datepicker', default: false }
    },
    props: {
        selectedDate: {
            type: [Date, Array]
        },
        hoveredDateRange: Array,
        day: {
            type: Number
        },
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
        unselectableDates: [Array, Function],
        unselectableDaysOfWeek: Array,
        selectableDates: [Array, Function],
        events: Array,
        indicators: String,
        dateCreator: Function,
        nearbyMonthDays: Boolean,
        nearbySelectableMonthDays: Boolean,
        showWeekNumber: Boolean,
        weekNumberClickable: Boolean,
        range: Boolean,
        multiple: Boolean,
        rulesForFirstWeek: Number,
        firstDayOfWeek: Number
    },
    watch: {
        day(day) {
            const refName = `day-${this.month}-${day}`
            this.$nextTick(() => {
                if (this.$refs[refName] && this.$refs[refName].length > 0) {
                    if (this.$refs[refName][0]) {
                        this.$refs[refName][0].focus()
                    }
                }
            }) // $nextTick needed when month is changed
        }
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
        clickWeekNumber(week) {
            if (this.weekNumberClickable) {
                this.$datepicker.$emit('week-number-click', week)
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
                validity.push(day.getMonth() === this.month)
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
                'is-nearby': this.nearbySelectableMonthDays && day.getMonth() !== this.month,
                'has-event': this.eventsDateMatch(day),
                [this.indicators]: this.eventsDateMatch(day)
            }
        },
        setRangeHoverEndDate(day) {
            if (this.range) {
                this.$emit('rangeHoverEndDate', day)
            }
        },

        manageKeydown(event, weekDay) {
            // https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent/key/Key_Values#Navigation_keys
            const { key } = event
            let preventDefault = true
            switch (key) {
                case 'Tab': {
                    preventDefault = false
                    break
                }

                case ' ':
                case 'Space':
                case 'Spacebar':
                case 'Enter': {
                    this.emitChosenDate(weekDay)
                    break
                }

                case 'ArrowLeft':
                case 'Left': {
                    this.changeFocus(weekDay, -1)
                    break
                }
                case 'ArrowRight':
                case 'Right': {
                    this.changeFocus(weekDay, 1)
                    break
                }
                case 'ArrowUp':
                case 'Up': {
                    this.changeFocus(weekDay, -7)
                    break
                }
                case 'ArrowDown':
                case 'Down': {
                    this.changeFocus(weekDay, 7)
                    break
                }
            }

            if (preventDefault) {
                event.preventDefault()
            }
        },

        changeFocus(day, inc) {
            const nextDay = new Date(day.getTime())
            nextDay.setDate(day.getDate() + inc)
            while (
                (!this.minDate || nextDay > this.minDate) &&
                (!this.maxDate || nextDay < this.maxDate) &&
                !this.selectableDate(nextDay)
            ) {
                nextDay.setDate(day.getDate() + Math.sign(inc))
            }
            this.setRangeHoverEndDate(nextDay)
            this.$emit('change-focus', nextDay)
        }
    }
}
</script>
