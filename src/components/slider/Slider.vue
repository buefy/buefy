<template>
    <div
        class="b-slider"
        :class="[size, type, rootClasses]"
        role="slider"
        :aria-valuemin="min"
        :aria-valuemax="max"
        aria-orientation="horizontal"
        :aria-disabled="disabled">
        <div
            class="b-slider-track"
            @click="onSliderClick"
            ref="slider">
            <div
                class="b-slider-fill"
                :style="barStyle"/>
            <template v-if="ticks">
                <div
                    class="b-slider-tick"
                    v-for="(item, key) in tickPositions"
                    :key="key"
                    :style="getTickStyle(item)"/>
            </template>
            <b-slider-thumb
                v-model="value1"
                :type="newTooltipType"
                :tooltip="tooltip"
                ref="button1"/>
            <b-slider-thumb
                v-model="value2"
                :type="newTooltipType"
                :tooltip="tooltip"
                ref="button2"
                v-if="isRange"/>
        </div>
    </div>
</template>

<script>
import SliderThumb from './SliderThumb'

export default {
    name: 'BSlider',
    components: {
        [SliderThumb.name]: SliderThumb
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
        }
    },
    data() {
        return {
            value1: null,
            value2: null,
            dragging: false,
            isRange: false,
            newTooltipType: this.tooltipType ? this.tooltipType : this.type,
            _isSlider: true // Used by SliderThumb
        }
    },
    computed: {
        tickPositions() {
            if (!this.ticks || this.min > this.max || this.step === 0) return []
            const stopCount = (this.max - this.min) / this.step
            const stepWidth = 100 * this.step / (this.max - this.min)
            const result = []
            for (let i = 1; i < stopCount; i++) {
                result.push(i * stepWidth)
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
        setSize() {
            this.sliderSize = this.$refs.slider['clientWidth']
        },
        emitChange() {
            this.$emit('change', this.isRange
                ? [this.minValue, this.maxValue]
                : this.value1)
        },
        getTickStyle(position) {
            return { 'left': position + '%' }
        }
    },
    created() {
        this.setValues(this.value)
        this.isThumbReversed = false
    },
    mounted() {
        // TODO valuenow?
        const valuetext = this.isRange ? `${this.value1}-${this.value2}` : this.value1
        this.$el.setAttribute('aria-valuetext', valuetext)
        this.$el.setAttribute('aria-label', this.label ? this.label : `slider between ${this.min} and ${this.max}`)
        this.setSize()
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', this.setSize)
        }
    },
    beforeDestroy() {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', this.setSize)
        }
    }
}
</script>
