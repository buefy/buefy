<template>
    <div
        class="b-slider"
        :class="{ 'is-dragging': dragging }"
        role="slider"
        :aria-valuemin="min"
        :aria-valuemax="max"
        aria-orientation="horizontal"
        :aria-disabled="disabled">
        <div
            class="b-slider-track"
            :class="{ 'is-disabled': disabled }"
            @click="onSliderClick"
            ref="slider">
            <div
                class="b-slider-fill"
                :style="barStyle"/>
            <template v-if="showTicks">
                <div
                    class="b-slider-tick"
                    v-for="(item, key) in ticks"
                    :key="key"
                    :style="getTickStyle(item)"/>
            </template>
            <b-slider-thumb
                v-model="firstValue"
                ref="button1"/>
            <b-slider-thumb
                v-model="secondValue"
                ref="button2"
                v-if="isRange"/>
        </div>
    </div>
</template>

<script>
import FormElementMixin from '../../utils/FormElementMixin'
import SliderThumb from './SliderThumb'

export default {
    name: 'BSlider',
    components: {
        [SliderThumb.name]: SliderThumb
    },
    mixins: [FormElementMixin],
    inheritAttrs: false,
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
        showTicks: {
            type: Boolean,
            default: false
        },
        showTooltip: {
            type: Boolean,
            default: true
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            firstValue: null,
            secondValue: null,
            dragging: false,
            isRange: false
        }
    },
    computed: {
        ticks() {
            if (!this.showTicks || this.min > this.max || this.step === 0) return []
            const stopCount = (this.max - this.min) / this.step
            const stepWidth = 100 * this.step / (this.max - this.min)
            const result = []
            for (let i = 1; i < stopCount; i++) {
                result.push(i * stepWidth)
            }
            return result
        },
        minValue() {
            return Math.min(this.firstValue, this.secondValue)
        },
        maxValue() {
            return Math.max(this.firstValue, this.secondValue)
        },
        barSize() {
            return this.isRange
                ? `${100 * (this.maxValue - this.minValue) / (this.max - this.min)}%`
                : `${100 * (this.firstValue - this.min) / (this.max - this.min)}%`
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
        }
    },
    watch: {
        /**
        * When v-model is changed set the new active step.
        */
        value(value) {
            this.setValues(value)
        },
        firstValue(val) {
            console.log('First changed:' + val)
            this.isThumbReversed = this.firstValue > this.secondValue
            if (this.isRange) {
                this.$emit('input', [this.minValue, this.maxValue])
            } else {
                this.$emit('input', val)
            }
        },
        secondValue(val) {
            console.log('Second changed:' + val)
            this.isThumbReversed = this.firstValue > this.secondValue
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
            console.log('?')
            console.log(newValue)
            console.log(this.isThumbReversed)
            if (Array.isArray(newValue)) {
                this.isRange = true
                const smallValue = typeof newValue[0] !== 'number' || isNaN(newValue[0])
                    ? this.min
                    : Math.min(Math.max(this.min, newValue[0]), this.max)
                const largeValue = typeof newValue[1] !== 'number' || isNaN(newValue[1])
                    ? this.max
                    : Math.max(Math.min(this.max, newValue[1]), this.min)
                console.log('INIT')
                console.log(smallValue)
                console.log(largeValue)
                this.firstValue = this.isThumbReversed ? largeValue : smallValue
                this.secondValue = this.isThumbReversed ? smallValue : largeValue
            } else {
                this.isRange = false
                if (isNaN(newValue)) {
                    this.firstValue = this.min
                } else {
                    this.firstValue = Math.min(this.max, Math.max(this.min, newValue))
                }
            }
        },
        onSliderClick(event) {
            if (this.disabled || this.dragging) return
            console.log('clicked')
            const sliderOffsetLeft = this.$refs.slider.getBoundingClientRect().left
            const percent = (event.clientX - sliderOffsetLeft) / this.sliderSize * 100
            const targetValue = this.min + percent * (this.max - this.min) / 100
            const diffFirst = Math.abs(targetValue - this.firstValue)
            if (!this.isRange) {
                if (diffFirst < this.step / 2) return
                this.$refs.button1.setPosition(percent)
            } else {
                const diffSecond = Math.abs(targetValue - this.secondValue)
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
                : this.firstValue)
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
        const valuetext = this.isRange ? `${this.firstValue}-${this.secondValue}` : this.firstValue
        this.$el.setAttribute('aria-valuetext', valuetext)
        // label screen reader
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
