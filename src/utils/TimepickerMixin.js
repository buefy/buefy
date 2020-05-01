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
    const seconds = date.getSeconds()
    let period = ''
    if (vm.hourFormat === HOUR_FORMAT_12) {
        period = ' ' + (hours < 12 ? AM : PM)
        if (hours > 12) {
            hours -= 12
        } else if (hours === 0) {
            hours = 12
        }
    }
    return vm.pad(hours) + ':' + vm.pad(minutes) +
        (vm.enableSeconds ? (':' + vm.pad(seconds)) : '') + period
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
        const seconds = vm.enableSeconds ? parseInt(time[2], 10) : 0
        if (isNaN(hours) || hours < 0 || hours > 23 ||
            (vm.hourFormat === HOUR_FORMAT_12 && (hours < 1 || hours > 12)) ||
            isNaN(minutes) || minutes < 0 || minutes > 59) {
            return null
        }
        let d = null
        if (vm.computedValue && !isNaN(vm.computedValue)) {
            d = new Date(vm.computedValue)
        } else {
            d = vm.timeCreator()
            d.setMilliseconds(0)
        }
        d.setSeconds(seconds)
        d.setMinutes(minutes)
        if (vm.hourFormat === HOUR_FORMAT_12) {
            if (am && hours === 12) {
                hours = 0
            } else if (!am && hours !== 12) {
                hours += 12
            }
        }
        d.setHours(hours)
        return new Date(d.getTime())
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
        incrementHours: {
            type: Number,
            default: 1
        },
        incrementMinutes: {
            type: Number,
            default: 1
        },
        incrementSeconds: {
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
        timeCreator: {
            type: Function,
            default: () => {
                if (typeof config.defaultTimeCreator === 'function') {
                    return config.defaultTimeCreator()
                } else {
                    return new Date()
                }
            }
        },
        position: String,
        unselectableTimes: Array,
        openOnFocus: Boolean,
        enableSeconds: Boolean,
        defaultMinutes: Number,
        defaultSeconds: Number,
        focusable: {
            type: Boolean,
            default: true
        },
        tzOffset: {
            type: Number,
            default: 0
        },
        appendToBody: Boolean
    },
    data() {
        return {
            dateSelected: this.value,
            hoursSelected: null,
            minutesSelected: null,
            secondsSelected: null,
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
                this.$emit('input', this.dateSelected)
            }
        },
        hours() {
            if (!this.incrementHours || this.incrementHours < 1) throw new Error('Hour increment cannot be null or less than 1.')
            const hours = []
            const numberOfHours = this.isHourFormat24 ? 24 : 12
            for (let i = 0; i < numberOfHours; i += this.incrementHours) {
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
            if (!this.incrementMinutes || this.incrementMinutes < 1) throw new Error('Minute increment cannot be null or less than 1.')
            const minutes = []
            for (let i = 0; i < 60; i += this.incrementMinutes) {
                minutes.push({
                    label: this.formatNumber(i, true),
                    value: i
                })
            }
            return minutes
        },

        seconds() {
            if (!this.incrementSeconds || this.incrementSeconds < 1) throw new Error('Second increment cannot be null or less than 1.')
            const seconds = []
            for (let i = 0; i < 60; i += this.incrementSeconds) {
                seconds.push({
                    label: this.formatNumber(i, true),
                    value: i
                })
            }
            return seconds
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
            this.updateDateSelected(
                this.hoursSelected,
                this.minutesSelected,
                this.enableSeconds ? this.secondsSelected : 0,
                value)
        },

        onHoursChange(value) {
            if (!this.minutesSelected && typeof this.defaultMinutes !== 'undefined') {
                this.minutesSelected = this.defaultMinutes
            }
            if (!this.secondsSelected && typeof this.defaultSeconds !== 'undefined') {
                this.secondsSelected = this.defaultSeconds
            }
            this.updateDateSelected(
                parseInt(value, 10),
                this.minutesSelected,
                this.enableSeconds ? this.secondsSelected : 0,
                this.meridienSelected
            )
        },

        onMinutesChange(value) {
            if (!this.secondsSelected && this.defaultSeconds) {
                this.secondsSelected = this.defaultSeconds
            }
            this.updateDateSelected(
                this.hoursSelected,
                parseInt(value, 10),
                this.enableSeconds ? this.secondsSelected : 0,
                this.meridienSelected
            )
        },

        onSecondsChange(value) {
            this.updateDateSelected(
                this.hoursSelected,
                this.minutesSelected,
                parseInt(value, 10),
                this.meridienSelected
            )
        },

        updateDateSelected(hours, minutes, seconds, meridiens) {
            if (hours != null && minutes != null &&
                ((!this.isHourFormat24 && meridiens !== null) || this.isHourFormat24)) {
                let time = null
                if (this.computedValue && !isNaN(this.computedValue)) {
                    time = new Date(this.computedValue)
                } else {
                    time = this.timeCreator()
                    time.setMilliseconds(0)
                }
                time.setHours(hours)
                time.setMinutes(minutes)
                time.setSeconds(seconds)
                this.computedValue = new Date(time.getTime())
            }
        },

        updateInternalState(value) {
            if (value) {
                this.hoursSelected = value.getHours()
                this.minutesSelected = value.getMinutes()
                this.secondsSelected = value.getSeconds()
                this.meridienSelected = value.getHours() >= 12 ? PM : AM
            } else {
                this.hoursSelected = null
                this.minutesSelected = null
                this.secondsSelected = null
                this.meridienSelected = AM
            }
            this.dateSelected = value
        },

        isHourDisabled(hour) {
            let disabled = false
            if (this.minTime) {
                const minHours = this.minTime.getHours()
                const noMinutesAvailable = this.minutes.every((minute) => {
                    return this.isMinuteDisabledForHour(hour, minute.value)
                })
                disabled = hour < minHours || noMinutesAvailable
            }
            if (this.maxTime) {
                if (!disabled) {
                    const maxHours = this.maxTime.getHours()
                    disabled = hour > maxHours
                }
            }
            if (this.unselectableTimes) {
                if (!disabled) {
                    const unselectable = this.unselectableTimes.filter((time) => {
                        if (this.enableSeconds && this.secondsSelected !== null) {
                            return time.getHours() === hour &&
                                time.getMinutes() === this.minutesSelected &&
                                time.getSeconds() === this.secondsSelected
                        } else if (this.minutesSelected !== null) {
                            return time.getHours() === hour &&
                                time.getMinutes() === this.minutesSelected
                        } else {
                            return time.getHours() === hour
                        }
                    })
                    disabled = unselectable.length > 0
                }
            }
            return disabled
        },

        isMinuteDisabledForHour(hour, minute) {
            let disabled = false
            if (this.minTime) {
                const minHours = this.minTime.getHours()
                const minMinutes = this.minTime.getMinutes()
                disabled = hour === minHours && minute < minMinutes
            }
            if (this.maxTime) {
                if (!disabled) {
                    const maxHours = this.maxTime.getHours()
                    const maxMinutes = this.maxTime.getMinutes()
                    disabled = hour === maxHours && minute > maxMinutes
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
                    disabled = this.isMinuteDisabledForHour(this.hoursSelected, minute)
                }
                if (this.unselectableTimes) {
                    if (!disabled) {
                        const unselectable = this.unselectableTimes.filter((time) => {
                            if (this.enableSeconds && this.secondsSelected !== null) {
                                return time.getHours() === this.hoursSelected &&
                                    time.getMinutes() === minute &&
                                    time.getSeconds() === this.secondsSelected
                            } else {
                                return time.getHours() === this.hoursSelected &&
                                    time.getMinutes() === minute
                            }
                        })
                        disabled = unselectable.length > 0
                    }
                }
            }
            return disabled
        },

        isSecondDisabled(second) {
            let disabled = false
            if (this.minutesSelected !== null) {
                if (this.isMinuteDisabled(this.minutesSelected)) {
                    disabled = true
                } else {
                    if (this.minTime) {
                        const minHours = this.minTime.getHours()
                        const minMinutes = this.minTime.getMinutes()
                        const minSeconds = this.minTime.getSeconds()
                        disabled = this.hoursSelected === minHours &&
                            this.minutesSelected === minMinutes &&
                            second < minSeconds
                    }
                    if (this.maxTime) {
                        if (!disabled) {
                            const maxHours = this.maxTime.getHours()
                            const maxMinutes = this.maxTime.getMinutes()
                            const maxSeconds = this.maxTime.getSeconds()
                            disabled = this.hoursSelected === maxHours &&
                                this.minutesSelected === maxMinutes &&
                                second > maxSeconds
                        }
                    }
                }
                if (this.unselectableTimes) {
                    if (!disabled) {
                        const unselectable = this.unselectableTimes.filter((time) => {
                            return time.getHours() === this.hoursSelected &&
                                time.getMinutes() === this.minutesSelected &&
                                time.getSeconds() === second
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
                const seconds = date.getSeconds()
                return this.formatNumber(hours, true) + ':' +
                    this.formatNumber(minutes, true) + ':' +
                    this.formatNumber(seconds, true)
            }
            return ''
        },

        /*
        * Parse time from string
        */
        onChangeNativePicker(event) {
            const date = event.target.value
            if (date) {
                let time = null
                if (this.computedValue && !isNaN(this.computedValue)) {
                    time = new Date(this.computedValue)
                } else {
                    time = new Date()
                    time.setMilliseconds(0)
                }
                const t = date.split(':')
                time.setHours(parseInt(t[0], 10))
                time.setMinutes(parseInt(t[1], 10))
                time.setSeconds(t[2] ? parseInt(t[2], 10) : 0)
                this.computedValue = new Date(time.getTime())
            } else {
                this.computedValue = null
            }
        },

        formatNumber(value, prependZero) {
            return this.isHourFormat24 || prependZero
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
        },
        /**
         * Emit 'blur' event on dropdown is not active (closed)
         */
        onActiveChange(value) {
            if (!value) {
                this.onBlur()
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
