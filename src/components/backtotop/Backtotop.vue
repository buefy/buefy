<template>
    <div class="backtotop is-bottom-right is-visible">
        <b-button
            @click="backToTop"
            v-bind="$attrs"
        >
            <b-icon
                pack="ionicons"
                icon="arrow-round-up" />
            <slot />
        </b-button>
    </div>
</template>

<script>
export default {

    name: 'BBacktotop',

    inheritAttrs: false,

    props: {
        position: {
            type: String,
            default: ''
        },
        fixed: {
            type: Boolean,
            default: false
        },
        duration: {
            type: Number,
            default: 1000
        }
    },

    data() {
        return {

        }
    },
    methods: {
        backToTop: () => {
            // // cancel if already on top
            // if (document.scrollingElement.scrollTop === 0) {
            //     return
            // }

            // const totalScrollDistance = document.scrollingElement.scrollTop
            // let scrollY = totalScrollDistance = null
            // let oldTimestamp = null

            // function step(newTimestamp) {
            //     if (oldTimestamp !== null) {
            //         // if duration is 0 scrollY will be -Infinity
            //         scrollY -= totalScrollDistance * (newTimestamp - oldTimestamp) / 1000
            //         if (scrollY <= 0) {
            //             return document.scrollingElement.scrollTop = 0
            //         }
            //         document.scrollingElement.scrollTop = scrollY
            //      }
            //     oldTimestamp = newTimestamp
            //     window.requestAnimationFrame(step)
            // }
            // window.requestAnimationFrame(step)
            // cancel if already on top
            if (document.scrollingElement.scrollTop === 0) {
                return
            }

            const cosParameter = document.scrollingElement.scrollTop / 2
            let scrollCount = 0
            let oldTimestamp = null

            function step(newTimestamp) {
                if (oldTimestamp !== null) {
                    // if duration is 0 scrollCount will be Infinity
                    scrollCount += Math.PI * (newTimestamp - oldTimestamp) / 1000
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
        window.addEventListener('scroll', () => {
        })
    }
}
</script>
