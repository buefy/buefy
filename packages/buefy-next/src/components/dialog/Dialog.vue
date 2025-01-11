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
                                :icon="icon ? icon : iconByType!"
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

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

import trapFocus from '../../directives/trapFocus'
import BIcon from '../icon/Icon.vue'
import Modal from '../modal/Modal.vue'
import BButton from '../button/Button.vue'
import config from '../../utils/config'
import { removeElement } from '../../utils/helpers'
import type { ExtractComponentProps } from '../../utils/helpers'

type BButtonInstance = InstanceType<typeof BButton>

const Dialog = defineComponent({
    name: 'BDialog',
    components: {
        BIcon,
        BButton
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
            // I was not able to figure out how to specify the "self" type here
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            type: Function as PropType<(value: string, dialog: any) => void>,
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
        }
    },
    emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
        // second parameter is the dialog instance but typed any
        // because I was not able to figure out how to specify the "self" type here
        confirm: (value: string, dialog: any) => true
        /* eslint-enable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
    },
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
        /*
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
        /*
        * If it's a prompt Dialog, validate the input.
        * Call the confirmCallback prop (function) and close the Dialog.
        */
        confirm() {
            const input = this.$refs.input as HTMLInputElement
            if (input != null) {
                if (this.isCompositing) return
                if (!input.checkValidity()) {
                    this.validationMessage = input.validationMessage
                    this.$nextTick(() => input.select())
                    return
                }
            }
            this.$emit('confirm', this.prompt, this)
            this.confirmCallback(this.prompt, this)
            if (this.closeOnConfirm) this.close()
        },

        /*
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
                (this.$refs.input as HTMLInputElement).focus()
            } else if (this.focusOn === 'cancel' && this.showCancel) {
                (this.$refs.cancelButton as BButtonInstance).$el.focus()
            } else {
                (this.$refs.confirmButton as BButtonInstance).$el.focus()
            }
        })
    }
})

export type DialogProps = ExtractComponentProps<typeof Dialog>

export default Dialog
</script>
