<template>
    <b-datepicker
        v-if="!isMobile || inline"
        ref="datepicker"
        v-model="computedValue"
        v-bind="datepicker"
        :open-on-focus="openOnFocus"
        :position="position"
        :loading="loading"
        :inline="inline"
        :editable="editable"
        :expanded="expanded"
        :close-on-click="false"
        :date-formatter="defaultDatetimeFormatter"
        :date-parser="defaultDatetimeParser"
        :min-date="minDate"
        :max-date="maxDate"
        :icon="icon"
        :icon-pack="iconPack"
        :size="datepickerSize"
        :placeholder="placeholder"
        :horizontal-time-picker="horizontalTimePicker"
        :range="false"
        :disabled="disabled"
        :mobile-native="isMobileNative"
        :focusable="focusable"
        :append-to-body="appendToBody"
        @focus="onFocus"
        @blur="onBlur"
        @change-month="$emit('change-month', $event)"
        @change-year="$emit('change-year', $event)">
        <nav class="level is-mobile">
            <div
                class="level-item has-text-centered"
                v-if="$slots.left !== undefined">
                <slot name="left" />
            </div>
            <div class="level-item has-text-centered">
                <b-timepicker
                    ref="timepicker"
                    v-bind="timepicker"
                    v-model="computedValue"
                    inline
                    :editable="editable"
                    :min-time="minTime"
                    :max-time="maxTime"
                    :size="timepickerSize"
                    :disabled="timepickerDisabled"
                    :focusable="focusable"
                    :mobile-native="isMobileNative"
                />
            </div>
            <div
                class="level-item has-text-centered"
                v-if="$slots.right !== undefined">
                <slot name="right" />
            </div>
        </nav>
    </b-datepicker>
    <b-input
        v-else
        ref="input"
        type="datetime-local"
        autocomplete="off"
        :value="formatNative(computedValue)"
        :placeholder="placeholder"
        :size="size"
        :icon="icon"
        :icon-pack="iconPack"
        :loading="loading"
        :max="formatNative(maxDate)"
        :min="formatNative(minDate)"
        :disabled="disabled"
        :readonly="false"
        v-bind="$attrs"
        :use-html5-validation="useHtml5Validation"
        @change.native="onChangeNativePicker"
        @focus="onFocus"
        @blur="onBlur"/>
</template>

<script>
import FormElementMixin from '../../utils/FormElementMixin'
import { isMobile } from '../../utils/helpers'
import config from '../../utils/config'

import Datepicker from '../datepicker/Datepicker'
import Timepicker from '../timepicker/Timepicker'

export default {
    name: 'BDatetimepicker',
    components: {
        [Datepicker.name]: Datepicker,
        [Timepicker.name]: Timepicker
    },
    mixins: [FormElementMixin],
    inheritAttrs: false,
    props: {
        value: {
            type: Date
        },
        editable: {
            type: Boolean,
            default: false
        },
        placeholder: String,
        horizontalTimePicker: Boolean,
        disabled: Boolean,
        icon: String,
        iconPack: String,
        inline: Boolean,
        openOnFocus: Boolean,
        position: String,
        mobileNative: {
            type: Boolean,
            default: true
        },
        minDatetime: Date,
        maxDatetime: Date,
        datetimeFormatter: {
            type: Function
        },
        datetimeParser: {
            type: Function
        },
        datetimeCreator: {
            type: Function,
            default: (date) => {
                if (typeof config.defaultDatetimeCreator === 'function') {
                    return config.defaultDatetimeCreator(date)
                } else {
                    return date
                }
            }
        },
        datepicker: Object,
        timepicker: Object,
        tzOffset: {
            type: Number,
            default: 0
        },
        focusable: {
            type: Boolean,
            default: true
        },
        appendToBody: Boolean
    },
    data() {
        return {
            newValue: this.adjustValue(this.value)
        }
    },
    computed: {
        computedValue: {
            get() {
                return this.newValue
            },
            set(value) {
                if (value) {
                    let val = new Date(value.getTime())
                    if (this.newValue) {
                        // restore time part
                        if ((value.getDate() !== this.newValue.getDate() ||
                            value.getMonth() !== this.newValue.getMonth() ||
                            value.getFullYear() !== this.newValue.getFullYear()) &&
                            value.getHours() === 0 &&
                            value.getMinutes() === 0 &&
                            value.getSeconds() === 0) {
                            val.setHours(this.newValue.getHours(),
                                this.newValue.getMinutes(),
                                this.newValue.getSeconds(), 0)
                        }
                    } else {
                        val = this.datetimeCreator(value)
                    }
                    // check min and max range
                    if (this.minDatetime && val < this.adjustValue(this.minDatetime)) {
                        val = this.adjustValue(this.minDatetime)
                    } else if (this.maxDatetime && val > this.adjustValue(this.maxDatetime)) {
                        val = this.adjustValue(this.maxDatetime)
                    }
                    this.newValue = new Date(val.getTime())
                } else {
                    this.newValue = this.adjustValue(this.value)
                }
                var adjustedValue = this.adjustValue(this.newValue, true) // reverse adjust
                this.$emit('input', adjustedValue)
            }
        },
        isMobileNative() {
            return this.mobileNative && this.tzOffset === 0
        },
        isMobile() {
            return this.isMobileNative && isMobile.any()
        },
        minDate() {
            if (!this.minDatetime) {
                return this.datepicker ? this.adjustValue(this.datepicker.minDate) : null
            }
            const adjMinDatetime = this.adjustValue(this.minDatetime)
            return new Date(adjMinDatetime.getFullYear(),
                adjMinDatetime.getMonth(),
                adjMinDatetime.getDate(), 0, 0, 0, 0)
        },
        maxDate() {
            if (!this.maxDatetime) {
                return this.datepicker ? this.adjustValue(this.datepicker.maxDate) : null
            }
            const adjMaxDatetime = this.adjustValue(this.maxDatetime)
            return new Date(adjMaxDatetime.getFullYear(),
                adjMaxDatetime.getMonth(),
                adjMaxDatetime.getDate(), 0, 0, 0, 0)
        },
        minTime() {
            if (!this.minDatetime || (this.newValue === null || typeof this.newValue === 'undefined')) {
                return this.timepicker ? this.adjustValue(this.timepicker.minTime) : null
            }
            const adjMinDatetime = this.adjustValue(this.minDatetime)
            if (adjMinDatetime.getFullYear() === this.newValue.getFullYear() &&
                adjMinDatetime.getMonth() === this.newValue.getMonth() &&
                adjMinDatetime.getDate() === this.newValue.getDate()) {
                return adjMinDatetime
            }
        },
        maxTime() {
            if (!this.maxDatetime || (this.newValue === null || typeof this.newValue === 'undefined')) {
                return this.timepicker ? this.adjustValue(this.timepicker.maxTime) : null
            }
            const adjMaxDatetime = this.adjustValue(this.maxDatetime)
            if (adjMaxDatetime.getFullYear() === this.newValue.getFullYear() &&
                adjMaxDatetime.getMonth() === this.newValue.getMonth() &&
                adjMaxDatetime.getDate() === this.newValue.getDate()) {
                return adjMaxDatetime
            }
        },
        datepickerSize() {
            return this.datepicker && this.datepicker.size
                ? this.datepicker.size : this.size
        },
        timepickerSize() {
            return this.timepicker && this.timepicker.size
                ? this.timepicker.size : this.size
        },
        timepickerDisabled() {
            return this.timepicker && this.timepicker.disabled
                ? this.timepicker.disabled : this.disabled
        }
    },
    watch: {
        value(val) {
            this.newValue = this.adjustValue(this.value)
        },
        tzOffset(val) {
            this.newValue = this.adjustValue(this.value)
        }
    },
    methods: {
        adjustValue(value, reverse = false) {
            if (!value) return value
            if (reverse) {
                return new Date(value.getTime() - this.tzOffset * 60000)
            } else {
                return new Date(value.getTime() + this.tzOffset * 60000)
            }
        },
        defaultDatetimeParser(date) {
            if (typeof this.datetimeParser === 'function') {
                return this.datetimeParser(date)
            } else if (typeof config.defaultDatetimeParser === 'function') {
                return config.defaultDatetimeParser(date)
            } else {
                return new Date(Date.parse(date))
            }
        },
        defaultDatetimeFormatter(date) {
            if (typeof this.datetimeFormatter === 'function') {
                return this.datetimeFormatter(date)
            } else if (typeof config.defaultDatetimeParser === 'function') {
                return config.defaultDatetimeParser(date)
            } else {
                if (this.$refs.timepicker) {
                    const yyyyMMdd = date.getFullYear() +
                        '/' + (date.getMonth() + 1) +
                        '/' + date.getDate()
                    const d = new Date(yyyyMMdd)
                    return d.toLocaleDateString() +
                        ' ' + this.$refs.timepicker.timeFormatter(date, this.$refs.timepicker)
                }
                return null
            }
        },
        /*
        * Parse date from string
        */
        onChangeNativePicker(event) {
            const date = event.target.value
            this.computedValue = date ? new Date(date) : null
        },
        formatNative(value) {
            const date = new Date(value)
            if (value && !isNaN(date)) {
                const year = date.getFullYear()
                const month = date.getMonth() + 1
                const day = date.getDate()
                const hours = date.getHours()
                const minutes = date.getMinutes()
                const seconds = date.getSeconds()
                return year + '-' +
                    ((month < 10 ? '0' : '') + month) + '-' +
                    ((day < 10 ? '0' : '') + day) + 'T' +
                    ((hours < 10 ? '0' : '') + hours) + ':' +
                    ((minutes < 10 ? '0' : '') + minutes) + ':' +
                    ((seconds < 10 ? '0' : '') + seconds)
            }
            return ''
        },
        toggle() {
            this.$refs.datepicker.toggle()
        }
    },
    mounted() {
        if (!this.isMobile || this.inline) {
            // $refs attached, it's time to refresh datepicker (input)
            if (this.newValue) {
                this.$refs.datepicker.$forceUpdate()
            }
        }
    }
}
</script>
