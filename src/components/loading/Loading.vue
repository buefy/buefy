<template>
    <transition :name="animation">
        <div
            class="loading-overlay is-active"
            :class="{ 'is-full-page': isFullPage }"
            v-if="isActive">
            <div class="loading-background" @click="cancel"/>
            <div class="loading-icon"/>
        </div>
    </transition>
</template>

<script>
    import { removeElement } from '../../utils/helpers'
    import { HTMLElement } from '../../utils/ssr'

    export default {
        name: 'BLoading',
        props: {
            active: Boolean,
            programmatic: Boolean,
            container: [Object, Function, HTMLElement],
            isFullPage: {
                type: Boolean,
                default: true
            },
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
                if (!this.canCancel || !this.isActive) return

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
                        removeElement(this.$el)
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
            if (this.programmatic) {
                if (!this.container) {
                    document.body.appendChild(this.$el)
                } else {
                    this.isFullPage = false
                    this.container.appendChild(this.$el)
                }
            }
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
