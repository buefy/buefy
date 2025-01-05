import { createApp, h as createElement } from 'vue'
import type { App, ComponentPublicInstance } from 'vue'

import Modal from './Modal.vue'
import type { ModalProps } from './Modal.vue'

import type { ModalCancellableOption } from '../../utils/config'
import { copyAppContext, getComponentFromVNode } from '../../utils/helpers'
import { registerComponent, registerComponentProgrammatic } from '../../utils/plugins'

export type ModalOpenParams = Omit<ModalProps, 'programmatic' | 'cancelCallback'> & {
    onCancel?: (method: ModalCancellableOption) => void
}

// Minimal definition of a programmatically opened modal.
//
// ESLint does not like `{}` as a type but allowed here to make them look
// similar to Vue's definition.
/* eslint-disable @typescript-eslint/ban-types */
type ModalProgrammaticInstance = ComponentPublicInstance<
    {}, // P
    {}, // B
    {}, // D
    {}, // C
    { close: () => void } // M
>;
/* eslint-enable @typescript-eslint/ban-types */

class ModalProgrammatic {
    private app: App | undefined

    constructor(app?: App) {
        this.app = app // may be undefined in the testing environment
    }

    open(params: ModalOpenParams | string) {
        if (typeof params === 'string') {
            params = {
                content: params
            }
        }

        let slot: ModalOpenParams['content']
        if (Array.isArray(params.content)) {
            slot = params.content
            delete params.content
        }
        const propsData = params
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
                        (modal as InstanceType<typeof Modal>).close()
                    }
                }
            },
            render() {
                this.modalVNode = createElement(
                    Modal,
                    {
                        ...propsData,
                        programmatic: true,
                        onClose: () => {
                            vueInstance.unmount()
                        },
                        // intentionally overrides propsData.onCancel
                        // to prevent propsData.onCancel from receiving a "cancel" event
                        onCancel: () => {},
                        cancelCallback: (method) => {
                            if (propsData.onCancel != null) {
                                propsData.onCancel(method)
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
        return vueInstance.mount(container) as ModalProgrammaticInstance
    }
}

const Plugin = {
    install(Vue: App) {
        registerComponent(Vue, Modal)
        registerComponentProgrammatic(Vue, 'modal', new ModalProgrammatic(Vue))
    }
}

export default Plugin

export {
    ModalProgrammatic,
    Modal as BModal
}
