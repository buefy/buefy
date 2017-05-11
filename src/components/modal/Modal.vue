<template>
    <transition name="zoom-out">
        <div class="modal is-active" v-if="isActive">
            <div class="modal-background" @click="cancel"></div>
            <div class="modal-content animation-content" :style="{ maxWidth: newWidth }">
                <component
                    v-if="component"
                    v-bind="props"
                    :is="component"
                    @close="close">
                </component>
                <div v-else v-html="content"></div>
            </div>
            <button v-if="canCancel" class="modal-close" @click="cancel"></button>
        </div>
    </transition>
</template>

<script>
    export default {
        props: {
            component: Object,
            content: String,
            props: Object,
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
                isActive: false,
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
            // Insert the Modal component in body tag
            document.body.appendChild(this.$el)
        },
        mounted() {
            this.isActive = true
        },
        beforeDestroy() {
            if (typeof window !== 'undefined') {
                document.removeEventListener('keyup', this.keyPress)
            }
        }
    }
</script>
