import FormElementMixin from './FormElementMixin'
import { isMobile } from './helpers'
import config from './config'

const AM = 'AM'
const PM = 'PM'
const HOUR_FORMAT_24 = '24'
const HOUR_FORMAT_12 = '12'

const defaultTimeFormatter = (date, vm) => {
    let hours = date.getHours()
    const minutes = date.getMinutes()
    let period = ''
    if (vm.hourFormat === HOUR_FORMAT_12) {
        period = ' ' + (hours < 12 ? AM : PM)
        if (hours > 12) {
            hours -= 12
        } else if (hours === 0) {
            hours = 12
        }
    }
    return vm.pad(hours) + ':' + vm.pad(minutes) + period
}

const defaultTimeParser = (timeString, vm) => {
    if (timeString) {
        let am = false
        if (vm.hourFormat === HOUR_FORMAT_12) {
            const dateString12 = timeString.split(' ')
            timeString = dateString12[0]
            am = dateString12[1] === AM
        }
        const time = timeString.split(':')
        let hours = parseInt(time[0], 10)
        const minutes = parseInt(time[1], 10)
        if (isNaN(hours) || hours < 0 || hours > 23 ||
            (vm.hourFormat === HOUR_FORMAT_12 && (hours < 1 || hours > 12)) ||
            isNaN(minutes) || minutes < 0 || minutes > 59) {
            return null
        }
        let d = null
        if (vm.computedValue && !isNaN(vm.computedValue)) {
            d = new Date(vm.computedValue)
        } else {
            d = new Date()
            d.setMilliseconds(0)
            d.setSeconds(0)
        }
        d.setMinutes(minutes)
        if (this.hourFormat === HOUR_FORMAT_12) {
            if (am && hours === 12) {
                hours = 0
            } else if (!am && hours !== 12) {
                hours += 12
            }
        }
        d.setHours(hours)
        return d
    }
    return null
}

export default {
    mixins: [FormElementMixin],
    inheritAttrs: false,
    props: {
        value: Date,
        inline: Boolean,
        minTime: Date,
        maxTime: Date,
        placeholder: String,
        editable: Boolean,
        disabled: Boolean,
        hourFormat: {
            type: String,
            default: HOUR_FORMAT_24,
            validator: (value) => {
                return value === HOUR_FORMAT_24 || value === HOUR_FORMAT_12
            }
        },
        incrementMinutes: {
            type: Number,
            default: 1
        },
        timeFormatter: {
            type: Function,
            default: (date, vm) => {
                if (typeof config.defaultTimeFormatter === 'function') {
                    return config.defaultTimeFormatter(date)
                } else {
                    return defaultTimeFormatter(date, vm)
                }
            }
        },
        timeParser: {
            type: Function,
            default: (date, vm) => {
                if (typeof config.defaultTimeParser === 'function') {
                    return config.defaultTimeParser(date)
                } else {
                    return defaultTimeParser(date, vm)
                }
            }
        },
        mobileNative: {
            type: Boolean,
            default: () => {
                return config.defaultTimepickerMobileNative
            }
        },
        position: String,
        unselectableTimes: Array,
        openOnFocus: Boolean
    },
    data() {
        return {
            dateSelected: this.value,
            hoursSelected: null,
            minutesSelected: null,
            meridienSelected: null,
            _elementRef: 'input',
            AM,
            PM,
            HOUR_FORMAT_24,
            HOUR_FORMAT_12
        }
    },
    computed: {
        computedValue: {
            get() {
                return this.dateSelected
            },
            set(value) {
                this.dateSelected = value
                this.$emit('input', value)
            }
        },
        hours() {
            const hours = []
            const numberOfHours = this.isHourFormat24 ? 24 : 12
            for (let i = 0; i < numberOfHours; i++) {
                let value = i
                let label = value
                if (!this.isHourFormat24) {
                    value = (i + 1)
                    label = value
                    if (this.meridienSelected === this.AM) {
                        if (value === 12) {
                            value = 0
                        }
                    } else if (this.meridienSelected === this.PM) {
                        if (value !== 12) {
                            value += 12
                        }
                    }
                }
                hours.push({
                    label: this.formatNumber(label),
                    value: value
                })
            }
            return hours
        },

        minutes() {
            const minutes = []
            for (let i = 0; i < 60; i += this.incrementMinutes) {
                minutes.push({
                    label: this.formatNumber(i),
                    value: i
                })
            }
            return minutes
        },
        meridiens() {
            return [AM, PM]
        },

        isMobile() {
            return this.mobileNative && isMobile.any()
        },

        isHourFormat24() {
            return this.hourFormat === HOUR_FORMAT_24
        }
    },
    watch: {
        hourFormat() {
            if (this.hoursSelected !== null) {
                this.meridienSelected = this.hoursSelected >= 12 ? PM : AM
            }
        },
        /**
         * When v-model is changed:
         *   1. Update internal value.
         *   2. If it's invalid, validate again.
         */
        value: {
            handler(value) {
                this.updateInternalState(value)
                !this.isValid && this.$refs.input.checkHtml5Validity()
            },
            immediate: true
        }
    },
    methods: {
        onMeridienChange(value) {
            if (this.hoursSelected !== null) {
                if (value === PM) {
                    this.hoursSelected += 12
                } else if (value === AM) {
                    this.hoursSelected -= 12
                }
            }
            this.updateDateSelected(this.hoursSelected, this.minutesSelected, value)
        },

        onHoursChange(value) {
            this.updateDateSelected(
                parseInt(value, 10),
                this.minutesSelected,
                this.meridienSelected
            )
        },

        onMinutesChange(value) {
            this.updateDateSelected(
                this.hoursSelected,
                parseInt(value, 10),
                this.meridienSelected
            )
        },

        updateDateSelected(hours, minutes, meridiens) {
            if (hours != null && minutes != null &&
                ((!this.isHourFormat24 && meridiens !== null) || this.isHourFormat24)) {
                if (this.computedValue && !isNaN(this.computedValue)) {
                    this.computedValue = new Date(this.computedValue)
                } else {
                    this.computedValue = new Date()
                    this.computedValue.setMilliseconds(0)
                    this.computedValue.setSeconds(0)
                }
                this.computedValue.setHours(hours)
                this.computedValue.setMinutes(minutes)
            }
        },

        updateInternalState(value) {
            if (value) {
                this.hoursSelected = value.getHours()
                this.minutesSelected = value.getMinutes()
                this.meridienSelected = value.getHours() >= 12 ? PM : AM
            } else {
                this.hoursSelected = null
                this.minutesSelected = null
                this.meridienSelected = AM
            }
            this.dateSelected = value
        },

        isHourDisabled(hour) {
            let disabled = false
            if (this.minTime) {
                const minHours = this.minTime.getHours()
                disabled = hour < minHours
            }
            if (this.maxTime) {
                if (!disabled) {
                    const maxHours = this.maxTime.getHours()
                    disabled = hour > maxHours
                }
            }
            if (this.unselectableTimes) {
                if (!disabled) {
                    if (this.minutesSelected !== null) {
                        const unselectable = this.unselectableTimes.filter((time) => {
                            return time.getHours() === hour &&
                                time.getMinutes() === this.minutesSelected
                        })
                        disabled = unselectable.length > 0
                    } else {
                        const unselectable = this.unselectableTimes.filter((time) => {
                            return time.getHours() === hour
                        })
                        disabled = unselectable.length === this.minutes.length
                    }
                }
            }
            return disabled
        },

        isMinuteDisabled(minute) {
            let disabled = false
            if (this.hoursSelected !== null) {
                if (this.isHourDisabled(this.hoursSelected)) {
                    disabled = true
                } else {
                    if (this.minTime) {
                        const minHours = this.minTime.getHours()
                        const minMinutes = this.minTime.getMinutes()
                        disabled = this.hoursSelected === minHours && minute < minMinutes
                    }
                    if (this.maxTime) {
                        if (!disabled) {
                            const maxHours = this.maxTime.getHours()
                            const minMinutes = this.maxTime.getMinutes()
                            disabled = this.hoursSelected === maxHours && minute > minMinutes
                        }
                    }
                }
                if (this.unselectableTimes) {
                    if (!disabled) {
                        const unselectable = this.unselectableTimes.filter((time) => {
                            return time.getHours() === this.hoursSelected &&
                                time.getMinutes() === minute
                        })
                        disabled = unselectable.length > 0
                    }
                }
            }
            return disabled
        },

        /*
        * Parse string into date
        */
        onChange(value) {
            const date = this.timeParser(value, this)
            this.updateInternalState(date)
            if (date && !isNaN(date)) {
                this.computedValue = date
            } else {
                // Force refresh input value when not valid date
                this.computedValue = null
                this.$refs.input.newValue = this.computedValue
            }
        },

        /*
        * Toggle timepicker
        */
        toggle(active) {
            if (this.$refs.dropdown) {
                this.$refs.dropdown.isActive = typeof active === 'boolean'
                    ? active
                    : !this.$refs.dropdown.isActive
            }
        },

        /*
        * Close timepicker
        */
        close() {
            this.toggle(false)
        },

        /*
        * Call default onFocus method and show timepicker
        */
        handleOnFocus() {
            this.onFocus()
            if (this.openOnFocus) {
                this.toggle(true)
            }
        },

        /*
        * Format date into string 'HH-MM-SS'
        */
        formatHHMMSS(value) {
            const date = new Date(value)
            if (value && !isNaN(date)) {
                const hours = date.getHours()
                const minutes = date.getMinutes()
                return this.formatNumber(hours) + ':' +
                    this.formatNumber(minutes, true) + ':00'
            }
            return ''
        },

        /*
        * Parse time from string
        */
        onChangeNativePicker(event) {
            const date = event.target.value
            if (date) {
                if (this.computedValue && !isNaN(this.computedValue)) {
                    this.computedValue = new Date(this.computedValue)
                } else {
                    this.computedValue = new Date()
                    this.computedValue.setMilliseconds(0)
                    this.computedValue.setSeconds(0)
                }
                const time = date.split(':')
                this.computedValue.setHours(parseInt(time[0], 10))
                this.computedValue.setMinutes(parseInt(time[1], 10))
            } else {
                this.computedValue = null
            }
        },

        formatNumber(value, isMinute) {
            return this.isHourFormat24 || isMinute
                ? this.pad(value)
                : value
        },

        pad(value) {
            return (value < 10 ? '0' : '') + value
        },

        /*
        * Format date into string
        */
        formatValue(date) {
            if (date && !isNaN(date)) {
                return this.timeFormatter(date, this)
            } else {
                return null
            }
        },
        /**
         * Keypress event that is bound to the document.
         */
        keyPress(event) {
            // Esc key
            if (this.$refs.dropdown && this.$refs.dropdown.isActive && event.keyCode === 27) {
                this.toggle(false)
            }
        }
    },
    created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('keyup', this.keyPress)
        }
    },
    beforeDestroy() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('keyup', this.keyPress)
        }
    }
}
