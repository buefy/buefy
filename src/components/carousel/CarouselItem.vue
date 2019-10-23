<template>
    <transition :name="transition">
        <div v-show="isActive" class="carousel-item">
            <slot />
        </div>
    </transition>
</template>
<script>
export default {
    name: 'BCarouselItem',
    data() {
        return {
            isActive: false,
            transitionName: null
        }
    },
    computed: {
        transition() {
            if (this.$parent.animated === 'fade') {
                return 'fade'
            } else {
                return this.transitionName
            }
        }
    },
    methods: {
        /**
        * Activate tab, alter animation name based on the index.
        */
        activate(oldIndex, index) {
            this.transitionName = index < oldIndex
                ? 'slide-next'
                : 'slide-prev'
            this.isActive = true
        },

        /**
        * Deactivate tab, alter animation name based on the index.
        */
        deactivate(oldIndex, index) {
            this.transitionName = index < oldIndex
                ? 'slide-next'
                : 'slide-prev'
            this.isActive = false
        }
    },
    created() {
        if (!this.$parent.$data._isCarousel) {
            this.$destroy()
            throw new Error('You should wrap bCarouselItem on a bCarousel')
        }
        this.$parent.items.push(this)
    }
}
</script>
