<template>
    <div class="progress-wrapper">
        <progress
            ref="progress"
            class="progress"
            :class="newType"
            :max="max">{{ newValue }}</progress>
        <p
            v-if="showValue"
            class="progress-value"><slot>{{ newValue }}</slot></p>
    </div>
</template>

<script>

export default {
    name: 'BProgress',
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
        }
    },
    computed: {
        isIndeterminate() {
            return this.value === undefined || this.value === null
        },
        newType() {
            return [
                this.size,
                this.type
            ]
        },
        newValue() {
            if (this.value === undefined || this.value === null || isNaN(this.value)) {
                return undefined
            }

            if (this.format === 'percent') {
                const val = this.toFixed(this.value * 100 / this.max)
                return `${val}%`
            }
            const val = this.toFixed(this.value)
            return val
        }
    },
    watch: {
        value(value) {
            this.setValue(value)
        }
    },
    methods: {
        /**
        * When value is changed back to undefined, value of native progress get reset to 0.
        * Need to add and remove the value attribute to have the indeterminate or not.
        */
        setValue(value) {
            if (this.isIndeterminate) {
                this.$refs.progress.removeAttribute('value')
            } else {
                this.$refs.progress.setAttribute('value', value)
            }
        },
        // Custom function that imitate the javascript toFixed method with improved rounding
        toFixed(num) {
            let fixed = (+(`${Math.round(+(`${num}e${this.precision}`))}e${-this.precision}`)).toFixed(this.precision)
            if (!this.keepTrailingZeroes) {
                fixed = fixed.replace(/\.?0+$/, '')
            }
            return fixed
        }
    },
    mounted() {
        this.setValue(this.value)
    }
}
</script>
