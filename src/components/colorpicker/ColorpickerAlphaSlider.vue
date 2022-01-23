<template>
    <div
        class="b-colorpicker-alpha-slider"
        :style="style"
        @click="clickAlpha"
        @keydown="alphaKeyPress"
        @mousedown="startMouseCapture"
        @touchstart.prevent="startMouseCapture"
    >
        <div
            ref="alphaCursor"
            role="slider"
            class="alpha-range-thumb"
            tabindex="0"
            aria-label="Tranparency"
            aria-valuemin="0"
            :aria-valuenow="percent"
            aria-valuemax="100"
            :style="{ left: `${percent}%` }"
        >
            <b-tooltip :label="`${percent}%`" :always="captureMouse">
                &nbsp;
            </b-tooltip>
        </div>
    </div>
</template>

<script>
import Color from '../../utils/color'

export default {
    name: 'BColorpickerAlphaSlider',
    props: {
        value: {
            type: Number,
            validator: (value) => value >= 0 && value < 256
        },
        color: [String, Object]
    },
    data() {
        const color = Color.parse(this.color)

        color.alpha = 0
        return {
            startColor: color.toString('hex'),
            endColor: color.toString('hexa'),
            percent: Math.round((1 - this.value / 255) * 100),
            captureMouse: false,
            clientOffset: {
                cx: -1,
                cy: -1,
                width: 0,
                height: 0
            }
        }
    },
    computed: {
        style() {
            return {
                backgroundImage:
                    `linear-gradient(90deg, ${this.startColor} 0%, ${this.endColor} 100%),
                    linear-gradient(45deg, #c7c7c7 25%, transparent 25%, transparent 75%, #c7c7c7 75%, #c7c7c7),
                    linear-gradient(45deg, #c7c7c7 25%, transparent 25%, transparent 75%, #c7c7c7 75%, #c7c7c7)`,
                backgroundSize: '100% 100%, 1em 1em, 1em 1em',
                backgroundPosition: '0 0, .5em .5em, 0 0'
            }
        }
    },
    watch: {
        value(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.percent = Math.round((1 - newValue / 255) * 100)
            }
        },
        color(newColor) {
            const color = Color.parse(newColor)

            color.alpha = 0
            this.startColor = color.toString('hex')
            this.endColor = color.toString('hexa')
        },
        captureMouse(newValue, oldValue) {
            if (oldValue === false && newValue !== false) {
                const rect = this.$el.getBoundingClientRect()
                // Caching offset
                this.clientOffset.cx = rect.x + rect.width / 2
                this.clientOffset.cy = rect.y + rect.height / 2
                this.clientOffset.width = rect.width
                this.clientOffset.height = rect.height
            }
        }
    },
    methods: {
        alphaKeyPress(event) {
            //
        },
        clickAlpha(event) {
            this.startMouseCapture(event)
            this.trackMouse(event)
            this.stopMouseCapture(event)
            this.$refs.alphaCursor.focus()
        },
        startMouseCapture(event) {
            event.stopPropagation()

            this.captureMouse = true
        },
        trackMouse(event) {
            if (this.captureMouse === false) {
                return
            }
            event.preventDefault()
            event.stopPropagation()

            let [mouseX] = [0, 0]
            if (typeof event.touches !== 'undefined' && event.touches.length) {
                [mouseX] = [event.touches[0].clientX]
            } else {
                [mouseX] = [event.clientX]
            }

            const ratio = 0.5 + (this.clientOffset.cx - mouseX) / this.clientOffset.width
            this.percent = Math.round(100 - Math.max(0, Math.min(1, ratio)) * 100)
            this.emitAlpha()
        },
        stopMouseCapture(event) {
            if (this.captureMouse !== false) {
                event.preventDefault()
                event.stopPropagation()
                this.$refs.alphaCursor.focus()
            }
            this.captureMouse = false
        },
        emitAlpha() {
            this.$emit('input', (1 - this.percent / 100) * 255)
        }
    },
    mounted() {
        window.addEventListener('mousemove', this.trackMouse)
        window.addEventListener('touchmove', this.trackMouse, { passive: false })
        window.addEventListener('mouseup', this.stopMouseCapture)
        window.addEventListener('touchend', this.stopMouseCapture)
    },
    beforeDestroy() {
        window.removeEventListener('mousemove', this.trackMouse)
        window.removeEventListener('touchmove', this.trackMouse)
        window.removeEventListener('mouseup', this.stopMouseCapture)
        window.removeEventListener('touchend', this.stopMouseCapture)
    }
}
</script>
