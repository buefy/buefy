<template>
<b-modal :active.sync="isActive" :width="640">
    <b-datepicker-table
      v-model="dateSelected"
      :pack="packName"
      :day-names="dayNames"
      :month-names="monthNames"
      :footer-today="footerToday"
      :footer-close="footerClose"
      :earliest-date="earliestDate"
      :latest-date="latestDate"
      @close="isActive = false">
    </b-datepicker-table>
</b-modal>
</template>

<script>
import config from '../../utils/config'
import bDatepickerTable from './DatepickerTable'
export default {
    name: 'bDatepicker',
    props: {
        value: Date,
        active: {
            type: Boolean,
            default: false
        },
        iconPack: String,
        dayNames: {
            type: Array,
            default () {
                return [
                    'Su',
                    'M',
                    'Tu',
                    'W',
                    'Th',
                    'F',
                    'S',
                ]
            }
        },
        monthNames: {
            type: Array,
            default () {
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
                    'December',
                ]
            }
        },
        footerToday: {
            type: Boolean,
            default: false
        },
        footerClose: {
            type: Boolean,
            default: true
        },
        earliestDate: Date,
        latestDate: Date
    },
    data() {
        const packName = this.iconPack || config.defaultIconPack
        return {
            packName,
            isActive: this.active,
            dateSelected: this.value || new Date(),
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
            this.$emit('input', this.dateSelected)
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
