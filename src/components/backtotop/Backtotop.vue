<template>
    <div
        class="backtotop"
        :class="[wrapperClasses, { 'is-visible' : isVisible, 'is-hidden' : !isVisible }]"
    >
        <b-button
            @click="backToTop"
            v-bind="$attrs"
            icon-left="arrow-up"
        >
            <slot />
        </b-button>
    </div>
</template>

<script>
export default {

    name: 'BBacktotop',

    inheritAttrs: false,

    props: {
        position: String,
        duration: {
            type: Number,
            default: 1000
        }
    },

    data() {
        return {
            isVisible: !this.position
        }
    },

    computed: {
        wrapperClasses() {
            return [
                this.position
            ]
        }
    },

    methods: {
        backToTop() {
            if (document.scrollingElement.scrollTop === 0) {
                return
            }
            const cosParameter = document.scrollingElement.scrollTop / 2
            let scrollCount = 0
            let oldTimestamp = null
            let duration = this.duration

            function step(newTimestamp) {
                if (oldTimestamp !== null) {
                    // if duration is 0 scrollCount will be Infinity
                    scrollCount += Math.PI * (newTimestamp - oldTimestamp) / duration
                    if (scrollCount >= Math.PI) {
                        const d = document.scrollingElement.scrollTop = 0
                        return d
                    }
                    document.scrollingElement.scrollTop =
                        cosParameter + cosParameter * Math.cos(scrollCount)
                }
                oldTimestamp = newTimestamp
                window.requestAnimationFrame(step)
            }
            window.requestAnimationFrame(step)
        }
    },
    mounted() {
        /**
         *
         * Show the element when scolls to 500 when user set fixed position:
         * is-bottom-left; is-bottom-right; is-top-left; is-top-right
         *
         **/
        window.addEventListener('scroll', () => {
            if (this.position) {
                if (window.window.scrollY <= 500) {
                    // hide
                    this.isVisible = false
                } else if (window.window.scrollY >= 500) {
                    // show
                    this.isVisible = true
                }
            }
        })
    }
}
</script>
