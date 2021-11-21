import Toast from './Toast'

import config, { VueInstance } from '../../utils/config'
import { merge } from '../../utils/helpers'
import { use, registerComponentProgrammatic } from '../../utils/plugins'

let localVueInstance

const ToastProgrammatic = {
    open(params) {
        let parent
        if (typeof params === 'string') {
            params = {
                message: params
            }
        }

        const defaultParam = {
            position: config.defaultToastPosition || 'is-top'
        }
        if (params.parent) {
            parent = params.parent
            delete params.parent
        }
        let slot
        if (Array.isArray(params.message)) {
            slot = params.message
            delete params.message
        }
        const propsData = merge(defaultParam, params)
        const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : localVueInstance || VueInstance
        const ToastComponent = vm.extend(Toast)
        const component = new ToastComponent({
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
        registerComponentProgrammatic(Vue, 'toast', ToastProgrammatic)
    }
}

use(Plugin)

export default Plugin

export {
    ToastProgrammatic,
    Toast as BToast
}
