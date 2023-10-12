<template>
    <transition :name="animation">
        <div
            v-if="isActive"
            class="dialog modal is-active"
            :class="dialogClass"
            v-trap-focus="trapFocus"
            :role="ariaRole"
            :aria-modal="ariaModal"
        >
            <div class="modal-background" @click="cancel('outside')" />
            <div class="modal-card animation-content">
                <header class="modal-card-head" v-if="title">
                    <p class="modal-card-title">
                        {{ title }}
                    </p>
                </header>

                <section
                    class="modal-card-body"
                    :class="{ 'is-titleless': !title, 'is-flex': hasIcon }"
                >
                    <div class="media">
                        <div
                            class="media-left"
                            v-if="hasIcon && (icon || iconByType)"
                        >
                            <b-icon
                                :icon="icon ? icon : iconByType"
                                :pack="iconPack"
                                :type="type"
                                :both="!icon"
                                size="is-large"
                            />
                        </div>
                        <div class="media-content">
                            <p>
                                <template v-if="$slots.default">
                                    <slot />
                                </template>
                                <template v-else>
                                    <!-- eslint-disable-next-line vue/no-v-html -->
                                    <div v-html="message" />
                                </template>
                            </p>

                            <div v-if="hasInput" class="field">
                                <div class="control">
                                    <input
                                        v-model="prompt"
                                        class="input"
                                        ref="input"
                                        :class="{ 'is-danger': validationMessage }"
                                        v-bind="safeInputAttrs"
                                        @compositionstart="isCompositing = true"
                                        @compositionend="isCompositing = false"
                                        @keydown.enter="confirm"
                                    >
                                </div>
                                <p class="help is-danger">
                                    {{ validationMessage }}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <footer class="modal-card-foot">
                    <b-button
                        v-if="showCancel"
                        ref="cancelButton"
                        :disabled="isLoading"
                        @click="cancel('button')"
                    >
                        {{ cancelText }}
                    </b-button>
                    <b-button
                        :type="type"
                        ref="confirmButton"
                        :loading="isLoading"
                        @click="confirm"
                    >
                        {{ confirmText }}
                    </b-button>
                </footer>
            </div>
        </div>
    </transition>
</template>

<script>
import trapFocus from '../../directives/trapFocus'
import Icon from '../icon/Icon.vue'
import Modal from '../modal/Modal.vue'
import Button from '../button/Button.vue'
import config from '../../utils/config'
import { removeElement } from '../../utils/helpers'

export default {
    name: 'BDialog',
    components: {
        [Icon.name]: Icon,
        [Button.name]: Button
    },
    directives: {
        trapFocus
    },
    extends: Modal,
    props: {
        title: String,
        message: [String, Array],
        icon: String,
        iconPack: String,
        hasIcon: Boolean,
        type: {
            type: String,
            default: 'is-primary'
        },
        size: String,
        confirmText: {
            type: String,
            default: () => {
                return config.defaultDialogConfirmText
                    ? config.defaultDialogConfirmText
                    : 'OK'
            }
        },
        cancelText: {
            type: String,
            default: () => {
                return config.defaultDialogCancelText
                    ? config.defaultDialogCancelText
                    : 'Cancel'
            }
        },
        hasInput: Boolean, // Used internally to know if it's prompt
        inputAttrs: {
            type: Object,
            default: () => ({})
        },
        confirmCallback: {
            type: Function,
            default: () => {}
        },
        closeOnConfirm: {
            type: Boolean,
            default: true
        },
        container: {
            type: String,
            default: () => {
                return config.defaultContainerElement
            }
        },
        focusOn: {
            type: String,
            default: 'confirm'
        },
        trapFocus: {
            type: Boolean,
            default: () => {
                return config.defaultTrapFocus
            }
        },
        ariaRole: {
            type: String,
            validator: (value) => {
                return [
                    'dialog',
                    'alertdialog'
                ].indexOf(value) >= 0
            }
        },
        ariaModal: Boolean
    },
    emits: ['confirm'],
    data() {
        const prompt = this.hasInput
            ? this.inputAttrs.value || ''
            : ''

        return {
            prompt,
            isActive: false,
            validationMessage: '',
            isCompositing: false,
            isLoading: false
        }
    },
    computed: {
        // `safeInputAttrs` is a shallow copy of `inputAttrs` except for `value`
        // `value` should not be specified to `v-bind` of the input element
        // because it inhibits `v-model` of the input on Vue 3
        safeInputAttrs() {
            const attrs = { ...this.inputAttrs }
            delete attrs.value
            if (typeof attrs.required === 'undefined') {
                attrs.required = true
            }
            return attrs
        },
        dialogClass() {
            return [this.size, {
                'has-custom-container': this.container !== null
            }]
        },
        /**
        * Icon name (MDI) based on the type.
        */
        iconByType() {
            switch (this.type) {
                case 'is-info':
                    return 'information'
                case 'is-success':
                    return 'check-circle'
                case 'is-warning':
                    return 'alert'
                case 'is-danger':
                    return 'alert-circle'
                default:
                    return null
            }
        },
        showCancel() {
            return this.cancelOptions.indexOf('button') >= 0
        }
    },
    methods: {
        /**
        * If it's a prompt Dialog, validate the input.
        * Call the confirmCallback prop (function) and close the Dialog.
        */
        confirm() {
            if (this.$refs.input !== undefined) {
                if (this.isCompositing) return
                if (!this.$refs.input.checkValidity()) {
                    this.validationMessage = this.$refs.input.validationMessage
                    this.$nextTick(() => this.$refs.input.select())
                    return
                }
            }
            this.$emit('confirm', this.prompt)
            this.confirmCallback(this.prompt, this)
            if (this.closeOnConfirm) this.close()
        },

        /**
        * Close the Dialog.
        */
        close() {
            this.isActive = false
            this.isLoading = false
            // Timeout for the animation complete before destroying
            setTimeout(() => {
                removeElement(this.$el)
            }, 150)
        },

        /**
        * Start the Loading.
        */
        startLoading() {
            this.isLoading = true
        },

        /**
        * Cancel the Loading.
        */
        cancelLoading() {
            this.isLoading = false
        }
    },
    beforeMount() {
        // Insert the Dialog component in the element container
        if (typeof window !== 'undefined') {
            this.$nextTick(() => {
                const container = document.querySelector(this.container) || document.body
                container.appendChild(this.$el)
            })
        }
    },
    mounted() {
        this.isActive = true

        this.$nextTick(() => {
            // Handle which element receives focus
            if (this.hasInput) {
                this.$refs.input.focus()
            } else if (this.focusOn === 'cancel' && this.showCancel) {
                this.$refs.cancelButton.$el.focus()
            } else {
                this.$refs.confirmButton.$el.focus()
            }
        })
    }
}
</script>
