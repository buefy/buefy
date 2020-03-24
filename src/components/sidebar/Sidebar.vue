<template>
    <div class="b-sidebar">
        <div
            class="sidebar-background"
            v-if="overlay && isOpen"
        />
        <transition :name="transitionName">
            <div
                v-show="isOpen"
                class="sidebar-content"
                :class="rootClasses"
                v-click-outside="onClickOutside">
                <slot />
            </div>
        </transition>
    </div>
</template>

<script>
import clickOutside from '../../directives/clickOutside'

export default {
    name: 'BSidebar',
    directives: {
        clickOutside
    },
    props: {
        open: Boolean,
        type: [String, Object],
        container: [Object, Function, HTMLElement],
        overlay: Boolean,
        static: Boolean,
        fullheight: Boolean,
        fullwidth: Boolean,
        position: {
            type: String,
            default: () => 'left'
        },
        mobile: {
            type: String
        },
        canCancel: {
            type: [Array, Boolean],
            default: () => ['escape', 'outside']
        },
        onCancel: {
            type: Function,
            default: () => {}
        }
    },
    data() {
        return {
            isOpen: this.open,
            transitionName: null
        }
    },
    computed: {
        rootClasses() {
            return [this.type, {
                'is-fixed': !this.static,
                'is-fullheight': this.fullheight,
                'is-fullwidth': this.fullwidth,
                'is-right': this.position === 'right',
                'is-mobile': this.static && this.mobile === 'reduce',
                'is-hidden-mobile': this.static && this.mobile === 'hidden',
                'is-fullwidth-mobile': this.static && this.mobile === 'fullwidth'
            }]
        },
        cancelOptions() {
            return typeof this.canCancel === 'boolean'
                ? this.canCancel
                    ? ['escape', 'outside']
                    : []
                : this.canCancel
        }
    },
    watch: {
        open(value) {
            this.isOpen = value
            this.setAnimation()
        }
    },
    methods: {
        setAnimation() {
            const open = this.position === 'right' ? !this.open : this.open
            this.transitionName = !open ? 'slide-prev' : 'slide-next'
        },

        /**
        * Keypress event that is bound to the document.
        */
        keyPress(event) {
            // Esc key
            if (this.isOpen && event.keyCode === 27) this.cancel('escape')
        },

        onClickOutside() {
            if (this.isOpen) {
                this.cancel('outside')
            }
        },

        /**
        * Close the Sidebar if canCancel and call the onCancel prop (function).
        */
        cancel(method) {
            if (this.cancelOptions.indexOf(method) < 0) return
            if (this.static) return

            this.onCancel.apply(null, arguments)
            this.close()
        },

        /**
        * Call the onCancel prop (function) and emit events
        */
        close() {
            this.isOpen = false
            this.$emit('close')
            this.$emit('update:open', false)
        }
    },
    created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('keyup', this.keyPress)
        }
    },
    mounted() {
        this.setAnimation()
        if (!this.static) {
            if (!this.container) {
                document.body.appendChild(this.$el)
            } else {
                this.container.appendChild(this.$el)
            }
        }
    },
    beforeDestroy() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('keyup', this.keyPress)
        }
        if (!this.static) {
            if (!this.container) {
                document.body.removeChild(this.$el)
            } else {
                this.container.removeChild(this.$el)
            }
        }
    }
}
</script>
