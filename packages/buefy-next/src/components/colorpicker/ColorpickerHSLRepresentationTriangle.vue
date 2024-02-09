<template>
    <svg :viewBox="viewBox" class="b-colorpicker-triangle">
        <defs>
            <linearGradient
                :id="`cp-triangle-gradient-ligthness-${id}`"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
            >
                <stop offset="0%" stop-color="#fff" />
                <stop offset="100%" stop-color="#000" />
            </linearGradient>
            <linearGradient
                :id="`cp-triangle-gradient-saturation-${id}`"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
            >
                <stop
                    offset="0%"
                    :stop-color="`hsl(${hue}deg, 100%, 50%)`"
                    stop-opacity="1"
                />
                <stop
                    offset="100%"
                    :stop-color="`hsl(${hue}deg, 100%, 50%)`"
                    stop-opacity="0"
                />
            </linearGradient>
            <clipPath :id="`cp-triangle-clip-${id}`">
                <path :d="haloPath" />
            </clipPath>
        </defs>
        <g class="colorpicker-triangle-slider-hue">
            <foreignObject
                :x="0"
                :y="0"
                :width="size"
                :height="size"
                :clip-path="`url(#cp-triangle-clip-${id})`"
            >
                <div
                    class="colorpicker-triangle-hue"
                    @click="clickHue"
                    @mousedown.prevent="startMouseCapture"
                    @touchstart.prevent="startMouseCapture"
                />
            </foreignObject>
            <g :style="`transform: rotate(${hue}deg)`">
                <foreignObject
                    :x="size / 2 - 4"
                    :y="0"
                    width="8"
                    :height="thickness + 4"
                >
                    <div
                        ref="hueCursor"
                        class="hue-range-thumb"
                        :style="`background-color: hsl(${hue}deg, 100%, 50%)`"
                        role="slider"
                        tabindex="0"
                        aria-label="Hue"
                        aria-valuemin="0"
                        :aria-valuenow="hue"
                        aria-valuemax="360"
                        @click="clickHue"
                        @keydown="hueKeyPress"
                        @mousedown.prevent="startMouseCapture"
                        @touchstart.prevent="startMouseCapture"
                    />
                </foreignObject>
            </g>
        </g>
        <g
            class="colorpicker-triangle-slider-sl"
            :style="`transform: rotate(${hue}deg) translate(50%, 50%)`"
            role="graphics-datagroup"
            aria-datascales="lightness, saturation"
        >
            <path
                :d="trianglePath"
                :fill="`url(#cp-triangle-gradient-ligthness-${id})`"
            />
            <path
                :d="trianglePath"
                :fill="`url(#cp-triangle-gradient-saturation-${id})`"
                style="mix-blend-mode: overlay;"
                @click="clickSL"
                @mousedown.prevent="startMouseCapture"
                @touchstart.prevent="startMouseCapture"
            />
            <foreignObject
                :x="((internalRadius - 3) * cos30) * (-lightness + 0.5) * 2 - 6"
                :y="-internalRadius + (1 - saturation) * (internalRadius - 3) * 1.5 - 3"
                width="12"
                height="12"
            >
                <div
                    ref="slCursor"
                    class="sl-range-thumb"
                    :style="{
                        backgroundColor: `hsl(${hue}deg, ${saturation * 100}%, ${lightness * 100}%)`
                    }"
                    tabindex="0"
                    :aria-datavalues="`${saturation * 100}%, ${lightness * 100}%`"
                    @click="clickSL"
                    @keydown="slKeyPress"
                    @mousedown.prevent="startMouseCapture"
                    @touchstart.prevent="startMouseCapture"
                />
            </foreignObject>
        </g>
    </svg>
</template>

<script>
import Color from '../../utils/color'
const cos30 = 0.86602540378
const sin30 = 0.5

let id = 0

export default {
    name: 'BColorpickerHSLRepresentationTriangle',
    props: {
        value: {
            type: Object,
            required: true,
            validator(value) {
                return typeof value.hue === 'number' &&
                    typeof value.saturation === 'number' &&
                    typeof value.lightness === 'number'
            }
        },
        size: {
            type: Number,
            default: 200
        },
        thickness: {
            type: Number,
            default: 20
        }
    },
    emits: ['input'],
    data() {
        return {
            id: id++,
            hue: this.value.hue,
            saturation: this.value.saturation,
            lightness: this.value.lightness,
            captureMouse: false,
            captureType: 'hue',
            clientOffset: {
                cx: -1,
                cy: -1,
                width: 0,
                height: 0
            },
            cos30,
            sin30,
            debounce: 0
        }
    },
    computed: {
        viewBox() {
            const { size } = this
            return `0 0 ${size} ${size}`
        },
        internalRadius() {
            return this.size / 2 - this.thickness
        },
        haloPath() {
            const { size, thickness } = this
            const radius = size / 2 - 2 // 2px padding
            const thicknessRadius = radius - thickness
            const center = size / 2

            return `M${center - radius} ${center}a${radius}  ${radius}  0 1 1 ${2 * radius} 0` +
                `h${-thickness}` +
                `a${-thicknessRadius}  ${thicknessRadius}  0 1 0 ${-2 * thicknessRadius} 0` +
                `a${thicknessRadius}  ${thicknessRadius}  0 1 0 ${2 * thicknessRadius} 0` +
                `h${thickness}` +
                `a${radius}  ${radius}  0 1 1 ${-2 * radius} 0z`
        },
        trianglePath() {
            const { size, thickness } = this
            const radius = size - 4
            const thicknessRadius = (radius - 2 * thickness) / 2

            return `M0 ${-thicknessRadius}` +
                `L${cos30 * thicknessRadius} ${sin30 * thicknessRadius}` +
                `H${-cos30 * thicknessRadius}z`
        }
    },
    watch: {
        captureMouse(newValue, oldValue) {
            if (oldValue === false && newValue !== false) {
                const rect = this.$el.getBoundingClientRect()
                // Caching offset
                this.clientOffset.cx = rect.x + rect.width / 2
                this.clientOffset.cy = rect.y + rect.height / 2
                this.clientOffset.width = rect.width
                this.clientOffset.height = rect.height
            }
        },
        value: {
            deep: true,
            handler(newColor) {
                const { hue, saturation, lightness } = newColor

                window.clearTimeout(this.debounce)
                this.debounce = window.setTimeout(() => {
                    if (lightness >= 0.03 && lightness <= 0.97 && saturation > 0) {
                        this.hue = hue
                    }
                    this.saturation = saturation
                    this.lightness = lightness
                }, 200)
            }
        }
    },
    methods: {
        increaseHue(value = 1) {
            this.hue = (this.hue + value) % 360
        },
        decreaseHue(value = 1) {
            this.hue = (360 + this.hue - value) % 360
        },
        increaseSaturation(value = 0.01) {
            this.saturation = Math.min(1, Math.max(0, this.saturation + value))
            this.lightness = Math.min(
                0.5 + (1 - this.saturation) * 0.5,
                Math.max(
                    0.5 - (1 - this.saturation) * 0.5,
                    this.lightness
                )
            )
        },
        decreaseSaturation(value = 0.01) {
            this.saturation = Math.min(1, Math.max(0, this.saturation - value))
            this.lightness = Math.min(
                0.5 + (1 - this.saturation) * 0.5,
                Math.max(
                    0.5 - (1 - this.saturation) * 0.5,
                    this.lightness
                )
            )
        },
        increaseLightness(value = 0.01) {
            this.lightness = Math.min(
                0.5 + (1 - this.saturation) * 0.5,
                Math.max(
                    0.5 - (1 - this.saturation) * 0.5,
                    this.lightness + value
                )
            )
        },
        decreaseLightness(value = 0.01) {
            this.lightness = Math.min(
                0.5 + (1 - this.saturation) * 0.5,
                Math.max(
                    0.5 - (1 - this.saturation) * 0.5,
                    this.lightness - value
                )
            )
        },
        hueKeyPress(event) {
            let handled = false
            switch (event.key) {
                case 'ArrowRight':
                case 'ArrowUp':
                    this.increaseHue()
                    handled = true
                    break
                case 'ArrowLeft':
                case 'ArrowDown':
                    this.decreaseHue()
                    handled = true
                    break
                case 'Home':
                    this.increaseHue(360 - this.hue)
                    handled = true
                    break
                case 'End':
                    this.decreaseHue(this.hue)
                    handled = true
                    break
                case 'PageUp':
                    this.increaseHue(60 - this.hue % 60)
                    handled = true
                    break
                case 'PageDown':
                    this.decreaseHue(60 + this.hue % 60)
                    handled = true
                    break
            }
            if (handled) {
                event.preventDefault()
                event.stopPropagation()
                this.emitColor()
            }
        },
        slKeyPress(event) {
            let handled = false
            switch (event.key) {
                case 'ArrowRight':
                    this.decreaseLightness()
                    handled = true
                    break
                case 'ArrowUp':
                    this.increaseSaturation()
                    handled = true
                    break
                case 'ArrowLeft':
                    this.increaseLightness()
                    handled = true
                    break
                case 'ArrowDown':
                    this.decreaseSaturation()
                    handled = true
                    break
                case 'Home':
                    this.increaseLightness(1 - this.lightness)
                    handled = true
                    break
                case 'End':
                    this.decreaseLightness(this.lightness)
                    handled = true
                    break
                case 'PageUp':
                    this.increaseSaturation(1 - this.saturation)
                    handled = true
                    break
                case 'PageDown':
                    this.decreaseSaturation(this.saturation)
                    handled = true
                    break
            }
            if (handled) {
                event.preventDefault()
                event.stopPropagation()
                this.emitColor()
            }
        },
        clickHue(event) {
            this.startMouseCapture(event)
            this.trackMouse(event)
            this.stopMouseCapture(event)
            this.$refs.hueCursor.focus()
        },
        clickSL(event) {
            this.startMouseCapture(event)
            this.trackMouse(event)
            this.stopMouseCapture(event)
            this.$refs.slCursor.focus()
        },
        trackMouse(event) {
            if (this.captureMouse === false) {
                return
            }
            event.preventDefault()
            event.stopPropagation()

            let [mouseX, mouseY] = [0, 0]
            if (typeof event.touches !== 'undefined' && event.touches.length) {
                [mouseX, mouseY] = [event.touches[0].clientX, event.touches[0].clientY]
            } else {
                [mouseX, mouseY] = [event.clientX, event.clientY]
            }
            const angle = Math.atan2(
                mouseY - this.clientOffset.cy,
                mouseX - this.clientOffset.cx
            )

            if (this.captureType === 'sl') {
                const d = Math.sqrt(
                    Math.pow(mouseX - this.clientOffset.cx, 2) +
                    Math.pow(mouseY - this.clientOffset.cy, 2)
                )
                const ratio = this.size / this.clientOffset.width
                const dx = d * Math.cos(angle - this.hue / 180 * Math.PI) * ratio
                const dy = d * Math.sin(angle - this.hue / 180 * Math.PI) * ratio
                const radius = this.internalRadius
                const saturation = 1 - (Math.min(
                    radius * sin30,
                    Math.max(
                        -radius,
                        dy
                    )
                ) + radius) / (radius + radius * sin30)
                const lightness = (Math.min(
                    (radius * cos30) * (1 - saturation),
                    Math.max(
                        (-radius * cos30) * (1 - saturation),
                        dx
                    )
                ) + radius * cos30) / (radius * 2 * cos30)

                this.saturation = Math.round(saturation * 1000) / 1000
                this.lightness = 1 - Math.round(lightness * 1000) / 1000
            } else {
                this.hue = Math.round(angle / Math.PI * 180 + 90) % 360
            }
            this.emitColor()
        },
        startMouseCapture(event) {
            event.stopPropagation()

            this.captureMouse = true
            if (event.target.closest('.colorpicker-triangle-slider-sl') !== null) {
                this.captureType = 'sl'
            } else {
                this.captureType = 'hue'
            }
        },
        stopMouseCapture(event) {
            if (this.captureMouse !== false) {
                event.preventDefault()
                event.stopPropagation()
                this.$refs[this.captureType === 'sl' ? 'slCursor' : 'hueCursor'].focus()
            }
            this.captureMouse = false
        },
        emitColor() {
            const { hue, saturation, lightness } = this
            this.$emit('input', Color.fromHSL(hue, saturation, lightness))
            window.clearTimeout(this.debounce)
        }
    },
    mounted() {
        window.addEventListener('mousemove', this.trackMouse)
        window.addEventListener('touchmove', this.trackMouse, { passive: false })
        window.addEventListener('mouseup', this.stopMouseCapture)
        window.addEventListener('touchend', this.stopMouseCapture)
    },
    beforeUnmount() {
        window.removeEventListener('mousemove', this.trackMouse)
        window.removeEventListener('touchmove', this.trackMouse)
        window.removeEventListener('mouseup', this.stopMouseCapture)
        window.removeEventListener('touchend', this.stopMouseCapture)

        clearTimeout(this.debounce)
    }
}
</script>
