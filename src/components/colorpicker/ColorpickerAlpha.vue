<template>
    <div class="b-colorpicker-alpha" :style="style">
        <div
            role="slider"
            tabindex="0"
            class="alpha-range-thumb"
            aria-valuemin="0"
            :aria-valuenow="value"
            aria-valuemax="100"
        >
            {{ value }}
        </div>
    </div>
</template>

<script>
import Color from '../../utils/color'

export default {
    name: 'BColorpickerAlpha',
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
            endColor: color.toString('hexa')
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
    }
}
</script>
