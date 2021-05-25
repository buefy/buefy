<template>
    <section class="datepicker-table">
        <div class="datepicker-body" :class="{'has-events':hasEvents}">
            <div class="datepicker-months">
                <template v-for="(date, index) in monthDates">
                    <a
                        :ref="`month-${date.getMonth()}`"
                        v-if="selectableDate(date) && !disabled"
                        :key="index"
                        :class="[
                            classObject(date),
                            {'has-event': eventsDateMatch(date)},
                            indicators
                        ]"
                        class="datepicker-cell"
                        role="button"
                        href="#"
                        :disabled="disabled"
                        @click.prevent="updateSelectedDate(date)"
                        @mouseenter="setRangeHoverEndDate(date)"
                        @keydown.prevent="manageKeydown($event, date)"
                        :tabindex="focused.month === date.getMonth() ? null : -1">
                        {{ monthNames[date.getMonth()] }}
                        <div class="events" v-if="eventsDateMatch(date)">
                            <div
                                class="event"
                                :class="event.type"
                                v-for="(event, index) in eventsDateMatch(date)"
                                :key="index"/>
                        </div>
                    </a>
                    <div
                        v-else
                        :key="index"
                        :class="classObject(date)"
                        class="datepicker-cell">
                        {{ monthNames[date.getMonth()] }}
                    </div>
                </template>
            </div>
        </div>
    </section>
</template>

<script>
import { isDefined } from '../../utils/helpers'

export default {
    name: 'BDatepickerMonth',
    props: {
        value: {
            type: [Date, Array]
        },
        monthNames: Array,
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
        range: Boolean,
        multiple: Boolean
    },
    data() {
        return {
            selectedBeginDate: undefined,
            selectedEndDate: undefined,
            hoveredEndDate: undefined,
            multipleSelectedDates: this.multiple && this.value ? this.value : []
        }
    },
    computed: {
        hasEvents() {
            return this.events && this.events.length
        },

        /*
        * Return array of all events in the specified month
        */
        eventsInThisYear() {
            if (!this.events) return []

            const yearEvents = []

            for (let i = 0; i < this.events.length; i++) {
                let event = this.events[i]

                if (!event.hasOwnProperty('date')) {
                    event = { date: event }
                }
                if (!event.hasOwnProperty('type')) {
                    event.type = 'is-primary'
                }
                if (
                    event.date.getFullYear() === this.focused.year
                ) {
                    yearEvents.push(event)
                }
            }

            return yearEvents
        },
        monthDates() {
            const year = this.focused.year
            const months = []
            for (let i = 0; i < 12; i++) {
                const d = new Date(year, i, 1)
                d.setHours(0, 0, 0, 0)
                months.push(d)
            }
            return months
        },

        focusedMonth() {
            return this.focused.month
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
    watch: {
        focusedMonth(month) {
            const refName = `month-${month}`
            if (this.$refs[refName] && this.$refs[refName].length > 0) {
                this.$nextTick(() => {
                    if (this.$refs[refName][0]) {
                        this.$refs[refName][0].focus()
                    }
                }) // $nextTick needed when year is changed
            }
        }
    },
    methods: {
        selectMultipleDates(date) {
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
                this.multipleSelectedDates.push(date)
            }
            this.$emit('input', this.multipleSelectedDates)
        },

        selectableDate(day) {
            const validity = []

            if (this.minDate) {
                validity.push(day >= this.minDate)
            }

            if (this.maxDate) {
                validity.push(day <= this.maxDate)
            }

            validity.push(day.getFullYear() === this.focused.year)

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
                        if (day.getFullYear() === enabledDate.getFullYear() &&
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
        eventsDateMatch(day) {
            if (!this.eventsInThisYear.length) return false

            const monthEvents = []

            for (let i = 0; i < this.eventsInThisYear.length; i++) {
                if (this.eventsInThisYear[i].date.getMonth() === day.getMonth()) {
                    monthEvents.push(this.events[i])
                }
            }

            if (!monthEvents.length) {
                return false
            }

            return monthEvents
        },
        /*
        * Build classObject for cell using validations
        */
        classObject(day) {
            function dateMatch(dateOne, dateTwo, multiple) {
                // if either date is null or undefined, return false
                if (!dateOne || !dateTwo || multiple) {
                    return false
                }
                if (Array.isArray(dateTwo)) {
                    return dateTwo.some((date) => (
                        dateOne.getFullYear() === date.getFullYear() &&
                        dateOne.getMonth() === date.getMonth()
                    ))
                }
                return (dateOne.getFullYear() === dateTwo.getFullYear() &&
                    dateOne.getMonth() === dateTwo.getMonth())
            }
            function dateWithin(dateOne, dates, multiple) {
                if (!Array.isArray(dates) || multiple) { return false }

                return dateOne > dates[0] && dateOne < dates[1]
            }
            function dateMultipleSelected(dateOne, dates, multiple) {
                if (!Array.isArray(dates) || !multiple) { return false }
                return dates.some((date) => (
                    dateOne.getDate() === date.getDate() &&
                    dateOne.getFullYear() === date.getFullYear() &&
                    dateOne.getMonth() === date.getMonth()
                ))
            }

            return {
                'is-selected': dateMatch(day, this.value, this.multiple) ||
                               dateWithin(day, this.value, this.multiple) ||
                               dateMultipleSelected(day, this.multipleSelectedDates, this.multiple),
                'is-first-selected':
                    dateMatch(
                        day,
                        Array.isArray(this.value) && this.value[0],
                        this.multiple
                    ),
                'is-within-selected':
                    dateWithin(day, this.value, this.multiple),
                'is-last-selected':
                    dateMatch(
                        day,
                        Array.isArray(this.value) && this.value[1],
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
                'is-unselectable': !this.selectableDate(day) || this.disabled
            }
        },

        manageKeydown({ key }, date) {
            // https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent/key/Key_Values#Navigation_keys
            switch (key) {
                case ' ':
                case 'Space':
                case 'Spacebar':
                case 'Enter': {
                    this.updateSelectedDate(date)
                    break
                }

                case 'ArrowLeft':
                case 'Left': {
                    this.changeFocus(date, -1)
                    break
                }
                case 'ArrowRight':
                case 'Right': {
                    this.changeFocus(date, 1)
                    break
                }
                case 'ArrowUp':
                case 'Up': {
                    this.changeFocus(date, -3)
                    break
                }
                case 'ArrowDown':
                case 'Down': {
                    this.changeFocus(date, 3)
                    break
                }
            }
        },

        /*
        * Emit input event with selected date as payload for v-model in parent
        */
        updateSelectedDate(date) {
            if (!this.range && !this.multiple) {
                this.emitChosenDate(date)
            } else if (this.range) {
                this.handleSelectRangeDate(date)
            } else if (this.multiple) {
                this.selectMultipleDates(date)
            }
        },

        /*
         * Emit select event with chosen date as payload
         */
        emitChosenDate(day) {
            if (this.disabled) return

            if (!this.multiple) {
                if (this.selectableDate(day)) {
                    this.$emit('input', day)
                }
            } else {
                this.selectMultipleDates(day)
            }
        },

        /*
        * If both begin and end dates are set, reset the end date and set the begin date.
        * If only begin date is selected, emit an array of the begin date and the new date.
        * If not set, only set the begin date.
        */
        handleSelectRangeDate(date) {
            if (this.disabled) return
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

        setRangeHoverEndDate(day) {
            if (this.range) {
                this.hoveredEndDate = day
            }
        },

        changeFocus(month, inc) {
            const nextMonth = month
            nextMonth.setMonth(month.getMonth() + inc)
            this.$emit('change-focus', nextMonth)
        }
    }
}
</script>
