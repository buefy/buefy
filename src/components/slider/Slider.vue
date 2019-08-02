<template>
    <div
        class="b-slider"
        :class="[size, type, rootClasses]">
        <div
            class="b-slider-track"
            @click="onSliderClick"
            ref="slider">
            <div
                class="b-slider-fill"
                :style="barStyle"/>
            <template v-if="ticks">
                <b-slider-tick
                    v-for="(val, key) in tickValues"
                    :key="key"
                    :value="val"/>
            </template>
            <slot/>
            <b-slider-thumb
                v-model="value1"
                :type="newTooltipType"
                :tooltip="tooltip"
                ref="button1"
                role="slider"
                :aria-valuenow="value1"
                :aria-valuemin="min"
                :aria-valuemax="max"
                aria-orientation="horizontal"
                :aria-label="Array.isArray(ariaLabel) ? ariaLabel[0] : ariaLabel"
                :aria-disabled="disabled"/>
            <b-slider-thumb
                v-model="value2"
                :type="newTooltipType"
                :tooltip="tooltip"
                ref="button2"
                v-if="isRange"
                role="slider"
                :aria-valuenow="value2"
                :aria-valuemin="min"
                :aria-valuemax="max"
                aria-orientation="horizontal"
                :aria-label="Array.isArray(ariaLabel) ? ariaLabel[1] : ''"
                :aria-disabled="disabled"/>
        </div>
    </div>
</template>

<script>
import SliderThumb from './SliderThumb'
import SliderTick from './SliderTick'

export default {
    name: 'BSlider',
    components: {
        [SliderThumb.name]: SliderThumb,
        [SliderTick.name]: SliderTick
    },
    props: {
        value: {
            type: [Number, Array],
            default: 0
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 100
        },
        step: {
            type: Number,
            default: 1
        },
        type: {
            type: String,
            default: 'is-primary'
        },
        size: String,
        ticks: {
            type: Boolean,
            default: false
        },
        tooltip: {
            type: Boolean,
            default: true
        },
        tooltipType: String,
        rounded: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        ariaLabel: [String, Array]
    },
    data() {
        return {
            value1: null,
            value2: null,
            dragging: false,
            isRange: false,
            newTooltipType: this.tooltipType ? this.tooltipType : this.type,
            _isSlider: true // Used by Thumb and Tick
        }
    },
    computed: {
        tickValues() {
            if (!this.ticks || this.min > this.max || this.step === 0) return []
            const result = []
            for (let i = this.min + this.step; i < this.max; i = i + this.step) {
                result.push(i)
            }
            return result
        },
        minValue() {
            return Math.min(this.value1, this.value2)
        },
        maxValue() {
            return Math.max(this.value1, this.value2)
        },
        barSize() {
            return this.isRange
                ? `${100 * (this.maxValue - this.minValue) / (this.max - this.min)}%`
                : `${100 * (this.value1 - this.min) / (this.max - this.min)}%`
        },
        barStart() {
            return this.isRange
                ? `${100 * (this.minValue - this.min) / (this.max - this.min)}%`
                : '0%'
        },
        precision() {
            const precisions = [this.min, this.max, this.step].map((item) => {
                let decimal = ('' + item).split('.')[1]
                return decimal ? decimal.length : 0
            })
            return Math.max(...precisions)
        },
        barStyle() {
            return {
                width: this.barSize,
                left: this.barStart
            }
        },
        sliderSize() {
            return this.$refs.slider['clientWidth']
        },
        rootClasses() {
            return {
                'is-rounded': this.rounded,
                'is-dragging': this.dragging,
                'is-disabled': this.disabled
            }
        }
    },
    watch: {
        /**
        * When v-model is changed set the new active step.
        */
        value(value) {
            this.setValues(value)
        },
        value1(val) {
            this.isThumbReversed = this.value1 > this.value2
            if (this.isRange) {
                this.$emit('input', [this.minValue, this.maxValue])
            } else {
                this.$emit('input', val)
            }
        },
        value2(val) {
            this.isThumbReversed = this.value1 > this.value2
            if (this.isRange) {
                this.$emit('input', [this.minValue, this.maxValue])
            }
        },
        min() {
            this.setValues()
        },
        max() {
            this.setValues()
        }
    },
    methods: {
        setValues(newValue) {
            if (this.min > this.max) {
                return
            }
            if (Array.isArray(newValue)) {
                this.isRange = true
                const smallValue = typeof newValue[0] !== 'number' || isNaN(newValue[0])
                    ? this.min
                    : Math.min(Math.max(this.min, newValue[0]), this.max)
                const largeValue = typeof newValue[1] !== 'number' || isNaN(newValue[1])
                    ? this.max
                    : Math.max(Math.min(this.max, newValue[1]), this.min)
                this.value1 = this.isThumbReversed ? largeValue : smallValue
                this.value2 = this.isThumbReversed ? smallValue : largeValue
            } else {
                this.isRange = false
                this.value1 = isNaN(newValue)
                    ? this.min
                    : Math.min(this.max, Math.max(this.min, newValue))
            }
        },
        onSliderClick(event) {
            if (this.disabled || this.dragging) return
            const sliderOffsetLeft = this.$refs.slider.getBoundingClientRect().left
            const percent = (event.clientX - sliderOffsetLeft) / this.sliderSize * 100
            const targetValue = this.min + percent * (this.max - this.min) / 100
            const diffFirst = Math.abs(targetValue - this.value1)
            if (!this.isRange) {
                if (diffFirst < this.step / 2) return
                this.$refs.button1.setPosition(percent)
            } else {
                const diffSecond = Math.abs(targetValue - this.value2)
                if (diffFirst <= diffSecond) {
                    if (diffFirst < this.step / 2) return
                    this.$refs['button1'].setPosition(percent)
                } else {
                    if (diffSecond < this.step / 2) return
                    this.$refs['button2'].setPosition(percent)
                }
            }
            this.emitChange()
        },
        emitChange() {
            this.$emit('change', this.isRange
                ? [this.minValue, this.maxValue]
                : this.value1)
        }
    },
    created() {
        this.setValues(this.value)
        this.isThumbReversed = false
    }
}
</script>
