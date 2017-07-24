<template>
    <transition :name="animation">
        <div class="loading-overlay is-active" v-if="isActive">
            <div class="loading-background" @click="cancel"></div>
            <div class="loading-icon"></div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'bLoading',
        props: {
            active: Boolean,
            programmatic: Boolean,
            animation: {
                type: String,
                default: 'fade'
            },
            canCancel: {
                type: Boolean,
                default: false
            },
            onCancel: {
                type: Function,
                default: () => {}
            }
        },
        data() {
            return {
                isActive: this.active || false
            }
        },
        watch: {
            active(value) {
                this.isActive = value
            }
        },
        methods: {
            /**
             * Close the Modal if canCancel.
             */
            cancel() {
                if (!this.canCancel) return

                this.close()
            },
            /**
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
                        this.$el.remove()
                    }, 150)
                }
            },
            /**
             * Keypress event that is bound to the document.
             */
            keyPress(event) {
                // Esc key
                if (event.keyCode === 27) this.cancel()
            }
        },
        created() {
            if (typeof window !== 'undefined') {
                document.addEventListener('keyup', this.keyPress)
            }
        },
        beforeMount() {
            // Insert the Loading component in body tag
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
</script>
