<template>
    <transition :name="transition">
        <div v-show="isActive" class="carousel-item">
            <slot />
        </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import InjectedChildMixin, { Sorted } from '../../utils/InjectedChildMixin'
import type { ICarousel } from './types'

export default defineComponent({
    name: 'BCarouselItem',
    mixins: [InjectedChildMixin<typeof Sorted, ICarousel>('carousel', Sorted)],
    data() {
        return {
            transitionName: null
        }
    },
    computed: {
        transition() {
            if (this.parent.animated === 'fade') {
                return 'fade'
            } else if (this.parent.transition) {
                return 'slide-' + this.parent.transition
            } else {
                return undefined
            }
        },
        isActive() {
            return this.parent.activeChildIndex === this.index
        }
    }
})
</script>
