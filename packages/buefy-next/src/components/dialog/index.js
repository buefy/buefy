import { createApp, h as createElement } from 'vue'

import Dialog from './Dialog.vue'

import config from '../../utils/config'
import { merge, copyAppContext, getComponentFromVNode } from '../../utils/helpers'
import { use, registerComponent, registerComponentProgrammatic } from '../../utils/plugins'

function open(propsData, app) {
    let slot
    if (Array.isArray(propsData.message)) {
        slot = propsData.message
        delete propsData.message
    }
    function createDialog(onConfirm, onCancel) {
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
                        dialog.close()
                    }
                },
                startLoading() {
                    const dialog = getComponentFromVNode(this.dialogVNode)
                    if (dialog) {
                        dialog.startLoading()
                    }
                },
                cancelLoading() {
                    const dialog = getComponentFromVNode(this.dialogVNode)
                    if (dialog) {
                        dialog.cancelLoading()
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
                        onConfirm: (...args) => {
                            if (onConfirm != null) {
                                onConfirm(...args)
                            }
                        },
                        // intentionally override propsData.onCancel
                        // to prevent propsData.onCancel from receiving a "cancel" event
                        onCancel: (...args) => {
                            if (onCancel != null) {
                                onCancel(...args)
                            }
                            vueInstance.unmount()
                        },
                        confirmCallback: (...args) => {
                            if (propsData.onConfirm != null) {
                                propsData.onConfirm(...args)
                            }
                        },
                        cancelCallback: (...args) => {
                            if (propsData.onCancel != null) {
                                propsData.onCancel(...args)
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
        return vueInstance.mount(container)
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
    constructor(app) {
        this.app = app // may be undefined in the testing environment
    }

    alert(params) {
        if (typeof params === 'string') {
            params = {
                message: params
            }
        }
        const defaultParam = {
            canCancel: false
        }
        const propsData = merge(defaultParam, params)
        return open(propsData, this.app)
    }

    confirm(params) {
        const defaultParam = {}
        const propsData = merge(defaultParam, params)
        return open(propsData, this.app)
    }

    prompt(params) {
        const defaultParam = {
            hasInput: true
        }
        const propsData = merge(defaultParam, params)
        return open(propsData, this.app)
    }
}

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Dialog)
        registerComponentProgrammatic(Vue, 'dialog', new DialogProgrammatic(Vue))
    }
}

use(Plugin)

export default Plugin

export {
    DialogProgrammatic,
    Dialog as BDialog
}
