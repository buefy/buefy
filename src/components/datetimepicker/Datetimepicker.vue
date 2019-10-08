<template>
    <b-datepicker
        v-if="!isMobile || inline"
        ref="datepicker"
        v-model="computedValue"
        v-bind="datepicker"
        :open-on-focus="openOnFocus"
        :inline="inline"
        :editable="editable"
        :close-on-click="false"
        :date-formatter="defaultDatetimeFormatter"
        :date-parser="defaultDatetimeParser">
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
        inline: Boolean,
        openOnFocus: Boolean,
        mobileNative: {
            type: Boolean,
            default: true
        },
        datetimeFormatter: {
            type: Function
        },
        datetimeParser: {
            type: Function
        },
        timeCreator: {
            type: Function,
            default: (date) => {
                if (typeof config.defaultDatetimeTimeCreator === 'function') {
                    return config.defaultDatetimeTimeCreator(date)
                } else {
                    return date
                }
            }
        },
        datepicker: Object,
        timepicker: Object
    },
    data() {
        return {
            newValue: this.value
        }
    },
    computed: {
        computedValue: {
            get() {
                return this.newValue
            },
            set(value) {
                let val = value
                if (value !== null && typeof value !== 'undefined') {
                    val = new Date(value.getTime())
                    if (this.newValue) {
                        // on datepicker select -> maintain time part
                        if (value.getHours() === 0 &&
                            value.getMinutes() === 0 &&
                            value.getSeconds() === 0) {
                            val.setHours(this.newValue.getHours(),
                                this.newValue.getMinutes(),
                                this.newValue.getSeconds(), 0)
                        }
                    } else {
                        val = this.timeCreator(val)
                    }
                }
                this.newValue = val
                this.$emit('input', value)
            }
        },
        isMobile() {
            return this.mobileNative && isMobile.any()
        }
    },
    watch: {
        value(value) {
            this.newValue = value
        }
    },
    methods: {
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
                const yyyyMMdd = date.getFullYear() +
                    '/' + (date.getMonth() + 1) +
                    '/' + date.getDate()
                const d = new Date(yyyyMMdd)
                return d.toLocaleDateString() +
                    ' ' +
                    this.$refs.timepicker.timeFormatter(date, this.$refs.timepicker)
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
        }
    }
}
</script>
