import Vue from 'vue'
import Modal from './Modal'

import { merge } from '../../utils/helpers'
import { use, registerComponent, registerComponentProgrammatic } from '../../utils/plugins'

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
        const propsData = merge(defaultParam, params)

        const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue
        const ModalComponent = vm.extend(Modal)
        return new ModalComponent({
            parent,
            el: document.createElement('div'),
            propsData
        })
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
