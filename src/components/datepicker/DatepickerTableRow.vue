<template>
    <div class="datepicker-row">
        <template v-for="(day, index) in week">
            <a
                v-if="selectableDate(day) && !disabled"
                :key="index"
                :class="[classObject(day), {'has-event':eventsDateMatch(day)}, indicators]"
                class="datepicker-cell"
                role="button"
                href="#"
                :disabled="disabled"
                @click.prevent="emitChosenDate(day)"
                @keydown.enter.prevent="emitChosenDate(day)"
                @keydown.space.prevent="emitChosenDate(day)">
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
            selectedDate: Date,
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
            dateCreator: Function
        },
        methods: {
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

                validity.push(day.getMonth() === this.month)

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
                if (!this.events.length) return false

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
                function dateMatch(dateOne, dateTwo) {
                    // if either date is null or undefined, return false
                    if (!dateOne || !dateTwo) {
                        return false
                    }

                    return (dateOne.getDate() === dateTwo.getDate() &&
                        dateOne.getFullYear() === dateTwo.getFullYear() &&
                        dateOne.getMonth() === dateTwo.getMonth())
                }

                return {
                    'is-selected': dateMatch(day, this.selectedDate),
                    'is-today': dateMatch(day, this.dateCreator()),
                    'is-selectable': this.selectableDate(day) && !this.disabled,
                    'is-unselectable': !this.selectableDate(day) || this.disabled
                }
            }
        }
    }
</script>
