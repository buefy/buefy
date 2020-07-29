import Dialog from './Dialog'

import { VueInstance } from '../../utils/config'
import { merge } from '../../utils/helpers'
import { use, registerComponent, registerComponentProgrammatic } from '../../utils/plugins'

let localVueInstance

function open(defaultParam, params) {
    let slot
    if (Array.isArray(params.message)) {
        slot = params.message
        delete params.message
    }
    const propsData = merge(defaultParam, params)
    const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : localVueInstance || VueInstance
    const DialogComponent = vm.extend(Dialog)
    const instance = new DialogComponent({
        el: document.createElement('div'),
        propsData
    })
    if (slot) {
        instance.$slots.default = slot
    }
    return instance
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
        return open(defaultParam, params)
    },
    confirm(params) {
        const defaultParam = {}
        return open(defaultParam, params)
    },
    prompt(params) {
        const defaultParam = {
            hasInput: true,
            confirmText: 'Done'
        }
        return open(defaultParam, params)
    }
}

const Plugin = {
    install(Vue) {
        localVueInstance = Vue
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
