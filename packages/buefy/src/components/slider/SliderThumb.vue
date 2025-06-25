<template>
    <div
        class="b-slider-thumb-wrapper"
        :class="{ 'is-dragging': dragging, 'has-indicator': indicator}"
        :style="wrapperStyle"
        v-bind="rootAttrs"
    >
        <b-tooltip
            :label="formattedValue"
            :type="type"
            :always="dragging || isFocused || tooltipAlways"
            :active="!disabled && tooltip"
        >
            <div
                class="b-slider-thumb"
                :tabindex="disabled ? undefined : 0"
                v-bind="fallthroughAttrs"
                @mousedown="onButtonDown"
                @touchstart="onButtonDown"
                @focus="onFocus"
                @blur="onBlur"
                @keydown.left.prevent="onLeftKeyDown"
                @keydown.right.prevent="onRightKeyDown"
                @keydown.down.prevent="onLeftKeyDown"
                @keydown.up.prevent="onRightKeyDown"
                @keydown.home.prevent="onHomeKeyDown"
                @keydown.end.prevent="onEndKeyDown"
            >
                <span v-if="indicator">{{ formattedValue }}</span>
            </div>
        </b-tooltip>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

import BTooltip from '../tooltip/Tooltip.vue'
import config from '../../utils/config'
import CompatFallthroughMixin from '../../utils/CompatFallthroughMixin'

import { DISPLAY_FORMATS } from './types'
import type { CustomFormatter, DisplayFormat, ISlider } from './types'

export default defineComponent({
    name: 'BSliderThumb',
    components: {
        BTooltip
    },
    mixins: [CompatFallthroughMixin],
    props: {
        modelValue: {
            type: Number,
            default: 0
        },
        type: {
            type: String,
            default: ''
        },
        tooltip: {
            type: Boolean,
            default: true
        },
        indicator: {
            type: Boolean,
            default: false
        },
        customFormatter: Function as PropType<CustomFormatter>,
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
        dragend: () => true,
        dragstart: () => true,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        'update:modelValue': (_value: number) => true
    },
    data() {
        return {
            isFocused: false,
            dragging: false,
            startX: 0,
            startPosition: 0,
            newPosition: null as number | null,
            oldValue: this.modelValue
        }
    },
    computed: {
        parent() {
            return this.$parent as unknown as ISlider
        },
        disabled() {
            return this.parent.disabled
        },
        max() {
            return this.parent.max
        },
        min() {
            return this.parent.min
        },
        step() {
            return this.parent.step
        },
        precision() {
            return this.parent.precision
        },
        currentPosition() {
            return `${(this.modelValue - this.min) / (this.max - this.min) * 100}%`
        },
        wrapperStyle() {
            return { left: this.currentPosition }
        },
        formattedValue() {
            if (typeof this.customFormatter !== 'undefined') {
                return this.customFormatter(this.modelValue)
            }

            if (this.format === 'percent') {
                return new Intl.NumberFormat(
                    this.locale,
                    {
                        style: 'percent'
                    }
                ).format(((this.modelValue - this.min)) / (this.max - this.min))
            }

            return new Intl.NumberFormat(this.locale).format(this.modelValue)
        }
    },
    methods: {
        onFocus() {
            this.isFocused = true
        },
        onBlur() {
            this.isFocused = false
        },
        onButtonDown(event: MouseEvent | TouchEvent) {
            if (this.disabled) return
            event.preventDefault()
            this.onDragStart(event)
            if (typeof window !== 'undefined') {
                document.addEventListener('mousemove', this.onDragging)
                document.addEventListener('touchmove', this.onDragging)
                document.addEventListener('mouseup', this.onDragEnd)
                document.addEventListener('touchend', this.onDragEnd)
                document.addEventListener('contextmenu', this.onDragEnd)
            }
        },
        onLeftKeyDown() {
            if (this.disabled || this.modelValue === this.min) return
            this.newPosition = parseFloat(this.currentPosition) -
                this.step / (this.max - this.min) * 100
            this.setPosition(this.newPosition)
            this.parent.emitValue('change')
        },
        onRightKeyDown() {
            if (this.disabled || this.modelValue === this.max) return
            this.newPosition = parseFloat(this.currentPosition) +
                this.step / (this.max - this.min) * 100
            this.setPosition(this.newPosition)
            this.parent.emitValue('change')
        },
        onHomeKeyDown() {
            if (this.disabled || this.modelValue === this.min) return
            this.newPosition = 0
            this.setPosition(this.newPosition)
            this.parent.emitValue('change')
        },
        onEndKeyDown() {
            if (this.disabled || this.modelValue === this.max) return
            this.newPosition = 100
            this.setPosition(this.newPosition)
            this.parent.emitValue('change')
        },
        onDragStart(event: MouseEvent | TouchEvent) {
            this.dragging = true
            this.$emit('dragstart')
            this.startX = event.type === 'touchstart'
                ? (event as TouchEvent).touches[0].clientX
                : (event as MouseEvent).clientX
            this.startPosition = parseFloat(this.currentPosition)
            this.newPosition = this.startPosition
        },
        onDragging(event: MouseEvent | TouchEvent) {
            if (this.dragging) {
                const clientX = event.type === 'touchmove'
                    ? (event as TouchEvent).touches[0].clientX
                    : (event as MouseEvent).clientX
                const diff = (clientX - this.startX) / this.parent.sliderSize() * 100
                this.newPosition = this.startPosition + diff
                this.setPosition(this.newPosition)
            }
        },
        onDragEnd() {
            this.dragging = false
            this.$emit('dragend')
            if (this.modelValue !== this.oldValue) {
                this.parent.emitValue('change')
            }
            this.setPosition(this.newPosition)
            if (typeof window !== 'undefined') {
                document.removeEventListener('mousemove', this.onDragging)
                document.removeEventListener('touchmove', this.onDragging)
                document.removeEventListener('mouseup', this.onDragEnd)
                document.removeEventListener('touchend', this.onDragEnd)
                document.removeEventListener('contextmenu', this.onDragEnd)
            }
        },
        setPosition(percent: number | null) {
            if (percent === null || isNaN(percent)) return
            if (percent < 0) {
                percent = 0
            } else if (percent > 100) {
                percent = 100
            }
            const stepLength = 100 / ((this.max - this.min) / this.step)
            const steps = Math.round(percent / stepLength)
            let value = steps * stepLength / 100 * (this.max - this.min) + this.min
            value = parseFloat(value.toFixed(this.precision))
            this.$emit('update:modelValue', value)
            if (!this.dragging && value !== this.oldValue) {
                this.oldValue = value
            }
        }
    },

    beforeUnmount() {
        document.removeEventListener('mousemove', this.onDragging)
        document.removeEventListener('touchmove', this.onDragging)
        document.removeEventListener('mouseup', this.onDragEnd)
        document.removeEventListener('touchend', this.onDragEnd)
        document.removeEventListener('contextmenu', this.onDragEnd)
    }
})
</script>
