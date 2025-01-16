<template>
    <section class="datepicker-table">
        <div class="datepicker-body" :class="{'has-events':hasEvents}">
            <div class="datepicker-months">
                <template v-for="(date, index) in monthDates" :key="index">
                    <a
                        :ref="`month-${date.getMonth()}`"
                        v-if="selectableDate(date) && !disabled"
                        :class="[
                            classObject(date),
                            {'has-event': eventsDateMatch(date)},
                            indicators
                        ]"
                        class="datepicker-cell"
                        role="button"
                        href="#"
                        :disabled="disabledOrUndefined"
                        @click.prevent="updateSelectedDate(date)"
                        @mouseenter="setRangeHoverEndDate(date)"
                        @keydown.prevent="manageKeydown($event, date)"
                        :tabindex="focused!.month === date.getMonth() ? undefined : -1"
                    >
                        {{ monthNames![date.getMonth()] }}
                        <div class="events" v-if="eventsDateMatch(date)">
                            <div
                                class="event"
                                :class="event.type"
                                v-for="(event, evIdx) in eventsDateMatch(date) as DatepickerEvent[]"
                                :key="evIdx"
                            />
                        </div>
                    </a>
                    <div
                        v-else
                        :class="classObject(date)"
                        class="datepicker-cell"
                    >
                        {{ monthNames![date.getMonth()] }}
                    </div>
                </template>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

import { isDefined } from '../../utils/helpers'
import type { DatepickerEvent, DateSelector, FocusedDate } from './types'

export default defineComponent({
    name: 'BDatepickerMonth',
    props: {
        modelValue: {
            type: [Date, Array<Date>, null] as PropType<Date | Date[] | null>
        },
        monthNames: [Array<string>, null] as PropType<string[] | null>,
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
        range: Boolean,
        multiple: Boolean
    },
    emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        'change-focus': (_date: Date) => true,
        'range-end': (_date: Date) => true,
        'range-start': (_date: Date) => true,
        'update:modelValue': (_date: Date | Date[] | undefined) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
    },
    data() {
        return {
            selectedBeginDate: undefined as Date | undefined,
            selectedEndDate: undefined as Date | undefined,
            hoveredEndDate: undefined as Date | undefined,
            multipleSelectedDates: this.multiple && this.modelValue ? this.modelValue as Date[] : []
        }
    },
    computed: {
        hasEvents() {
            return this.events && this.events.length
        },

        /*
        * Return array of all events in the specified month
        */
        eventsInThisYear(): DatepickerEvent[] {
            if (!this.events) return []

            const yearEvents = []

            for (let i = 0; i < this.events.length; i++) {
                let event = this.events[i]

                if (!Object.prototype.hasOwnProperty.call(event, 'date')) {
                    event = { date: event as Date, type: 'is-primary' }
                }
                if (!Object.prototype.hasOwnProperty.call(event, 'type')) {
                    (event as DatepickerEvent).type = 'is-primary'
                }
                if (
                    (event as DatepickerEvent).date.getFullYear() === this.focused!.year
                ) {
                    yearEvents.push(event as DatepickerEvent)
                }
            }

            return yearEvents
        },
        monthDates() {
            const year = this.focused!.year
            const months = []
            for (let i = 0; i < 12; i++) {
                const d = new Date(year, i, 1)
                d.setHours(0, 0, 0, 0)
                months.push(d)
            }
            return months
        },

        focusedMonth() {
            return this.focused!.month
        },

        hoveredDateRange() {
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
    watch: {
        focusedMonth(month) {
            const refName = `month-${month}`
            this.$nextTick(() => {
                // Vue ≥ v3.0 < v3.2.25, refs in v-for are stored as a single object,
                // but ≥ v3.2.25, refs in v-for are stored in an array (same as Vue 2)
                let cell
                if (Array.isArray(this.$refs[refName])) {
                    cell = (this.$refs[refName] as HTMLElement[])[0]
                } else {
                    cell = this.$refs[refName] as HTMLElement
                }
                if (cell) {
                    cell.focus()
                }
            }) // $nextTick needed when year is changed
        }
    },
    methods: {
        selectMultipleDates(date: Date) {
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
            this.$emit('update:modelValue', this.multipleSelectedDates)
        },

        selectableDate(day: Date) {
            const validity = []

            if (this.minDate) {
                validity.push(day >= this.minDate)
            }

            if (this.maxDate) {
                validity.push(day <= this.maxDate)
            }

            validity.push(day.getFullYear() === this.focused!.year)

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
        // TODO: return undefined instead of false if no events
        eventsDateMatch(day: Date) {
            if (!this.eventsInThisYear.length) return false

            const monthEvents = []

            for (let i = 0; i < this.eventsInThisYear.length; i++) {
                if (this.eventsInThisYear[i].date.getMonth() === day.getMonth()) {
                    monthEvents.push(this.events![i])
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
        classObject(day: Date) {
            function dateMatch(
                dateOne: Date,
                dateTwo: Date | Date[] | null | undefined,
                multiple?: boolean
            ) {
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
            function dateWithin(
                dateOne: Date,
                dates: Date | Date[] | null | undefined,
                multiple?: boolean
            ) {
                if (!Array.isArray(dates) || multiple) { return false }

                return dateOne > dates[0] && dateOne < dates[1]
            }
            function dateMultipleSelected(dateOne: Date, dates: Date[], multiple: boolean) {
                if (!Array.isArray(dates) || !multiple) { return false }
                return dates.some((date) => (
                    dateOne.getDate() === date.getDate() &&
                    dateOne.getFullYear() === date.getFullYear() &&
                    dateOne.getMonth() === date.getMonth()
                ))
            }

            return {
                'is-selected': dateMatch(day, this.modelValue, this.multiple) ||
                               dateWithin(day, this.modelValue, this.multiple) ||
                               dateMultipleSelected(day, this.multipleSelectedDates, this.multiple),
                'is-first-selected':
                    dateMatch(
                        day,
                        Array.isArray(this.modelValue) ? this.modelValue[0] : undefined,
                        this.multiple
                    ),
                'is-within-selected':
                    dateWithin(day, this.modelValue, this.multiple),
                'is-last-selected':
                    dateMatch(
                        day,
                        Array.isArray(this.modelValue) ? this.modelValue[1] : undefined,
                        this.multiple
                    ),
                'is-within-hovered-range':
                    this.hoveredDateRange && this.hoveredDateRange.length === 2 &&
                    (dateMatch(day, this.hoveredDateRange) ||
                        dateWithin(day, this.hoveredDateRange)),
                'is-first-hovered': dateMatch(
                    day,
                    Array.isArray(this.hoveredDateRange) ? this.hoveredDateRange[0] : undefined
                ),
                'is-within-hovered':
                    dateWithin(day, this.hoveredDateRange),
                'is-last-hovered': dateMatch(
                    day,
                    Array.isArray(this.hoveredDateRange) ? this.hoveredDateRange[1] : undefined
                ),
                'is-today': dateMatch(day, this.dateCreator!()),
                'is-selectable': this.selectableDate(day) && !this.disabled,
                'is-unselectable': !this.selectableDate(day) || this.disabled
            }
        },

        manageKeydown({ key }: KeyboardEvent, date: Date) {
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
        updateSelectedDate(date: Date) {
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
        emitChosenDate(day: Date) {
            if (this.disabled) return

            if (!this.multiple) {
                if (this.selectableDate(day)) {
                    this.$emit('update:modelValue', day)
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
        handleSelectRangeDate(date: Date) {
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
                this.$emit('update:modelValue', [this.selectedBeginDate, this.selectedEndDate])
            } else {
                this.selectedBeginDate = date
                this.$emit('range-start', date)
            }
        },

        setRangeHoverEndDate(day: Date) {
            if (this.range) {
                this.hoveredEndDate = day
            }
        },

        changeFocus(month: Date, inc: number) {
            const nextMonth = month
            nextMonth.setMonth(month.getMonth() + inc)
            this.$emit('change-focus', nextMonth)
        }
    }
})
</script>
