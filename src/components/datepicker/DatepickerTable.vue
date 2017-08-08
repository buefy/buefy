<template>
<div class="box datepicker">
    <div class="level is-marginless">
        <div class="level-item">
            <h4 class="has-text-centered datepicker-month level-item">
                <span @click="decrementMonth" class="datepicker-decrement" role="button">
                    <b-icon icon="chevron_left"
                      both
                      type="is-primary is-clickable">
                    </b-icon>
                </span>
                <b-field grouped>
                  <b-select v-model="focused.month">
                    <option v-for="(month, index) in Object.values(monthNames)" :value="index" :key="month">
                      {{month}}
                    </option>
                  </b-select>
                  <b-select v-model="focused.year">
                    <option v-for="year in listOfYears" :value="year" :key="year">
                      {{year}}
                    </option>
                  </b-select>
                </b-field>
                <span @click="incrementMonth" class="datepicker-increment" role="button">
                  <b-icon icon="chevron_right"
                    both
                    type="is-primary is-clickable">
                  </b-icon>
                </span>
            </h4>
        </div>
    </div>
    <div class="table-container">
        <div class="datepicker-table">
            <div class="datepicker-header">
                <div v-for="day in dayNames" class="datepicker-cell" :key="day">{{day}}</div>
            </div>
            <div class="datepicker-body">
                <b-datepicker-table-row
                  v-for="week in weeksInThisMonth(focused.month, focused.year)"
                  :key="week[0].getDate()"
                  :selectedDate="value"
                  :week="week"
                  :month="focused.month"
                  :earliest-date="earliestDate"
                  :latest-date="latestDate"
                  @select="updateSelectedDate">
                </b-datepicker-table-row>
            </div>
        </div>
    </div>
    <div class="columns">
        <div class="column has-text-centered">
            <button
              v-if="footerToday"
              class="button is-primary"
              @click="updateSelectedDate(new Date())">
                {{footerTodayLabel}}
            </button>
        </div>
        <div class="column has-text-centered">
            <button
              v-if="footerClear"
              class="button is-primary"
              @click="updateSelectedDate(null)">
                {{footerClearLabel}}
            </button>
        </div>
        <div class="column has-text-centered">
            <button
              v-if="footerClose"
              class="button is-primary"
              @click="$emit('close')">
                {{footerCloseLabel}}
            </button>
        </div>
    </div>
</div>
</template>

<script>
import bDatepickerTableRow from './DatepickerTableRow'
export default {
    name: 'bDatepickerTable',
    components: {
        bDatepickerTableRow
    },
    props: {
        value: Date,
        pack: String,
        dayNames: Array,
        monthNames: Array,
        footerToday: Boolean,
        footerClose: Boolean,
        footerClear: Boolean,
        footerTodayLabel: String,
        footerClearLabel: String,
        footerCloseLabel: String,
        earliestDate: Date,
        latestDate: Date,
        focusedDate: Date
    },
    data() {
        const date = this.value || this.focusedDate || new Date()
        return {
            focused: {
                month: date.getMonth(),
                year: date.getFullYear()
            }
        }
    },
    computed: {
        /*
         * Returns an array of years for the year dropdown. If earliest/latest
         * dates are set by props, range of years will fall within those dates.
         */
        listOfYears() {
            let latestYear
            let earliestYear

            if (this.latestDate) {
                latestYear = this.latestDate.getFullYear()
            } else {
                latestYear = new Date().getFullYear() + 3
            }

            if (this.earliestDate) {
                earliestYear = this.earliestDate.getFullYear()
            } else {
                earliestYear = 1900
            }

            const arrayOfYears = []
            for (let i = earliestYear; i <= latestYear; i++) {
                arrayOfYears.push(i)
            }

            return arrayOfYears.reverse()
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
         * Either decrement month by 1 if not January or decrement year by 1
         * and set month to 11 (December)
         */
        decrementMonth() {
            if (this.focused.month > 0) {
                this.focused.month -= 1
            } else {
                this.focused.month = 11
                this.focused.year -= 1
            }
        },

        /*
         * Either increment month by 1 if not December or increment year by 1
         * and set month to 0 (January)
         */
        incrementMonth() {
            if (this.focused.month < 11) {
                this.focused.month += 1
            } else {
                this.focused.month = 0
                this.focused.year += 1
            }
        },

        /*
         * Return name of month full-length
         */
        nameOfMonth(month) {
            const months = {}
            for (let i = 0; i < this.monthNames.length; i++) {
                months[i] = this.monthNames[i]
            }

            return months[month]
        },

        /*
         * Return array of all days in the week that the startingDate is within
         */
        weekBuilder(startingDate, month, year) {
            const thisMonth = new Date(year, month)

            const thisWeek = []

            const dayOfWeek = new Date(year, month, startingDate)
                .getDay()

            let daysAgo = 1
            for (let i = dayOfWeek - 1; i >= 0; i--) {
                thisWeek.unshift(new Date(thisMonth.getFullYear(), thisMonth.getMonth(), startingDate - daysAgo))
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

        /*
         * Return array of all weeks in the specified month
         */
        weeksInThisMonth(month, year) {
            const weeksInThisMonth = []
            const daysInThisMonth = new Date(year, month + 1, 0)
                .getDate()

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
    }
}
</script>
