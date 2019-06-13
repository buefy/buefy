<template>
    <section class="datepicker-table">
        <div class="datepicker-body" :class="{'has-events':hasEvents}">
            <div class="datepicker-months">
                <template v-for="(date, index) in monthDates">
                    <a
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
                        @click.prevent="emitChosenDate(date)"
                        @keydown.enter.prevent="emitChosenDate(date)"
                        @keydown.space.prevent="emitChosenDate(date)">
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
    export default {
        name: 'BDatepickerMonth',
        props: {
            value: Date,
            monthNames: Array,
            events: Array,
            indicators: String,
            minDate: Date,
            maxDate: Date,
            focused: Object,
            disabled: Boolean,
            dateCreator: Function,
            unselectableDates: Array,
            unselectableDaysOfWeek: Array,
            selectableDates: Array
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
            }
        },
        methods: {
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

                if (this.unselectableDates) {
                    for (let i = 0; i < this.unselectableDates.length; i++) {
                        const disabledDate = this.unselectableDates[i]
                        validity.push(
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
                function dateMatch(dateOne, dateTwo) {
                    // if either date is null or undefined, return false
                    if (!dateOne || !dateTwo) {
                        return false
                    }

                    return (dateOne.getFullYear() === dateTwo.getFullYear() &&
                        dateOne.getMonth() === dateTwo.getMonth())
                }

                return {
                    'is-selected': dateMatch(day, this.value),
                    'is-today': dateMatch(day, this.dateCreator()),
                    'is-selectable': this.selectableDate(day) && !this.disabled,
                    'is-unselectable': !this.selectableDate(day) || this.disabled
                }
            },
            /*
            * Emit select event with chosen date as payload
            */
            emitChosenDate(day) {
                if (this.disabled) return

                if (this.selectableDate(day)) {
                    this.$emit('input', day)
                }
            }
        }
    }
</script>
