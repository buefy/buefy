import { createApp, h as createElement } from 'vue'

import Dialog from './Dialog'

import config from '../../utils/config'
import { merge } from '../../utils/helpers'
import { use, registerComponent, registerComponentProgrammatic } from '../../utils/plugins'

function open(propsData) {
    let slot
    if (Array.isArray(propsData.message)) {
        slot = propsData.message
        delete propsData.message
    }
    function createDialog(onConfirm, onCancel) {
        const container = document.createElement('div')
        const vueInstance = createApp({
            data() {
                return {
                    dialogVNode: null
                }
            },
            methods: {
                close() {
                    // TODO: too much dependence on Vue's internal structure?
                    const dialog =
                        this.dialogVNode?.component?.expose ||
                        this.dialogVNode?.component?.proxy
                    dialog?.close()
                }
            },
            render() {
                this.dialogVNode = createElement(
                    Dialog,
                    {
                        ...propsData,
                        onConfirm: (...args) => {
                            if (onConfirm != null) {
                                onConfirm(...args)
                            }
                            vueInstance.unmount()
                        },
                        onCancel: (...args) => {
                            if (onCancel != null) {
                                onCancel(...args)
                            }
                            vueInstance.unmount()
                        }
                    },
                    slot ? { default: () => slot } : undefined
                )
                return this.dialogVNode
            }
        })
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

const DialogProgrammatic = {
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
        return open(propsData)
    },
    confirm(params) {
        const defaultParam = {}
        const propsData = merge(defaultParam, params)
        return open(propsData)
    },
    prompt(params) {
        const defaultParam = {
            hasInput: true
        }
        const propsData = merge(defaultParam, params)
        return open(propsData)
    }
}

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Dialog)
        registerComponentProgrammatic(Vue, 'dialog', DialogProgrammatic)
    }
}

use(Plugin)

export default Plugin

export {
    DialogProgrammatic,
    Dialog as BDialog
}
