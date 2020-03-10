<template>
    <transition :name="transitionName">
        <div
            v-show="isOpen"
            class="b-sidebar"
            :class="rootClasses">
            <div
                class="sidebar-background"
                v-if="modal"
            />
            <slot />
        </div>
    </transition>
</template>

<script>
export default {
    name: 'BSidebar',
    props: {
        open: Boolean,
        type: [String, Object],
        container: [Object, Function, HTMLElement],
        programmatic: Boolean,
        modal: Boolean,
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
            this.setAnimation()
            this.isOpen = value
            if (value) {
                if (!this.container) {
                    document.body.appendChild(this.$el)
                } else {
                    this.container.appendChild(this.$el)
                }
            }
        }
    },
    methods: {
        setAnimation() {
            this.transitionName = !this.isOpen
                ? 'slide-next'
                : 'slide-prev'
        },
        toggle() {
            this.setAnimation()
            this.isOpen = !this.isOpen
            this.$emit('update:open', this.isOpen)
            this.$emit(this.isOpen ? 'open' : 'close')
        },

        /**
        * Keypress event that is bound to the document.
        */
        keyPress(event) {
            // Esc key
            if (this.isActive && event.keyCode === 27) this.cancel('escape')
        },

        /**
        * Close the Modal if canCancel and call the onCancel prop (function).
        */
        cancel(method) {
            if (this.cancelOptions.indexOf(method) < 0) return

            this.onCancel.apply(null, arguments)
            this.close()
        },

        /**
        * Call the onCancel prop (function).
        * Emit events, and destroy modal if it's programmatic.
        */
        close() {
            this.$emit('close')
            this.$emit('update:open', false)

            // Timeout for the animation complete before destroying
            if (this.programmatic) {
                this.isActive = false
                setTimeout(() => {
                    this.$destroy()
                    if (!this.container) {
                        document.body.removeChild(this.$el)
                    } else {
                        this.container.removeChild(this.$el)
                    }
                }, 150)
            }
        }
    },
    created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('keyup', this.keyPress)
        }
    },
    beforeMount() {
        this.setAnimation()
        //  if (this.programmatic) {
        // }
    },
    mounted() {
        // if (this.programmatic) this.isActive = true
    },
    beforeDestroy() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('keyup', this.keyPress)
        }
    }
}
</script>
