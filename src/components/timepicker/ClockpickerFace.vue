<template>
    <div
        class="clock-picker-face"
        @mousedown="onMouseDown"
        @mouseup="onMouseUp"
        @mousemove="onDragMove"
        @touchstart="onMouseDown"
        @touchend="onMouseUp"
        @touchmove="onDragMove">
        <div
            class="clock-picker-face__outer_ring"
            ref="clock">
            <div
                class="clock-picker-face__hand"
                :style="{ transform: `rotate(${handRotateAngle}deg) scaleY(${handScale})` }" />
            <span
                v-for="num of faceNumbers"
                :key="num.value"
                class="clock-picker-face__number"
                :class="{ 'active': num.value === displayedValue }"
                :style="{ transform: getNumberTranslate(num.value) }">
                <span>{{ num.label }}</span>
            </span>

        </div>
    </div>
</template>

<script>
// These should match the variables in clockpicker.scss
const indicatorSize = 40
const paddingInner = 5

export default {
    name: 'BClockpickerFace',
    props: {
        pickerSize: Number,
        min: Number,
        max: Number,
        double: Boolean,
        value: Number,
        faceNumbers: Array,
        disabledValues: Function
    },
    data() {
        return {
            isDragging: false,
            inputValue: null
        }
    },
    computed: {
        /**
         * How many number indicators are shown on the face
         */
        count() {
            return this.max - this.min + 1
        },
        /**
         * How many number indicators are shown per ring on the face
         */
        countPerRing() {
            return this.double ? (this.count / 2) : this.count
        },
        /**
         * Radius of the clock face
         */
        radius() {
            return this.pickerSize / 2 -
                paddingInner -
                indicatorSize // -6 for padding
        },
        /**
         * Radius of the outer ring of number indicators
         */
        outerRadius() {
            return this.radius
            // half the indicator size, plus 6 for padding
        },
        /**
         * Radius of the inner ring of number indicators
         */
        innerRadius() {
            return Math.max(this.radius * 0.6, this.radius - paddingInner - indicatorSize)
            // 48px gives enough room for the outer ring of numbers
        },
        /**
         * The angle for each selectable value
         * For hours this ends up being 30 degrees, for minutes 6 degrees
         */
        degreesPerUnit() {
            return 360 / this.countPerRing
        },
        /**
         * Used for calculating x/y grid location based on degrees
         */
        degrees() {
            return this.degreesPerUnit * Math.PI / 180
        },
        /**
         * Calculates the angle the clock hand should be rotated for the
         * selected value
         */
        handRotateAngle() {
            return this.degreesPerUnit * (this.displayedValue - this.min)
        },
        /**
         * Determines how long the selector hand is based on if the
         * selected value is located along the outer or inner ring
         */
        handScale() {
            return this.calcHandScale(this.displayedValue)
        },
        /**
         * The value the hand should be pointing at
         */
        displayedValue() {
            return this.inputValue == null ? this.min : this.inputValue
        }
    },
    watch: {
        value(value) {
            this.inputValue = value
        }
    },
    methods: {
        isDisabled(value) {
            return this.disabledValues && this.disabledValues(value)
        },
        /**
         * Calculates the distance between two points
         */
        euclidean(p0, p1) {
            const dx = p1.x - p0.x
            const dy = p1.y - p0.y

            return Math.sqrt(dx * dx + dy * dy)
        },
        /**
         * Calculates the angle of the line from the center point
         * to the given point.
         */
        coordToAngle(center, p1) {
            const value = 2 *
                Math.atan2(p1.y - center.y - this.euclidean(center, p1), p1.x - center.x)
            return Math.abs(value * 180 / Math.PI)
        },
        /**
         * Generates the inline style translate() property for a
         * number indicator, which determines it's location on the
         * clock face
         */
        getNumberTranslate(value) {
            const { x, y } = this.getNumberCoords(value)
            return `translate(${x}px, ${y}px)`
        },
        /***
         * Calculates the coordinates on the clock face for a number
         * indicator value
         */
        getNumberCoords(value) {
            const radius = this.isInnerRing(value) ? this.innerRadius : this.outerRadius
            return {
                x: Math.round(radius * Math.sin((value - this.min) * this.degrees)),
                y: Math.round(-radius * Math.cos((value - this.min) * this.degrees))
            }
        },
        /**
         * Determines if a value resides on the inner ring
         */
        isInnerRing(value) {
            return this.double && (value - this.min >= this.countPerRing)
        },
        calcHandScale(value) {
            return this.isInnerRing(value)
                ? ((this.innerRadius) / this.radius)
                : 1
        },
        onMouseDown(e) {
            e.preventDefault()
            this.isDragging = true
            this.onDragMove(e)
        },
        onMouseUp() {
            this.isDragging = false
            // console.log('onMouseUp: ', this.isDisabled(this.inputValue))
            if (!this.isDisabled(this.inputValue)) {
                this.$emit('change', this.inputValue)
            }
        },
        onDragMove(e) {
            e.preventDefault()
            if (!this.isDragging && e.type !== 'click') return

            const { width, top, left } = this.$refs.clock.getBoundingClientRect()
            const { clientX, clientY } = 'touches' in e ? e.touches[0] : e
            const center = { x: width / 2, y: -width / 2 }
            const coords = { x: clientX - left, y: top - clientY }
            const handAngle = Math.round(this.coordToAngle(center, coords)) % 360
            const insideClick = this.double && this.euclidean(center, coords) <
                (this.outerRadius + this.innerRadius) / 2 - 16

            let value = Math.round(handAngle / this.degreesPerUnit) +
                this.min +
                (insideClick ? this.countPerRing : 0)

            // Necessary to fix edge case when selecting left part of max value
            if (handAngle >= (360 - this.degreesPerUnit / 2)) {
                value = insideClick ? this.max : this.min
            }
            this.update(value)
        },
        update(value) {
            if (this.inputValue !== value && !this.isDisabled(value)) {
                this.inputValue = value
                this.$emit('input', this.inputValue)
            }
        }
    }
}
</script>

<style>

</style>
