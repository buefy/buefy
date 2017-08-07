<template>
<div class="box datepicker">
    <div class="level is-marginless">
        <div class="level-item">
            <h4 class="has-text-centered datepicker-month level-item">
                <span @click="decrementMonth" class="datepicker-decrement">
                    <b-icon :icon="iconNames.left"
                      type="is-primary is-clickable"
                      :pack="pack">
                    </b-icon>
                </span>
                <strong class="has-text-primary">{{nameOfMonth(focused.month)}} {{focused.year}}</strong>
                <span @click="incrementMonth" class="datepicker-increment">
                  <b-icon :icon="iconNames.right"
                    type="is-primary is-clickable"
                    :pack="pack">
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
    <div class="level">
        <div class="level-left"></div>
        <div class="level-right">
            <b-field grouped class="level-item">
                <p class="control" v-if="footerToday">
                    <button class="button is-primary" @click="focusToday">Today</button>
                </p>
                <p class="control" v-if="footerClose">
                    <button class="button is-primary" @click="$emit('close')">Close</button>
                </p>
            </b-field>
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
        value: {
            type: Date,
            required: true,
        },
        pack: String,
        dayNames: Array,
        monthNames: Array,
        footerToday: Boolean,
        footerClose: Boolean,
        earliestDate: Date,
        latestDate: Date
    },
    data() {
        let iconNames

        if (this.pack === 'mdi') {
            iconNames = {
                left: 'chevron_left',
                right: 'chevron_right'
            }
        } else {
            iconNames = {
                left: 'chevron-left',
                right: 'chevron-right'
            }
        }

        return {
            iconNames,
            focused: {
                month: this.value.getMonth(),
                year: this.value.getFullYear(),
            }
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
         * Focus date picker on today's date
         */
        focusToday() {
            this.focused = {
                month: new Date()
                    .getMonth(),
                year: new Date()
                    .getFullYear(),
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
            const months = {};
            for (let i = 0; i < this.monthNames.length; i++) {
                months[i] = this.monthNames[i];
            }

            return months[month]
        },

        /*
         * Return array of all days in the week that the startingDate is within
         */
        weekBuilder(startingDate, month, year) {
            const thisMonth = new Date(year, month)

            let thisWeek = []

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
                let newWeek = this.weekBuilder(startingDay, month, year),
                    weekValid = false

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
}
</script>
