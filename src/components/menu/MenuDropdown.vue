<template>
    <li class="b-menu-dropdown" :class="{ 'is-active': isActive, 'is-animated': menu.animated }">
        <a @click="toggle"><slot name="trigger"></slot></a>
        <transition
            @beforeEnter="beforeEnter"
            @enter="enter"
            @after-enter="afterTransition"
            @enter-cancelled="cancelTransition"
            @before-leave="beforeLeave"
            @leave="leave"
            @after-leave="afterTransition"
            @leave-cancelled="cancelTransition">
            <ul v-show="isActive">
                <slot></slot>
            </ul>
        </transition>
    </li>
</template>

<script>
import MenuMixin from './MenuMixin'

export default {
    name: 'bMenuDropdown',
    mixins: [MenuMixin],
    data() {
        return {
            isActive: false
        }
    },
    watch: {
        /**
         * Emit toggle event when this dropdown is toggled.
         */
        isActive(val) {
            this.$emit('toggle', this.isActive)
        }
    },
    methods: {
        /**
         * Collapse this dropdown and children if exist.
         */
        collapse() {
            this.isActive = false
            this.$children.forEach((child) => {
                if (child.$options.name === 'bMenuDropdown') {
                    child.collapse()
                }
            })
        },

        /**
         * Expand this dropdown and parent if exists.
         */
        expand() {
            if (!this.isActive) {
                this.isActive = true
                if (this.$parent.$options.name === 'bMenuDropdown') {
                    this.$parent.expand()
                }
            }
        },

        /**
         * Toggle active state and collapse other dropdowns.
         */
        toggle() {
            if (!this.isActive && this.menu.autoClose) {
                this.menu.collapse(this.rootDropdown)
            }
            this.isActive = !this.isActive
        },

        /**
         * Before active expand animation,
         * set height and margin to zero.
         */
        beforeEnter(el) {
            if (!this.menu.animated) return

            el.style.transition = 'none'
            el.style.overflow = 'hidden'
            el.style.height = 0
            el.style.marginTop = 0
            el.style.marginBottom = 0
        },

        /**
         * When active expand animation,
         * change height and margin to its actual value.
         */
        enter(el) {
            if (!this.menu.animated) return

            el.style.transition = null
            el.style.height = `${el.scrollHeight}px`
            el.style.marginTop = null
            el.style.marginBottom = null
        },

        /**
         * Before active collapse animation,
         * set current height.
         */
        beforeLeave(el) {
            if (!this.menu.animated) return

            el.style.transition = 'none'
            el.style.overflow = 'hidden'
            el.style.height = `${el.scrollHeight}px`
        },

        /**
         * When active collapse animation,
         * change height and margin to zero.
         */
        leave(el) {
            if (!this.menu.animated) return

            el.style.transition = null
            el.style.marginTop = 0
            el.style.marginBottom = 0
            // Delay height changing. Otherwise, height will change immediately (no animation).
            setTimeout(() => {
                el.style.height = 0
            }, 0)
        },

        /**
         * After animated,
         * remove the binding styles.
         */
        afterTransition(el) {
            if (!this.menu.animated) return

            el.style.overflow = null
            el.style.height = null
            el.style.marginTop = null
            el.style.marginBottom = null
        },

        /**
         * When the animation is cancelled,
         * reset the animation.
         */
        cancelTransition(el) {
            if (!this.menu.animated) return

            el.style.transition = 'none'
            setTimeout(() => {
                el.style.transition = null
            }, 0)
        }
    }
}
</script>

