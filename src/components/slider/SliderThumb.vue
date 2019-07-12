<template>
    <div
        class="b-slider-thumb-wrapper"
        :class="{ 'is-hovered': hovering, 'is-dragging': dragging }"
        :style="wrapperStyle">
        <b-tooltip
            :label="value.toString()"
            :type="type"
            :always="dragging"
            :active="showTooltip">
            <div
                class="b-slider-thumb"
                @mouseenter="handleMouseEnter"
                @mouseleave="handleMouseLeave"
                @mousedown="onButtonDown"
                @touchstart="onButtonDown"
                tabindex="0"
                @focus="handleMouseEnter"
                @blur="handleMouseLeave"
                @keydown.left.prevent="onLeftKeyDown"
                @keydown.right.prevent="onRightKeyDown"
                @keydown.down.prevent="onLeftKeyDown"
                @keydown.up.prevent="onRightKeyDown" />
        </b-tooltip>
    </div>
</template>

<script>
import Tooltip from '../tooltip/Tooltip'
export default {
    name: 'BSliderThumb',
    components: {
        [Tooltip.name]: Tooltip
    },
    props: {
        value: {
            type: Number,
            default: 0
        },
        type: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            hovering: false,
            dragging: false,
            startX: 0,
            startPosition: 0,
            newPosition: null,
            oldValue: this.value
        }
    },
    computed: {
        disabled() {
            return this.$parent.disabled
        },
        max() {
            return this.$parent.max
        },
        min() {
            return this.$parent.min
        },
        step() {
            return this.$parent.step
        },
        showTooltip() {
            return this.$parent.showTooltip
        },
        precision() {
            return this.$parent.precision
        },
        currentPosition() {
            return `${(this.value - this.min) / (this.max - this.min) * 100}%`
        },
        wrapperStyle() {
            return { left: this.currentPosition }
        }
    },
    watch: {
        dragging(val) {
            this.$parent.dragging = val
        }
    },
    methods: {
        handleMouseEnter() {
            this.hovering = true
        },
        handleMouseLeave() {
            this.hovering = false
        },
        onButtonDown(event) {
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
            if (this.disabled || this.value === this.min) return
            this.newPosition = parseFloat(this.currentPosition) -
                this.step / (this.max - this.min) * 100
            this.setPosition(this.newPosition)
            this.$parent.emitChange()
        },
        onRightKeyDown() {
            if (this.disabled || this.value === this.max) return
            this.newPosition = parseFloat(this.currentPosition) +
                this.step / (this.max - this.min) * 100
            this.setPosition(this.newPosition)
            this.$parent.emitChange()
        },
        onDragStart(event) {
            this.dragging = true
            if (event.type === 'touchstart') {
                event.clientX = event.touches[0].clientX
            }
            this.startX = event.clientX
            this.startPosition = parseFloat(this.currentPosition)
            this.newPosition = this.startPosition
        },
        onDragging(event) {
            if (this.dragging) {
                if (event.type === 'touchmove') {
                    event.clientX = event.touches[0].clientX
                }
                const diff = (event.clientX - this.startX) / this.$parent.sliderSize * 100
                this.newPosition = this.startPosition + diff
                this.setPosition(this.newPosition)
            }
        },
        onDragEnd() {
            if (this.value !== this.oldValue) {
                this.$parent.emitChange()
            }
            setTimeout(() => {
                // defer to prevent triggering click on the track
                this.dragging = false
                this.setPosition(this.newPosition)
            })
            if (typeof window !== 'undefined') {
                document.removeEventListener('mousemove', this.onDragging)
                document.removeEventListener('touchmove', this.onDragging)
                document.removeEventListener('mouseup', this.onDragEnd)
                document.removeEventListener('touchend', this.onDragEnd)
                document.removeEventListener('contextmenu', this.onDragEnd)
            }
        },
        setPosition(percent) {
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
            this.$emit('input', value)
            if (!this.dragging && value !== this.oldValue) {
                this.oldValue = value
            }
        }
    }
}
</script>
