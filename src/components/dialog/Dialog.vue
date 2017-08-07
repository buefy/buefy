<template>
    <transition :name="animation">
        <div class="dialog modal is-active" v-if="isActive">
            <div class="modal-background" @click="cancel"></div>
            <div class="modal-card animation-content">
                <header class="modal-card-head" v-if="title">
                    <p class="modal-card-title">{{ title }}</p>
                </header>

                <section class="modal-card-body" :class="{ 'is-titleless': !title, 'is-flex': hasIcon }">
                    <div class="media">
                        <div class="media-left" v-if="icon && hasIcon">
                            <b-icon
                                :icon="icon"
                                :class="type"
                                both
                                size="is-large custom-icon">
                            </b-icon>
                        </div>
                        <div class="media-content">
                            <p v-html="message"></p>

                            <div v-if="hasInput" class="field">
                                <div class="control">
                                    <input v-model="prompt"
                                        class="input"
                                        :class="{ 'is-danger': validationMessage }"
                                        ref="input"
                                        required
                                        :placeholder="inputPlaceholder"
                                        :maxlength="inputMaxlength"
                                        :name="inputName"
                                        @keyup.enter="confirm">
                                </div>
                                <p class="help is-danger">{{ validationMessage }}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <footer class="modal-card-foot">
                    <button v-if="canCancel" class="button is-light" ref="cancelButton" @click="cancel">
                        {{ cancelText }}
                    </button>
                    <button class="button" :class="type" ref="confirmButton"  @click="confirm">
                        {{ confirmText }}
                    </button>
                </footer>
            </div>
        </div>
    </transition>
</template>

<script>
    import Icon from '../icon'

    export default {
        components: {
            [Icon.name]: Icon
        },
        props: {
            title: String,
            message: String,
            hasIcon: Boolean,
            type: {
                type: String,
                default: 'is-primary'
            },
            confirmText: {
                type: String,
                default: 'OK'
            },
            cancelText: {
                type: String,
                default: 'Cancel'
            },
            animation: {
                type: String,
                default: 'zoom-out'
            },
            canCancel: {
                type: Boolean,
                default: true
            },
            hasInput: Boolean, // Used internally to know if it's prompt
            inputPlaceholder: String,
            inputName: String,
            inputMaxlength: [Number, String],
            onConfirm: {
                type: Function,
                default: () => {}
            },
            onCancel: {
                type: Function,
                default: () => {}
            }
        },
        data() {
            return {
                isActive: false,
                prompt: '',
                validationMessage: ''
            }
        },
        computed: {
            /**
             * Icon name (MDI) based on the type.
             */
            icon() {
                switch (this.type) {
                    case 'is-info':
                        return 'info'
                    case 'is-success':
                        return 'check_circle'
                    case 'is-warning':
                        return 'warning'
                    case 'is-danger':
                        return 'error'
                    default:
                        return null
                }
            }
        },
        watch: {
            isActive() {
                if (typeof window !== 'undefined') {
                    const action = this.isActive ? 'add' : 'remove'
                    document.documentElement.classList[action]('is-clipped')
                }
            }
        },
        methods: {
            /**
             * If it's a prompt Dialog, validate the input.
             * Call the onConfirm prop (function) and close the Dialog.
             */
            confirm() {
                if (this.$refs.input !== undefined) {
                    if (!this.$refs.input.checkValidity()) {
                        this.validationMessage = this.$refs.input.validationMessage
                        this.$nextTick(() => this.$refs.input.select())
                        return
                    }
                }

                this.onConfirm(this.prompt)
                this.close()
            },

            /**
             * Call the onCancel prop (function) and close the Dialog.
             */
            cancel() {
                if (!this.canCancel) return

                this.onCancel()
                this.close()
            },

            /**
             * Close the Dialog.
             */
            close() {
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
        mounted() {
            this.isActive = true

            this.$nextTick(() => {
                // Handle which element receives focus
                if (this.hasInput) {
                    this.$refs.input.focus()
                } else {
                    this.$refs.confirmButton.focus()
                }
            })
        },
        beforeDestroy() {
            if (typeof window !== 'undefined') {
                document.removeEventListener('keyup', this.keyPress)
            }
        }
    }
</script>
