<template>
    <div
        class="b-slider-tick"
        :style="getTickStyle(position)">
        <span v-if="$slots.default" class="b-slider-tick-label">
            <slot/>
        </span>
    </div>
</template>

<script>
export default {
    name: 'BSliderTick',
    props: {
        value: {
            type: Number,
            default: 0
        }
    },
    computed: {
        position: function () {
            const pos = (this.value - this.$parent.min) /
                (this.$parent.max - this.$parent.min) * 100
            return (pos >= 0 && pos <= 100) ? pos : 0
        }
    },
    methods: {
        getTickStyle(position) {
            return { 'left': position + '%' }
        }
    },
    created() {
        if (!this.$parent.$data._isSlider) {
            this.$destroy()
            throw new Error('You should wrap bSliderTick on a bSlider')
        }
    }
}
</script>
