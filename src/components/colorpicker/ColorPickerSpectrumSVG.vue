<template>
    <svg :viewBox="viewBox" class="colorpicker-spectrum">
        <defs>
            <linearGradient
                :id="`cp-spectrum-gradient-ligthness-${id}`"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
            >
                <stop offset="0%" stop-color="#fff"/>
                <stop offset="100%" stop-color="#000"/>
            </linearGradient>
            <linearGradient
                :id="`cp-spectrum-gradient-saturation-${id}`"
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
            <clipPath :id="`cp-spectrum-clip-${id}`">
                <path :d="haloPath" />
            </clipPath>
        </defs>
        <g class="colorpicker-spectrum-slider-hue">
            <foreignObject
                :x="0"
                :y="0"
                :width="size"
                :height="size"
                :clip-path="`url(#cp-spectrum-clip-${id})`"
            >
                <div
                    class="colorpicker-spectrum-hue"
                    @click="clickHue"
                    @mousedown="startMouseCapture"
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
                        class="hue-range-thumb"
                        role="slider"
                        tabindex="0"
                        aria-label="Hue"
                        aria-valuemin="0"
                        :aria-valuenow="hue"
                        aria-valuemax="360"
                        @click="clickHue"
                        @keydown="hueKeyPress"
                        @mousedown="startMouseCapture"
                        @touchstart.prevent="startMouseCapture"
                    />
                </foreignObject>
            </g>
        </g>
        <g
            class="colorpicker-spectrum-slider-sl"
            :style="`transform: rotate(${hue}deg) translate(50%, 50%)`"
        >
            <path
                :d="trianglePath"
                :fill="`url(#cp-spectrum-gradient-ligthness-${id})`"
            />
            <path
                :d="trianglePath"
                :fill="`url(#cp-spectrum-gradient-saturation-${id})`"
            />
        </g>
    </svg>
</template>

<script>
const cos30 = 0.86602540378
const sin30 = 0.5

let id = 0

export default {
    name: 'BColorpickerSpectrumSVG',
    props: {
        size: {
            type: Number,
            default: 200
        },
        thickness: {
            type: Number,
            default: 20
        }
    },
    data() {
        return {
            id: id++,
            hue: 0,
            captureMouse: false,
            clientOrigin: [-1, -1]
        }
    },
    computed: {
        viewBox() {
            const { size } = this
            return `0 0 ${size} ${size}`
        },
        haloPath() {
            const { size, thickness } = this
            const radius = size - 4
            const thicknessRadius = (radius - 2 * thickness) / 2
            const center = size / 2
            return `M${center + radius / -2} ${center}a${radius / 2}  ${radius / 2}  0 1 1 ${radius} 0` +
                `h${-thickness}` +
                `a${-thicknessRadius}  ${thicknessRadius}  0 1 0 ${-2 * thicknessRadius} 0` +
                `a${thicknessRadius}  ${thicknessRadius}  0 1 0 ${2 * thicknessRadius} 0` +
                `h${thickness}` +
                `a${radius / 2}  ${radius / 2}  0 1 1 ${-radius} 0z`
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
                // Caching center position
                this.clientOrigin = [
                    rect.x + rect.width / 2,
                    rect.y + rect.height / 2
                ]
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
            }
        },
        clickHue(event) {
            this.hue = (Math.atan2(
                event.clientY - this.clientOrigin[1],
                event.clientX - this.clientOrigin[0]
            ) / Math.PI * 180 + 90) % 360
        },
        trackMouse(event) {
            if (this.captureMouse === false) {
                return
            }
            event.preventDefault()
            event.stopPropagation()

            this.hue = (typeof event.touches !== 'undefined' && event.touches.length
                ? Math.atan2(
                    event.touches[0].clientY - this.clientOrigin[1],
                    event.touches[0].clientX - this.clientOrigin[0]
                ) / Math.PI * 180 + 90
                : Math.atan2(
                    event.clientY - this.clientOrigin[1],
                    event.clientX - this.clientOrigin[0]
                ) / Math.PI * 180 + 90
            ) % 360
        },
        startMouseCapture(event) {
            event.preventDefault()
            event.stopPropagation()
            this.captureMouse = true
        },
        stopMouseCapture(event) {
            if (this.captureMouse !== false) {
                event.preventDefault()
                event.stopPropagation()
            }
            this.captureMouse = false
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
