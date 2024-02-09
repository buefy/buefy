<template>
    <div class="b-colorpicker-square" :style="{ width: `${size}px` }">
        <div
            class="colorpicker-square-slider-hue"
            @click="clickHue"
            @mousedown.prevent="startMouseCapture"
            @touchstart.prevent="startMouseCapture"
        >
            <div
                ref="hueCursor"
                role="slider"
                class="hue-range-thumb"
                tabindex="0"
                aria-label="Hue"
                aria-valuemin="0"
                aria-valuemax="359"
                :style="hueThumbStyle"
            />
        </div>
        <div
            class="colorpicker-square-slider-sl"
            :style="{
                background: SLBackground,
                margin: `${thickness}px`
            }"
            aria-datascales="lightness, saturation"
            @click="clickSL"
            @mousedown.prevent="startMouseCapture"
            @touchstart.prevent="startMouseCapture"
        >
            <div
                ref="slCursor"
                role="slider"
                class="sl-range-thumb"
                tabindex="0"
                :aria-datavalues="`${saturation * 100}%, ${lightness * 100}%`"
                :style="slThumbStyle"
                @click="clickSL"
                @keydown="slKeyPress"
                @mousedown.prevent="startMouseCapture"
                @touchstart.prevent="startMouseCapture"
            />
        </div>
    </div>
</template>

<script>
import Color from '../../utils/color'
const precision = (strs, ...values) => {
    const tmp = []
    strs.forEach((str, i) => {
        tmp.push(str)

        if (values[i]) {
            tmp.push(
                Number.isNaN(values[i] / 1)
                    ? values[i]
                    : Math.round(values * 10) / 10
            )
        }
    })

    return tmp.join('')
}

export default {
    name: 'BColorpickerHSLRepresentationSquare',
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
            debounce: 0
        }
    },
    computed: {
        hueThumbStyle() {
            const { hue, size, thickness } = this
            const side = size - thickness
            const offset = size / 2
            const angle = ((hue + 720 + 90) % 360) / 180 * Math.PI
            const ciq = 1 / Math.cos(Math.PI / 4)
            const { x, y } = {
                x: -Math.min(1, Math.max(-1, ciq * Math.cos(angle))) / 2 * side + offset,
                y: -Math.min(1, Math.max(-1, ciq * Math.sin(angle))) / 2 * side + offset
            }
            return {
                background: `hsl(${hue}deg, 100%, 50%)`,
                left: precision`${x}px`,
                top: precision`${y}px`,
                width: precision`${thickness - 2}px`
            }
        },
        slThumbStyle() {
            let { hue, saturation, lightness } = this
            saturation = Math.max(0, Math.min(1, saturation))
            lightness = Math.max(0, Math.min(1, lightness))
            return {
                background: `hsl(${hue}deg, ${saturation * 100}%, ${lightness * 100}%)`,
                left: `${saturation * 100}%`,
                top: `${(1 - lightness) * 100}%`
            }
        },
        SLBackground() {
            const { hue } = this
            return `linear-gradient(90deg, hsl(${hue}deg, 0%, 50%), hsl(${hue}deg, 100%, 50%))`
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
                    this.hue = hue
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
                    this.increaseSaturation()
                    handled = true
                    break
                case 'ArrowUp':
                    this.increaseLightness()
                    handled = true
                    break
                case 'ArrowLeft':
                    this.decreaseSaturation()
                    handled = true
                    break
                case 'ArrowDown':
                    this.decreaseLightness()
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
        startMouseCapture(event) {
            event.stopPropagation()

            this.captureMouse = true
            if (event.target.closest('.colorpicker-square-slider-sl') !== null) {
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
                const saturation = (mouseX - this.clientOffset.cx) /
                    (this.clientOffset.width - this.thickness * 2) +
                    0.5
                const lightness = (mouseY - this.clientOffset.cy) /
                    (this.clientOffset.height - this.thickness * 2) +
                    0.5

                this.saturation = Math.round(Math.min(1, Math.max(0, saturation)) * 1000) / 1000
                this.lightness = 1 - Math.round(Math.min(1, Math.max(0, lightness)) * 1000) / 1000
            } else {
                this.hue = Math.round(angle / Math.PI * 180 + 90) % 360
            }
            this.emitColor()
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
