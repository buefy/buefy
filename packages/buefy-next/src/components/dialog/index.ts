import { createApp, h as createElement } from 'vue'
import type { App, ComponentPublicInstance } from 'vue'

import Dialog from './Dialog.vue'
import type { DialogProps } from './Dialog.vue'

import config from '../../utils/config'
import type { ModalCancellableOption } from '../../utils/config'
import { copyAppContext, getComponentFromVNode } from '../../utils/helpers'
import { registerComponent, registerComponentProgrammatic } from '../../utils/plugins'

type DialogInstance = InstanceType<typeof Dialog>

export type DialogOpenParams = Omit<
    DialogProps,
    'programmatic' | 'cancelCallback' | 'confirmCallback'
> & {
    onConfirm?: (value: string, dialog: DialogInstance) => void
    onCancel?: (method: ModalCancellableOption) => void
}

// Minimal definition of a programmatically opened dialog.
//
// ESLint does not like `{}` as a type but allowed here to make them look
// similar to Vue's definition.
/* eslint-disable @typescript-eslint/ban-types */
type DialogProgrammaticInstance = ComponentPublicInstance<
    {}, // P
    {}, // B
    {}, // D
    {}, // C
    { close: () => void } // M
>

function open(propsData: DialogProps, app?: App) {
    let slot: DialogProps['message']
    if (Array.isArray(propsData.message)) {
        slot = propsData.message
        delete propsData.message
    }
    function createDialog(
        onConfirm?: (value: string) => void,
        onCancel?: (method: ModalCancellableOption) => void
    ) {
        const container = document.createElement('div')
        // Vue 3 requires a new app to mount another component
        const vueInstance = createApp({
            data() {
                return {
                    dialogVNode: null
                }
            },
            methods: {
                close() {
                    const dialog = getComponentFromVNode(this.dialogVNode)
                    if (dialog) {
                        (dialog as DialogInstance).close()
                    }
                },
                startLoading() {
                    const dialog = getComponentFromVNode(this.dialogVNode)
                    if (dialog) {
                        (dialog as DialogInstance).startLoading()
                    }
                },
                cancelLoading() {
                    const dialog = getComponentFromVNode(this.dialogVNode)
                    if (dialog) {
                        (dialog as DialogInstance).cancelLoading()
                    }
                }
            },
            render() {
                this.dialogVNode = createElement(
                    Dialog,
                    {
                        ...propsData,
                        // intentionally overrides propsData.onConfirm
                        // to prevent propsData.onConfirm from receiving a "confirm" event
                        onConfirm: (value: string) => {
                            if (onConfirm != null) {
                                onConfirm(value)
                            }
                        },
                        // intentionally override propsData.onCancel
                        // to prevent propsData.onCancel from receiving a "cancel" event
                        onCancel: (method: ModalCancellableOption) => {
                            if (onCancel != null) {
                                onCancel(method)
                            }
                            vueInstance.unmount()
                        },
                        confirmCallback: (value: string, dialog: DialogInstance) => {
                            if (propsData.onConfirm != null) {
                                propsData.onConfirm(value, dialog)
                            }
                        },
                        cancelCallback: (method: ModalCancellableOption) => {
                            if (propsData.onCancel != null) {
                                propsData.onCancel(method)
                            }
                        }
                    },
                    slot ? { default: () => slot } : undefined
                )
                return this.dialogVNode
            }
        })
        if (app) {
            copyAppContext(app, vueInstance)
        }
        return vueInstance.mount(container) as DialogProgrammaticInstance
    }
    if (!config.defaultProgrammaticPromise) {
        return createDialog()
    } else {
        return new Promise((resolve) => {
            const dialog = createDialog(
                (event) => resolve({ result: event || true, dialog }),
                () => resolve({ result: false, dialog }))
        })
    }
}

class DialogProgrammatic {
    private app: App | undefined

    constructor(app?: App) {
        this.app = app // may be undefined in the testing environment
    }

    alert(params: string | DialogOpenParams) {
        let newParams: DialogOpenParams
        if (typeof params === 'string') {
            newParams = {
                message: params
            }
        } else {
            newParams = params
        }
        newParams = {
            canCancel: false,
            ...newParams
        }
        return open(newParams, this.app)
    }

    confirm(params: DialogOpenParams) {
        return open(params, this.app)
    }

    prompt(params: DialogOpenParams) {
        return open({ hasInput: true, ...params }, this.app)
    }
}

const Plugin = {
    install(Vue: App) {
        registerComponent(Vue, Dialog)
        registerComponentProgrammatic(Vue, 'dialog', new DialogProgrammatic(Vue))
    }
}

export default Plugin

export {
    DialogProgrammatic,
    Dialog as BDialog
}
