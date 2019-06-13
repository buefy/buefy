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
                @select="updateSelectedDate"/>
        </div>
    </section>
</template>

<script>
    import DatepickerTableRow from './DatepickerTableRow'

    export default {
        name: 'BDatepickerTable',
        components: {
            [DatepickerTableRow.name]: DatepickerTableRow
        },
        props: {
            value: Date,
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
            selectableDates: Array
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
                const daysInThisMonth = new Date(year, month + 1, 0).getDate()

                let startingDay = 1

                while (startingDay <= daysInThisMonth + 6) {
                    const newWeek = this.weekBuilder(startingDay, month, year)
                    let weekValid = false

                    newWeek.forEach((day) => {
                        if (day.getMonth() === month) {
                            weekValid = true
                        }
                    })

                    if (weekValid) {
                        weeksInThisMonth.push(newWeek)
                    }

                    startingDay += 7
                }

                return weeksInThisMonth
            }
        },
        methods: {
            /*
            * Emit input event with selected date as payload for v-model in parent
            */
            updateSelectedDate(date) {
                this.$emit('input', date)
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
                    stripped.setHours(0)
                    stripped.setMinutes(0)
                    stripped.setSeconds(0)
                    stripped.setMilliseconds(0)
                    const timed = stripped.getTime()

                    return week.some((weekDate) => weekDate.getTime() === timed)
                })
            }
        }
    }
</script>
