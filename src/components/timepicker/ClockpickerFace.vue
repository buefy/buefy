<template>
    <div
        class="clock-picker-clock__container"
        :style="{ width: pickerSize + 'px', height: pickerSize + 'px' }">
        <div
            class="clock-picker-clock"
            ref="clock"
            @mousedown="onMouseDown"
            @mouseup="onMouseUp"
            @mousemove="onDragMove"
            @touchstart="onMouseDown"
            @touchend="onMouseUp"
            @touchmove="onDragMove">
            <div
                class="clock-picker-clock__hand"
                :style="{ transform: `rotate(${handRotateAngle}deg) scaleY(${handScale})` }" />
            <span
                v-for="num of faceNumbers"
                :key="num.value"
                :style="{ transform: getNumberTranslate(num.value) }"
                :class="{ 'active': num.value === displayedValue }">
                <span>{{ num.label }}</span>
            </span>
        </div>
    </div>
</template>

<script>
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
        count() {
            return this.max - this.min + 1 // this.max - this.min + 1
        },
        countPerRing() {
            return this.double ? (this.count / 2) : this.count
        },
        /**
         * Radius of the clock face
         */
        radius() {
            return this.pickerSize / 2
        },
        /**
         * Radius of the inner ring numbers
         */
        innerRadius() {
            return this.radius - Math.max(this.radius * 0.45, 10)
            // 48px gives enough room for the outer ring of numbers
        },
        /**
         * Radius of the outer ring numbers
         */
        outerRadius() {
            return this.radius - 18 // 4px allows for the border
        },
        degreesPerUnit() {
            return 360 / this.countPerRing
        },
        degrees() {
            return this.degreesPerUnit * Math.PI / 180
        },
        handRotateAngle() {
            return this.degreesPerUnit * (this.displayedValue - this.min)
        },
        /**
         * Determines how long the selector hand is based on if the value
         * is in the outer ring or inner ring.
         */
        handScale() {
            return this.calcHandScale(this.displayedValue)
        },
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
        euclidean(p0, p1) {
            const dx = p1.x - p0.x
            const dy = p1.y - p0.y

            return Math.sqrt(dx * dx + dy * dy)
        },
        coordToAngle(center, p1) {
            const value = 2 *
                Math.atan2(p1.y - center.y - this.euclidean(center, p1), p1.x - center.x)
            return Math.abs(value * 180 / Math.PI)
        },
        getNumberTranslate(value) {
            const { x, y } = this.getNumberCoords(value)
            return `translate(${x}px, ${y}px)`
        },
        getNumberCoords(value) {
            const radius = (this.radius - 24) * this.calcHandScale(value)
            return {
                x: Math.round(radius * Math.sin((value - this.min) * this.degrees)),
                y: Math.round(-radius * Math.cos((value - this.min) * this.degrees))
            }
        },
        calcHandScale(value) {
            return this.double && (value - this.min >= this.countPerRing)
                ? (this.innerRadius / this.radius)
                : (this.outerRadius / this.radius)
        },
        onMouseDown(e) {
            e.preventDefault()
            this.isDragging = true
            this.onDragMove(e)
        },
        onMouseUp() {
            this.isDragging = false
            console.log('onMouseUp: ', this.isDisabled(this.inputValue))
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

            let debugValues = {
                width,
                center,
                coords,
                handAngle,
                insideClick,
                value
            }
            console.log(debugValues)

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
