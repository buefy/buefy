import { createApp, h as createElement } from 'vue'

import Modal from './Modal'

import { merge } from '../../utils/helpers'
import { use, registerComponent, registerComponentProgrammatic } from '../../utils/plugins'

const ModalProgrammatic = {
    // component specified to the `component` option cannot resolve components
    // registered to the caller app, because `open` creates a brand-new app
    // by the `createApp` API.
    // so the component specified to the `component` option has to explicitly
    // reference components that it depends on.
    // see /docs/pages/components/modal/examples/ExProgrammatic for an example.
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
        // I could not figure out how to extend an existing app to create a new
        // Vue instance on Vue 3.
        const vueInstance = createApp({
            data() {
                return {
                    modalVNode: null
                }
            },
            methods: {
                close() {
                    const modal =
                        this.modalVNode?.component?.expose ||
                        this.modalVNode?.component?.proxy
                    modal?.close()
                }
            },
            render() {
                this.modalVNode = createElement(
                    Modal,
                    {
                        ...propsData,
                        onClose: () => {
                            vueInstance.unmount()
                        }
                    },
                    slot ? { default: () => slot } : undefined
                )
                return this.modalVNode
            }
        })
        return vueInstance.mount(container)
    }
}

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Modal)
        registerComponentProgrammatic(Vue, 'modal', ModalProgrammatic)
    }
}

use(Plugin)

export default Plugin

export {
    ModalProgrammatic,
    Modal as BModal
}
