<template>
    <div
        class="b-slider"
        @click="onSliderClick"
        :class="[size, type, rootClasses ]"
    >
        <div
            class="b-slider-track"
            ref="slider"
        >
            <div
                class="b-slider-fill"
                :style="barStyle"
            />
            <template v-if="ticks">
                <b-slider-tick
                    v-for="(val, key) in tickValues"
                    :key="key"
                    :value="val"
                />
            </template>
            <slot />
            <b-slider-thumb
                :tooltip-always="tooltipAlways"
                v-model="value1"
                :type="newTooltipType"
                :tooltip="tooltip"
                :custom-formatter="customFormatter"
                :indicator="indicator"
                :format="format"
                :locale="locale"
                ref="button1"
                role="slider"
                :aria-valuenow="value1"
                :aria-valuemin="min"
                :aria-valuemax="max"
                aria-orientation="horizontal"
                :aria-label="Array.isArray(ariaLabel) ? ariaLabel[0] : ariaLabel"
                :aria-disabled="disabled || undefined"
                @dragstart="onDragStart"
                @dragend="onDragEnd"
            />
            <b-slider-thumb
                :tooltip-always="tooltipAlways"
                v-model="value2"
                :type="newTooltipType"
                :tooltip="tooltip"
                :custom-formatter="customFormatter"
                :indicator="indicator"
                :format="format"
                :locale="locale"
                ref="button2"
                v-if="isRange"
                role="slider"
                :aria-valuenow="value2"
                :aria-valuemin="min"
                :aria-valuemax="max"
                aria-orientation="horizontal"
                :aria-label="Array.isArray(ariaLabel) ? ariaLabel[1] : ''"
                :aria-disabled="disabled || undefined"
                @dragstart="onDragStart"
                @dragend="onDragEnd"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

import BSliderThumb from './SliderThumb.vue'
import BSliderTick from './SliderTick.vue'
import { DISPLAY_FORMATS } from './types'
import type { CustomFormatter, DisplayFormat } from './types'
import config from '../../utils/config'
import { bound } from '../../utils/helpers'

type BSliderThumbInstance = InstanceType<typeof BSliderThumb>

export default defineComponent({
    name: 'BSlider',
    components: {
        BSliderThumb,
        BSliderTick
    },
    props: {
        modelValue: {
            type: [Number, Array<number>],
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
        lazy: {
            type: Boolean,
            default: false
        },
        customFormatter: Function as PropType<CustomFormatter>,
        ariaLabel: [String, Array<string>],
        biggerSliderFocus: {
            type: Boolean,
            default: false
        },
        indicator: {
            type: Boolean,
            default: false
        },
        format: {
            type: String as PropType<DisplayFormat>,
            default: 'raw',
            validator: (value: DisplayFormat) => {
                return DISPLAY_FORMATS.indexOf(value) >= 0
            }
        },
        locale: {
            type: [String, Array<string>],
            default: () => {
                return config.defaultLocale
            }
        },
        tooltipAlways: {
            type: Boolean,
            default: false
        }
    },
    emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        change: (_value: number | [number, number]) => true,
        dragend: () => true,
        dragging: (_value: number | [number, number]) => true,
        dragstart: () => true,
        'update:modelValue': (_value: number | [number, number]) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
    },
    data() {
        return {
            value1: undefined as number | undefined,
            value2: undefined as number | undefined,
            // internal is used to update value1 and value2 with a single shot.
            // internal is also used to stop unnecessary propagation of update.
            internal: {
                value1: undefined as number | undefined,
                value2: undefined as number | undefined
            },
            dragging: false,
            isRange: false,
            isThumbReversed: false,
            isTrackClickDisabled: false,
            _isSlider: true, // Used by Thumb and Tick
            timeOutID: undefined as ReturnType<typeof setTimeout> | undefined
        }
    },
    computed: {
        newTooltipType() {
            return this.tooltipType ? this.tooltipType : this.type
        },
        tickValues() {
            if (!this.ticks || this.min > this.max || this.step === 0) return []
            const result = []
            for (let i = this.min + this.step; i < this.max; i = i + this.step) {
                result.push(i)
            }
            return result
        },
        minValue() {
            return Math.min(this.value1!, this.value2!)
        },
        maxValue() {
            return Math.max(this.value1!, this.value2!)
        },
        barSize() {
            return this.isRange
                ? `${100 * (this.maxValue - this.minValue) / (this.max - this.min)}%`
                : `${100 * (this.value1! - this.min) / (this.max - this.min)}%`
        },
        barStart() {
            return this.isRange
                ? `${100 * (this.minValue - this.min) / (this.max - this.min)}%`
                : '0%'
        },
        precision() {
            const precisions = [this.min, this.max, this.step].map((item) => {
                const decimal = ('' + item).split('.')[1]
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
                'is-disabled': this.disabled,
                'slider-focus': this.biggerSliderFocus
            }
        }
    },
    watch: {
        /*
        * When v-model is changed set the new active step.
        */
        modelValue(value) {
            this.setValues(value)
        },
        internal({ value1, value2 }) {
            this.value1 = value1
            this.value2 = value2
        },
        value1(newValue) {
            if (this.internal.value1 !== newValue) {
                this.onInternalValueUpdate()
            }
        },
        value2(newValue) {
            if (this.internal.value2 !== newValue) {
                this.onInternalValueUpdate()
            }
        },
        min() {
            this.setValues(this.modelValue)
        },
        max() {
            this.setValues(this.modelValue)
        }
    },
    methods: {
        setValues(newValue: number | number[]) {
            if (this.min > this.max) {
                return
            }
            if (Array.isArray(newValue)) {
                this.isRange = true
                const smallValue = typeof newValue[0] !== 'number' || isNaN(newValue[0])
                    ? this.min
                    : bound(newValue[0], this.min, this.max)
                const largeValue = typeof newValue[1] !== 'number' || isNaN(newValue[1])
                    ? this.max
                    : bound(newValue[1], this.min, this.max)
                // premature update will be triggered and end up with circular
                // update, if value1 and value2 are updated one by one
                this.internal = {
                    value1: this.isThumbReversed ? largeValue : smallValue,
                    value2: this.isThumbReversed ? smallValue : largeValue
                }
            } else {
                this.isRange = false
                this.internal = {
                    value1: isNaN(newValue)
                        ? this.min
                        : bound(newValue, this.min, this.max),
                    value2: undefined
                }
            }
        },
        onInternalValueUpdate() {
            if (this.isRange) {
                this.isThumbReversed = this.value1! > this.value2!
            }
            if (!this.lazy || !this.dragging) {
                this.emitValue('update:modelValue')
            }
            if (this.dragging) {
                this.emitValue('dragging')
            }
        },
        sliderSize() {
            return (this.$refs.slider as HTMLElement).getBoundingClientRect().width
        },
        onSliderClick(event: MouseEvent) {
            if (this.disabled || this.isTrackClickDisabled) return
            const sliderOffsetLeft = (this.$refs.slider as HTMLElement).getBoundingClientRect().left
            const percent = (event.clientX - sliderOffsetLeft) / this.sliderSize() * 100
            const targetValue = this.min + percent * (this.max - this.min) / 100
            const diffFirst = Math.abs(targetValue - this.value1!)
            if (!this.isRange) {
                if (diffFirst < this.step / 2) return
                (this.$refs.button1 as BSliderThumbInstance).setPosition(percent)
            } else {
                const diffSecond = Math.abs(targetValue - this.value2!)
                if (diffFirst <= diffSecond) {
                    if (diffFirst < this.step / 2) return
                    (this.$refs.button1 as BSliderThumbInstance).setPosition(percent)
                } else {
                    if (diffSecond < this.step / 2) return
                    (this.$refs.button2 as BSliderThumbInstance).setPosition(percent)
                }
            }
            this.emitValue('change')
        },
        onDragStart() {
            this.dragging = true
            this.$emit('dragstart')
        },
        onDragEnd() {
            this.isTrackClickDisabled = true
            this.timeOutID = setTimeout(() => {
                // avoid triggering onSliderClick after dragend
                this.isTrackClickDisabled = false
            }, 0)
            this.dragging = false
            this.$emit('dragend')
            if (this.lazy) {
                this.emitValue('update:modelValue')
            }
        },
        emitValue(type: 'change' | 'dragging' | 'update:modelValue') {
            const emittedValue: number | [number, number] = this.isRange
                ? [this.minValue, this.maxValue]
                : this.value1!
            switch (type) {
                case 'change':
                    this.$emit(type, emittedValue)
                    break
                case 'dragging':
                    this.$emit(type, emittedValue)
                    break
                case 'update:modelValue':
                    this.$emit(type, emittedValue)
                    break
                default: {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const _exhaustiveCheck: never = type
                }
            }
        }
    },
    created() {
        this.isThumbReversed = false
        this.isTrackClickDisabled = false
        this.setValues(this.modelValue)
    },

    beforeUnmount() {
        clearTimeout(this.timeOutID)
    }
})
</script>
