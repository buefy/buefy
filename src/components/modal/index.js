import Modal from './Modal'

import { VueInstance } from '../../utils/config'
import { merge } from '../../utils/helpers'
import { use, registerComponent, registerComponentProgrammatic } from '../../utils/plugins'

let localVueInstance

const ModalProgrammatic = {
    open(params) {
        let parent
        if (typeof params === 'string') {
            params = {
                content: params
            }
        }

        const defaultParam = {
            programmatic: true
        }
        if (params.parent) {
            parent = params.parent
            delete params.parent
        }
        let slot
        if (Array.isArray(params.content)) {
            slot = params.content
            delete params.content
        }
        const propsData = merge(defaultParam, params)
        const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : localVueInstance || VueInstance
        const ModalComponent = vm.extend(Modal)
        const component = new ModalComponent({
            parent,
            el: document.createElement('div'),
            propsData
        })
        if (slot) {
            component.$slots.default = slot
            component.$forceUpdate()
        }
        return component
    }
}

const Plugin = {
    install(Vue) {
        localVueInstance = Vue
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
