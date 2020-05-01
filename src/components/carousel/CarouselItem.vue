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
            _isCarouselItem: true,
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
        * Status of item, alter animation name based on action.
        */
        status(value, action) {
            this.transitionName = action
                ? 'slide-next'
                : 'slide-prev'
            this.isActive = value
        }
    },
    created() {
        if (!this.$parent.$data._isCarousel) {
            this.$destroy()
            throw new Error('You should wrap bCarouselItem on a bCarousel')
        }
        this.$parent.refreshSlots()
    },
    beforeDestroy() {
        this.$parent.refreshSlots()
    }
}
</script>
