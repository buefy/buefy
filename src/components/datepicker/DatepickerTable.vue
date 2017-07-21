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
                <div class="datepicker-cell">Su</div>
                <div class="datepicker-cell">M</div>
                <div class="datepicker-cell">Tu</div>
                <div class="datepicker-cell">W</div>
                <div class="datepicker-cell">Th</div>
                <div class="datepicker-cell">F</div>
                <div class="datepicker-cell">S</div>
            </div>
            <div class="datepicker-body">
                <b-datepicker-table-row v-for="week in weeksInThisMonth(focused.month, focused.year)"
                  :key="week[0].getDate()"
                  :selectedDate="value"
                  :week="week"
                  :month="focused.month"
                  @select="updateSelectedDate">
                </b-datepicker-table-row>
            </div>
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
        pack: String
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
            const months = {
                0: 'January',
                1: 'February',
                2: 'March',
                3: 'April',
                4: 'May',
                5: 'June',
                6: 'July',
                7: 'August',
                8: 'September',
                9: 'October',
                10: 'November',
                11: 'December',
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
