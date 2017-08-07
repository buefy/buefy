<template>
<b-modal :active.sync="isActive" :width="640">
    <b-datepicker-table
      v-model="dateSelected"
      :day-names="dayNames"
      :month-names="monthNames"
      :footer-today="footerToday"
      :footer-today-label="footerTodayLabel"
      :footer-close="footerClose"
      :footer-close-label="footerCloseLabel"
      :footer-clear="footerClear"
      :footer-clear-label="footerClearLabel"
      :earliest-date="earliestDate"
      :latest-date="latestDate"
      :focused-date="focusedDate"
      @close="isActive = false">
    </b-datepicker-table>
</b-modal>
</template>

<script>
import bDatepickerTable from './DatepickerTable'
export default {
    name: 'bDatepicker',
    props: {
        value: Date,
        active: {
            type: Boolean,
            default: false
        },
        dayNames: {
            type: Array,
            default() {
                return [
                    'Su',
                    'M',
                    'Tu',
                    'W',
                    'Th',
                    'F',
                    'S'
                ]
            }
        },
        monthNames: {
            type: Array,
            default() {
                return [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December'
                ]
            }
        },
        footerTodayLabel: {
            type: String,
            default: 'Select Today'
        },
        footerToday: {
            type: Boolean,
            default: false
        },
        footerClearLabel: {
            type: String,
            default: 'Clear Selection'
        },
        footerClear: {
            type: Boolean,
            default: false
        },
        footerCloseLabel: {
            type: String,
            default: 'Close'
        },
        footerClose: {
            type: Boolean,
            default: true
        },
        earliestDate: Date,
        latestDate: Date,
        focusedDate: Date
    },
    data() {
        return {
            isActive: this.active,
            dateSelected: this.value
        }
    },
    components: {
        bDatepickerTable
    },
    watch: {
        /*
         * Emit input event with selected date as payload, set isActive to false
         */
        dateSelected() {
            this.$emit('input', this.dateSelected)
            this.isActive = false
        },

        /*
         * Emit input event with dateSelected as payload to ensure that a date
         * is provided (accounting for inital value prop being null) then
         * emit update:active event with value of isActive to sync with trigger
         */
        isActive() {
            this.$emit('update:active', this.isActive)
        },

        /*
         * Update isActive data with active prop value after update
         */
        active() {
            this.isActive = this.active
        }
    }
}
</script>
