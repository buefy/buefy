<template>
    <div class="progress-wrapper" :class="[wrapperClasses, { 'is-squared': !rounded }]">
        <progress
            v-if="isNative"
            ref="progress"
            class="progress"
            :class="[newType, { 'is-squared': !rounded }]"
            :max="max"
            :value="value"
        >
            {{ newValue }}
        </progress>
        <slot v-else name="bar" />
        <p
            v-if="isNative && showValue"
            class="progress-value"
        >
            <slot>{{ newValue }}</slot>
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { ExtractComponentProps } from '../../utils/helpers'
import config from '../../utils/config'

export const PROGRESS_INJECTION_KEY = Symbol('bprogress')

const Progress = defineComponent({
    name: 'BProgress',
    provide() {
        return {
            [PROGRESS_INJECTION_KEY]: this
        }
    },
    props: {
        type: {
            type: [String, Object],
            default: 'is-darkgrey'
        },
        size: {
            type: String
        },
        rounded: {
            type: Boolean,
            default: true
        },
        value: {
            type: Number,
            default: undefined
        },
        max: {
            type: Number,
            default: 100
        },
        showValue: {
            type: Boolean,
            default: false
        },
        format: {
            type: String,
            default: 'raw',
            validator: (value: string) => {
                return [
                    'raw',
                    'percent'
                ].indexOf(value) >= 0
            }
        },
        precision: {
            type: Number,
            default: 2
        },
        keepTrailingZeroes: {
            type: Boolean,
            default: false
        },
        locale: {
            type: [String, Array<string>],
            default: () => {
                return config.defaultLocale
            },
            validator: (value) => {
                if (Array.isArray(value)) {
                    return value.every((item) => typeof item === 'string')
                }
                return typeof value === 'string'
            }
        }
    },
    computed: {
        isIndeterminate() {
            return this.value === undefined || this.value === null
        },
        newType() {
            return [
                this.size,
                this.type,
                {
                    'is-more-than-half': this.value && this.value > this.max / 2
                }
            ]
        },
        newValue() {
            return this.calculateValue(this.value)
        },
        isNative() {
            return this.$slots.bar === undefined
        },
        wrapperClasses() {
            return {
                'is-not-native': !this.isNative,
                [this.size === undefined ? '' : this.size]: typeof this.size === 'string' && !this.isNative
            }
        }
    },
    watch: {
        /**
         * When value is changed back to undefined, value of native progress get reset to 0.
         * Need to add and remove the value attribute to have the indeterminate or not.
         */
        isIndeterminate(indeterminate) {
            this.$nextTick(() => {
                if (this.$refs.progress) {
                    if (indeterminate) {
                        (this.$refs.progress as HTMLProgressElement).removeAttribute('value')
                    } else {
                        (this.$refs.progress as HTMLProgressElement).setAttribute('value', this.value!.toString())
                    }
                }
            })
        }
    },
    methods: {
        calculateValue(value: number | undefined) {
            if (value === undefined || value === null || isNaN(value)) {
                return undefined
            }

            const minimumFractionDigits = this.keepTrailingZeroes ? this.precision : 0
            const maximumFractionDigits = this.precision
            if (this.format === 'percent') {
                return new Intl.NumberFormat(
                    this.locale,
                    {
                        style: 'percent',
                        minimumFractionDigits,
                        maximumFractionDigits
                    }
                ).format(value / this.max)
            }

            return new Intl.NumberFormat(
                this.locale,
                {
                    minimumFractionDigits,
                    maximumFractionDigits
                }
            ).format(value)
        }
    }
})

export type ProgressProps = ExtractComponentProps<typeof Progress>

export default Progress
</script>
