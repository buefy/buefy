<template>
    <transition :name="transition">
        <div v-show="isActive" class="carousel-item">
            <slot />
        </div>
    </transition>
</template>

<script>
import InjectedChildMixin, { Sorted } from '../../utils/InjectedChildMixin'

export default {
    name: 'BCarouselItem',
    mixins: [InjectedChildMixin('carousel', Sorted)],
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
}
</script>
