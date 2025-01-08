<template>
    <div
        class="b-slider-tick"
        :class="{ 'is-tick-hidden': hidden }"
        :style="getTickStyle(position)"
    >
        <span v-if="$slots.default" class="b-slider-tick-label">
            <slot />
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import type { ISlider } from './types'

export default defineComponent({
    name: 'BSliderTick',
    props: {
        value: {
            type: Number,
            default: 0
        }
    },
    computed: {
        parent() {
            return this.$parent as unknown as ISlider
        },
        position() {
            const pos = (this.value - this.parent.min) /
                (this.parent.max - this.parent.min) * 100
            return (pos >= 0 && pos <= 100) ? pos : 0
        },
        hidden() {
            return this.value === this.parent.min || this.value === this.parent.max
        }
    },
    methods: {
        getTickStyle(position: number) {
            return { left: position + '%' }
        }
    },
    created() {
        if (!this.parent.$data._isSlider) {
            throw new Error('You should wrap bSliderTick on a bSlider')
        }
    }
})
</script>
