<template>
    <div class="timepicker control" :class="[size, {'is-expanded': expanded}]">
        <b-dropdown
            v-if="!isMobile || inline"
            ref="dropdown"
            :position="position"
            :disabled="disabled"
            :inline="inline">
            <b-input
                v-if="!inline"
                ref="input"
                slot="trigger"
                autocomplete="off"
                :value="formatValue(dateSelected)"
                :placeholder="placeholder"
                :size="size"
                :icon="icon"
                :icon-pack="iconPack"
                :loading="loading"
                :disabled="disabled"
                :readonly="!editable"
                :rounded="rounded"
                v-bind="$attrs"
                @change.native="onChange($event.target.value)"
                @focus="$emit('focus', $event)"
                @blur="$emit('blur', $event) && checkHtml5Validity()"/>

            <b-dropdown-item :disabled="disabled" custom>
                <b-field grouped position="is-centered">
                    <b-select
                        v-model="hoursSelected"
                        @change.native="onHoursChange($event.target.value)"
                        :disabled="disabled"
                        placeholder="00">
                        <option
                            v-for="hour in hours"
                            :value="hour.value"
                            :key="hour.value"
                            :disabled="isHourDisabled(hour.value)">
                            {{ hour.label }}
                        </option>
                    </b-select>
                    <span class="control is-colon">:</span>
                    <b-select
                        v-model="minutesSelected"
                        @change.native="onMinutesChange($event.target.value)"
                        :disabled="disabled"
                        placeholder="00">
                        <option
                            v-for="minute in minutes"
                            :value="minute.value"
                            :key="minute.value"
                            :disabled="isMinuteDisabled(minute.value)">
                            {{ minute.label }}
                        </option>
                    </b-select>
                    <b-select
                        v-model="meridienSelected"
                        @change.native="onMeridienChange($event.target.value)"
                        v-if="!isHourFormat24"
                        :disabled="disabled">
                        <option
                            v-for="meridien in meridiens"
                            :value="meridien"
                            :key="meridien">
                            {{ meridien }}
                        </option>
                    </b-select>
                </b-field>

                <footer
                    v-if="$slots.default !== undefined && $slots.default.length"
                    class="timepicker-footer">
                    <slot/>
                </footer>
            </b-dropdown-item>
        </b-dropdown>

        <b-input
            v-else
            ref="input"
            type="time"
            autocomplete="off"
            :value="formatHHMMSS(value)"
            :placeholder="placeholder"
            :size="size"
            :icon="icon"
            :icon-pack="iconPack"
            :loading="loading"
            :max="formatHHMMSS(maxTime)"
            :min="formatHHMMSS(minTime)"
            :disabled="disabled"
            :readonly="false"
            v-bind="$attrs"
            @change.native="onChangeNativePicker"
            @focus="$emit('focus', $event)"
            @blur="$emit('blur', $event) && checkHtml5Validity()"/>
    </div>
</template>

<script>
    import FormElementMixin from '../../utils/FormElementMixin'
    import { isMobile } from '../../utils/helpers'
    import config from '../../utils/config'

    import Dropdown from '../dropdown/Dropdown'
    import DropdownItem from '../dropdown/DropdownItem'
    import Input from '../input/Input'
    import Field from '../field/Field'
    import Select from '../select/Select'
    import Icon from '../icon/Icon'

    const AM = 'AM'
    const PM = 'PM'
    const HOUR_FORMAT_24 = '24'
    const HOUR_FORMAT_12 = '12'

    const formatNumber = (value) => {
        return (value < 10 ? '0' : '') + value
    }

    const timeFormatter = (date, vm) => {
        let hours = date.getHours()
        const minutes = date.getMinutes()
        let am = false
        if (vm.hourFormat === HOUR_FORMAT_12) {
            am = hours < 12
            if (hours > 12) {
                hours -= 12
            } else if (hours === 0) {
                hours = 12
            }
        }
        return formatNumber(hours) + ':' + formatNumber(minutes) +
            (vm.hourFormat === HOUR_FORMAT_12 ? (' ' + (am ? AM : PM)) : '')
    }

    const timeParser = (date, vm) => {
        if (date) {
            let dateString = date
            let am = false
            if (vm.hourFormat === HOUR_FORMAT_12) {
                const dateString12 = date.split(' ')
                dateString = dateString12[0]
                am = dateString12[1] === AM
            }
            const time = dateString.split(':')
            let hours = parseInt(time[0], 10)
            const minutes = parseInt(time[1], 10)
            if (isNaN(hours) || hours < 0 || hours > 23 ||
                (vm.hourFormat === HOUR_FORMAT_12 && (hours < 1 || hours > 12)) ||
                isNaN(minutes) || minutes < 0 || minutes > 59) {
                return null
            }
            let d = null
            if (vm.dateSelected && !isNaN(vm.dateSelected)) {
                d = new Date(vm.dateSelected)
            } else {
                d = new Date()
                d.setMilliseconds(0)
                d.setSeconds(0)
            }
            d.setMinutes(minutes)
            if (vm.hourFormat === HOUR_FORMAT_12) {
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
        name: 'BTimepicker',
        components: {
            [Input.name]: Input,
            [Field.name]: Field,
            [Select.name]: Select,
            [Icon.name]: Icon,
            [Dropdown.name]: Dropdown,
            [DropdownItem.name]: DropdownItem
        },
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
                        return timeFormatter(date, vm)
                    }
                }
            },
            timeParser: {
                type: Function,
                default: (date, vm) => {
                    if (typeof config.defaultTimeParser === 'function') {
                        return config.defaultTimeParser(date)
                    } else {
                        return timeParser(date, vm)
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
            unselectableTimes: Array
        },
        data() {
            return {
                dateSelected: this.value,
                hoursSelected: null,
                minutesSelected: null,
                meridienSelected: null,
                _elementRef: 'input',
                _isTimepicker: true
            }
        },
        computed: {

            hours() {
                const hours = []
                const numberOfHours = this.isHourFormat24 ? 24 : 12
                for (let i = 0; i < numberOfHours; i++) {
                    let value = i
                    let label = value
                    if (!this.isHourFormat24) {
                        value = (i + 1)
                        label = value
                        if (this.meridienSelected === AM) {
                            if (value === 12) {
                                value = 0
                            }
                        } else if (this.meridienSelected === PM) {
                            if (value !== 12) {
                                value += 12
                            }
                        }
                    }
                    hours.push({
                        label: formatNumber(label),
                        value: value
                    })
                }
                return hours
            },

            minutes() {
                const minutes = []
                for (let i = 0; i < 60; i += this.incrementMinutes) {
                    minutes.push({
                        label: formatNumber(i),
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

            hourFormat(value) {
                if (this.hoursSelected !== null) {
                    this.meridienSelected = this.hoursSelected >= 12 ? PM : AM
                }
            },

            /**
            * Emit input event with selected date as payload.
            */
            dateSelected(value) {
                this.$emit('input', value)
            },

            /**
             * When v-model is changed:
             *   1. Update internal value.
             *   2. If it's invalid, validate again.
             */
            value(value) {
                this.updateInternalState(value)
                this.dateSelected = value

                !this.isValid && this.$refs.input.checkHtml5Validity()
            }
        },
        methods: {

            onMeridienChange(value) {
                if (this.hoursSelected !== null) {
                    if (value === PM) {
                        if (this.hoursSelected === 0) {
                            this.hoursSelected = 12
                        } else {
                            this.hoursSelected += 12
                        }
                    } else if (value === AM) {
                        if (this.hoursSelected === 12) {
                            this.hoursSelected = 0
                        } else {
                            this.hoursSelected -= 12
                        }
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
                    if (this.dateSelected && !isNaN(this.dateSelected)) {
                        this.dateSelected = new Date(this.dateSelected)
                    } else {
                        this.dateSelected = new Date()
                        this.dateSelected.setMilliseconds(0)
                        this.dateSelected.setSeconds(0)
                    }
                    this.dateSelected.setHours(hours)
                    this.dateSelected.setMinutes(minutes)
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
                    this.dateSelected = date
                } else {
                    // Force refresh input value when not valid date
                    this.dateSelected = null
                    this.$refs.input.newValue = this.dateSelected
                }
            },

            /*
            * Format date into string
            */
            formatValue(value) {
                if (value && !isNaN(value)) {
                    return this.timeFormatter(value, this)
                } else {
                    return null
                }
            },

            /*
            * Close dropdown time picker
            */
            close() {
                if (this.$refs.dropdown) {
                    this.$refs.dropdown.isActive = false
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
                    return formatNumber(hours) + ':' +
                        formatNumber(minutes) + ':00'
                }
                return ''
            },

            /*
            * Parse time from string
            */
            onChangeNativePicker(event) {
                const date = event.target.value
                if (date) {
                    if (this.dateSelected && !isNaN(this.dateSelected)) {
                        this.dateSelected = new Date(this.dateSelected)
                    } else {
                        this.dateSelected = new Date()
                        this.dateSelected.setMilliseconds(0)
                        this.dateSelected.setSeconds(0)
                    }
                    const time = date.split(':')
                    this.dateSelected.setHours(parseInt(time[0], 10))
                    this.dateSelected.setMinutes(parseInt(time[1], 10))
                } else {
                    this.dateSelected = null
                }
            }
        },
        mounted() {
            this.updateInternalState(this.value)
        }
    }
</script>
