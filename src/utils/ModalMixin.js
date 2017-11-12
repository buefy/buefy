import { removeElement } from './helpers'

export default {
    props: {
        active: Boolean,
        component: [Object, Function],
        content: String,
        programmatic: Boolean,
        props: Object,
        width: {
            type: [String, Number],
            default: 960
        },
        hasModalCard: Boolean,
        animation: {
            type: String,
            default: 'zoom-out'
        },
        canCancel: {
            type: [Array, Boolean],
            default: () => ['escape', 'x', 'outside', 'button']
        },
        onCancel: {
            type: Function,
            default: () => {}
        }
    },
    data() {
        return {
            isActive: this.active || false,
            savedScrollTop: null,
            newWidth: typeof this.width === 'number'
                ? this.width + 'px'
                : this.width
        }
    },
    computed: {
        cancelOptions() {
            return typeof this.canCancel === 'boolean'
                ? this.canCancel
                    ? ['escape', 'x', 'outside', 'button']
                    : []
                : this.canCancel
        },
        showX() {
            return this.cancelOptions.indexOf('x') >= 0
        }
    },
    watch: {
        active(value) {
            this.isActive = value
        },
        isActive() {
            if (typeof window !== 'undefined') {
                this.savedScrollTop = !this.savedScrollTop
                    ? document.documentElement.scrollTop
                    : this.savedScrollTop

                document.body.classList.toggle('is-noscroll', this.isActive)

                if (this.isActive) {
                    document.body.style.top = `-${this.savedScrollTop}px`
                } else {
                    document.documentElement.scrollTop = this.savedScrollTop
                    document.body.style.top = null
                    this.savedScrollTop = null
                }
            }
        }
    },
    methods: {
        /**
         * Close the Modal if canCancel.
         */
        cancel(method) {
            if (this.cancelOptions.indexOf(method) < 0) return

            this.close()
        },

        /**
         * Call the onCancel prop (function).
         * Emit events, and destroy modal if it's programmatic.
         */
        close() {
            this.onCancel.apply(null, arguments)
            this.$emit('close')
            this.$emit('update:active', false)

            // Timeout for the animation complete before destroying
            if (this.programmatic) {
                this.isActive = false
                setTimeout(() => {
                    this.$destroy()
                    removeElement(this.$el)
                }, 150)
            }
        },

        /**
         * Keypress event that is bound to the document.
         */
        keyPress(event) {
            // Esc key
            if (event.keyCode === 27) this.cancel('escape')
        }
    },
    created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('keyup', this.keyPress)
        }
    },
    beforeMount() {
        // Insert the Modal component in body tag
        // only if it's programmatic
        this.programmatic && document.body.appendChild(this.$el)
    },
    mounted() {
        if (this.programmatic) this.isActive = true
    },
    beforeDestroy() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('keyup', this.keyPress)
        }
    }
}
