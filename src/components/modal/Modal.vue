<template>
    <transition :name="animation">
        <div class="modal is-active" v-if="isActive">
            <div class="modal-background" @click="cancel"></div>
            <div class="animation-content"
                :class="{ 'modal-content': !hasModalCard }"
                :style="{ maxWidth: newWidth }">
                <component v-if="component"
                    v-bind="props"
                    :is="component"
                    @close="close">
                </component>
                <div v-else-if="content" v-html="content"></div>
                <slot v-else></slot>
            </div>
            <button v-if="canCancel" class="modal-close is-large" @click="cancel"></button>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'bModal',
        props: {
            active: Boolean,
            component: Object,
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
                type: Boolean,
                default: true
            },
            onCancel: {
                type: Function,
                default: () => {}
            }
        },
        data() {
            return {
                isActive: this.active || false,
                newWidth: typeof this.width === 'number'
                    ? this.width + 'px'
                    : this.width
            }
        },
        watch: {
            active(value) {
                this.isActive = value
            },
            isActive() {
                if (typeof window !== 'undefined') {
                    const action = this.isActive ? 'add' : 'remove'
                    document.documentElement.classList[action]('is-clipped')
                }
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
</script>
