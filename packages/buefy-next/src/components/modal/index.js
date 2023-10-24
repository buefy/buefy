import { createApp, h as createElement } from 'vue'

import Modal from './Modal.vue'

import { merge, copyAppContext, getComponentFromVNode } from '../../utils/helpers'
import { use, registerComponent, registerComponentProgrammatic } from '../../utils/plugins'

class ModalProgrammatic {
    constructor(app) {
        this.app = app // may be undefined in the testing environment
    }

    open(params) {
        if (typeof params === 'string') {
            params = {
                content: params
            }
        }

        const defaultParam = {
            programmatic: true
        }
        if (params.parent) {
            delete params.parent
        }
        let slot
        if (Array.isArray(params.content)) {
            slot = params.content
            delete params.content
        }
        const propsData = merge(defaultParam, params)
        const container = document.createElement('div')
        // Vue 3 requires a new app to mount another component
        const vueInstance = createApp({
            data() {
                return {
                    modalVNode: null
                }
            },
            methods: {
                close() {
                    const modal = getComponentFromVNode(this.modalVNode)
                    if (modal) {
                        modal.close()
                    }
                }
            },
            render() {
                this.modalVNode = createElement(
                    Modal,
                    {
                        ...propsData,
                        onClose: () => {
                            vueInstance.unmount()
                        },
                        // intentionally overrides propsData.onCancel
                        // to prevent propsData.onCancel from receiving a "cancel" event
                        onCancel: () => {},
                        cancelCallback: (...args) => {
                            if (propsData.onCancel != null) {
                                propsData.onCancel(...args)
                            }
                        }
                    },
                    slot ? { default: () => slot } : undefined
                )
                return this.modalVNode
            }
        })
        if (this.app) {
            copyAppContext(this.app, vueInstance)
        }
        return vueInstance.mount(container)
    }
}

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Modal)
        registerComponentProgrammatic(Vue, 'modal', new ModalProgrammatic(Vue))
    }
}

use(Plugin)

export default Plugin

export {
    ModalProgrammatic,
    Modal as BModal
}
