<template>
    <transition
        appear
        appear-active-class="fadeIn"
        enter-active-class="fadeIn"
        leave-active-class="fadeOut">

        <div class="modal is-active" v-if="isActive">
            <div class="modal-background" @click="cancel"></div>

            <transition
                appear
                appear-active-class="zoomIn"
                enter-active-class="zoomIn">

                <div class="modal-content" v-if="isActive" :style="{ maxWidth: newWidth }">
                    <component v-if="component" @close="close" :is="component"></component>
                    <div v-else v-html="content"></div>
                </div>

            </transition>

            <button v-if="canCancel" class="modal-close" @click="cancel"></button>
        </div>

        </transition>
</template>

<script>
    export default {
        props: {
            component: Object,
            content: String,
            width: [String, Number],
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
                isActive: true,
                newWidth: typeof this.width === 'number'
                    ? this.width + 'px'
                    : this.width
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
             * Call the onCancel prop (function) and close the Modal.
             */
            close() {
                this.onCancel()
                this.isActive = false

                // Timeout for the animation complete before destroying
                setTimeout(() => {
                    this.$destroy()
                    this.$el.remove()
                }, 150)
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
            // Insert the Dialog component in body tag
            document.body.appendChild(this.$el)
        },
        beforeDestroy() {
            if (typeof window !== 'undefined') {
                document.removeEventListener('keyup', this.keyPress)
            }
        }
    }
</script>
