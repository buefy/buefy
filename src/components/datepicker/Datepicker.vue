<template>
  <div class="control datepicker" :class="{size, 'is-expanded': expanded}">
      <b-input :value="formatValue(value)"
          @keydown.native="preventTyping"
          :placeholder="placeholder"
          ref="input"
          :size="size"
          :icon="icon"
          :icon-pack="iconPack"
          :loading="loading"
          :class="[type]"
          autocomplete="off"
          v-bind="$attrs"
          @focus="focused"
          @blur="blurred">
      </b-input>

      <transition name="fade">
          <div class="dropdown">

              <transition name="fade">
                  <div v-show="isActive" class="background"></div>
              </transition>

              <div class="dropdown-menu"
                  :class="{ 'is-opened-top': !isListInViewportVertically }"
                  v-show="isActive"
                  ref="dropdown">
                  <div class="dropdown-content">
                      <div class="datepicker-container">
                          <div class="level is-marginless">
                              <div class="level-item">
                                  <h4 class="has-text-centered datepicker-month level-item">
                                      <span
                                          @click="decrementMonth"
                                          @keydown.enter="decrementMonth"
                                          @keydown.space.prevent="decrementMonth"
                                          class="datepicker-decrement"
                                          role="button"
                                          tabindex="0"
                                          aria-label="Decrement Month">
                                              <b-icon icon="chevron_left"
                                                  both
                                                  type="is-primary is-clickable"
                                                  v-show="!isFirstMonth">
                                              </b-icon>
                                      </span>
                                      <b-field grouped>
                                          <b-select v-model="focusedDateData.month" aria-label="Select Month">
                                              <option v-for="(month, index) in Object.values(monthNames)" :value="index" :key="month">
                                                {{month}}
                                              </option>
                                          </b-select>
                                          <b-select v-model="focusedDateData.year" aria-label="Select Year">
                                              <option v-for="year in listOfYears" :value="year" :key="year">
                                                {{year}}
                                              </option>
                                          </b-select>
                                      </b-field>
                                      <span
                                          @click="incrementMonth"
                                          @keydown.enter="incrementMonth"
                                          @keydown.space.prevent="incrementMonth"
                                          class="datepicker-increment"
                                          role="button"
                                          tabindex="0"
                                          aria-label="Increment Month">
                                              <b-icon icon="chevron_right"
                                                  both
                                                  type="is-primary is-clickable"
                                                  v-show="!isLastMonth">
                                              </b-icon>
                                      </span>
                                  </h4>
                              </div>
                          </div>
                          <b-datepicker-table
                            v-model="dateSelected"
                            :day-names="dayNames"
                            :month-names="monthNames"
                            :earliest-date="earliestDate"
                            :latest-date="latestDate"
                            :focused="focusedDateData"
                            @close="isActive = false">
                          </b-datepicker-table>
                          <div class="columns">
                              <div class="column has-text-centered">
                                  <a role="button" @click="updateSelectedDate(new Date())">
                                      <slot name="selectToday"></slot>
                                  </a>
                              </div>
                              <div class="column has-text-centered">
                                  <a role="button" @click="updateSelectedDate(new Date())">
                                      <slot name="clearSelection"></slot>
                                  </a>
                              </div>
                              <div class="column has-text-centered">
                                  <a role="button" @click="isActive=false">
                                      <slot name="close"></slot>
                                  </a>
                              </div>
                          </div>
                    </div>
                  </div>
              </div>
          </div>
      </transition>
  </div>
</template>

<script>
import FormElementMixin from '../../utils/FormElementMixin'
import Input from '../input'
import Field from '../field'
import Select from '../select'
import Icon from '../icon'
import DatepickerTable from './DatepickerTable'
export default {
    name: 'bDatepicker',
    inheritAttrs: false,
    mixins: [FormElementMixin],
    components: {
        [DatepickerTable.name]: DatepickerTable,
        [Input.name]: Input,
        [Field.name]: Field,
        [Select.name]: Select,
        [Icon.name]: Icon
    },
    props: {
        value: [Date, String],
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
        earliestDate: Date,
        latestDate: Date,
        focusedDate: Date,
        placeholder: String,
        type: String,
        closeOnBlur: {
            type: Boolean,
            default: false
        }
    },
    data() {
        const focusedDate = this.value || this.focusedDate || new Date()
        const dateSelected = this.value
          ? new Date(this.value) : null

        return {
            dateSelected,
            focusedDateData: {
                month: focusedDate.getMonth(),
                year: focusedDate.getFullYear()
            },
            hovered: null,
            isActive: false,
            isListInViewportVertically: true,
            _elementRef: 'input',
            _isDatepicker: true
        }
    },
    computed: {
        /*
         * Returns an array of years for the year dropdown. If earliest/latest
         * dates are set by props, range of years will fall within those dates.
         */
        listOfYears() {
            const latestYear = this.latestDate
              ? this.latestDate.getFullYear() : new Date().getFullYear() + 3

            const earliestYear = this.earliestDate
              ? this.earliestDate.getFullYear() : 1900

            const arrayOfYears = []
            for (let i = earliestYear; i <= latestYear; i++) {
                arrayOfYears.push(i)
            }

            return arrayOfYears.reverse()
        },

        isFirstMonth() {
            if (!this.earliestDate) return false
            const dateToCheck = new Date(this.focusedDateData.year, this.focusedDateData.month)
            const date = new Date(this.earliestDate.getFullYear(), this.earliestDate.getMonth())
            return (dateToCheck <= date)
        },

        isLastMonth() {
            if (!this.latestDate) return false
            const dateToCheck = new Date(this.focusedDateData.year, this.focusedDateData.month)
            const date = new Date(this.latestDate.getFullYear(), this.latestDate.getMonth())
            return (dateToCheck >= date)
        }
    },
    watch: {
        /*
         * Emit input event with selected date as payload, set isActive to false.
         * If value passed in is a date object, emit value as date object,
         * else emit formatted string
         */
        dateSelected(val) {
            const date = (this.value && typeof this.value.getMonth !== 'function')
              ? this.formatValue(val) : val

            this.$emit('input', date)
            this.isActive = false
        }
    },
    methods: {
        /*
         * Emit input event with selected date as payload for v-model in parent
         */
        updateSelectedDate(date) {
            this.dateSelected = date
        },

        /*
         * Format date into string
         */
        formatValue(value) {
            /*
             * Only format if string is not null and is a valid date
             * Null check is required because new Date(null) = 1/1/1970
             */
            if (value && !isNaN(new Date(value))) {
                const date = new Date(value).toISOString()
                const regex = /(\d{4})-(\d{2})-(\d{2}).*/
                const match = date.match(regex)
                const year = match[1]
                const month = match[2]
                const day = match[3]
                return `${month}/${day}/${year}`
            } else {
                return null
            }
        },

        /**
         * Calculate if the dropdown is vertically visible when activated,
         * otherwise it is opened upwards.
         */
        calcDropdownInViewportVertical() {
            this.$nextTick(() => {
                const rect = this.$refs.dropdown.getBoundingClientRect()

                this.isListInViewportVertically = (
                    rect.top >= 0 &&
                    rect.bottom <= (window.innerHeight ||
                        document.documentElement.clientHeight)
                )
            })
        },

        /*
         * Either decrement month by 1 if not January or decrement year by 1
         * and set month to 11 (December)
         */
        decrementMonth() {
            if (this.focusedDateData.month > 0) {
                this.focusedDateData.month -= 1
            } else {
                this.focusedDateData.month = 11
                this.focusedDateData.year -= 1
            }
        },

        /*
         * Either increment month by 1 if not December or increment year by 1
         * and set month to 0 (January)
         */
        incrementMonth() {
            if (this.focusedDateData.month < 11) {
                this.focusedDateData.month += 1
            } else {
                this.focusedDateData.month = 0
                this.focusedDateData.year += 1
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
         * Handle focus event
         */
        focused(event) {
            this.isActive = true
            this.$emit('focus', event)
        },

        /*
         * Handle blur event
         */
        blurred(event) {
            this.$emit('blur', event)
            if (this.closeOnBlur) {
                this.isActive = false
            }
        },

        /*
         * Prevent user from typing in date box except to delete value
         */
        preventTyping(e) {
            if (e.key !== 'Backspace' && e.key !== 'Tab') {
                e.preventDefault()
            }
        }
    },
    created() {
        if (window !== undefined) {
            window.addEventListener('resize', this.calcDropdownInViewportVertical)
        }
    },
    beforeDestroy() {
        if (window !== undefined) {
            window.removeEventListener('resize', this.calcDropdownInViewportVertical)
        }
    }
}
</script>
