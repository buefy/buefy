<template>
    <div class="progress-wrapper" :class="wrapperClasses">
        <progress
            v-if="isNative"
            ref="progress"
            class="progress"
            :class="newType"
            :max="max"
            :value="value">{{ newValue }}</progress>
        <slot v-else name="bar" />
        <p
            v-if="isNative && showValue"
            class="progress-value"><slot>{{ newValue }}</slot></p>
    </div>
</template>

<script>
import config from '../../utils/config'
import ProviderParentMixin from '../../utils/ProviderParentMixin'

export default {
    name: 'BProgress',
    mixins: [ProviderParentMixin('progress')],
    props: {
        type: {
            type: [String, Object],
            default: 'is-darkgrey'
        },
        size: String,
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
            validator: (value) => {
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
            type: [String, Array],
            default: () => {
                return config.defaultLocale
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
                [this.size]: !this.isNative
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
                        this.$refs.progress.removeAttribute('value')
                    } else {
                        this.$refs.progress.setAttribute('value', this.value)
                    }
                }
            })
        }
    },
    methods: {
        calculateValue(value) {
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
                        minimumFractionDigits: minimumFractionDigits,
                        maximumFractionDigits: maximumFractionDigits
                    }
                ).format(value / this.max)
            }

            return new Intl.NumberFormat(
                this.locale,
                {
                    minimumFractionDigits: minimumFractionDigits,
                    maximumFractionDigits: maximumFractionDigits
                }
            ).format(value)
        }
    }
}
</script>
