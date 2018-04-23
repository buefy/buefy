import Vue from 'vue'
import Dialog from './Dialog'

import { registerComponentProgrammaticAsPlugin } from '../../utils/plugins'

function open(propsData) {
    const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue
    const DialogComponent = vm.extend(Dialog)
    return new DialogComponent({
        el: document.createElement('div'),
        propsData
    })
}

const DialogProgrammatic = {
    alert(params) {
        let message
        if (typeof params === 'string') message = params
        const defaultParam = {
            canCancel: false,
            message
        }
        const propsData = Object.assign(defaultParam, params)
        return open(propsData)
    },
    confirm(params) {
        const defaultParam = {}
        const propsData = Object.assign(defaultParam, params)
        return open(propsData)
    },
    prompt(params) {
        const defaultParam = {
            hasInput: true,
            confirmText: 'Done'
        }
        const propsData = Object.assign(defaultParam, params)
        return open(propsData)
    }
}

registerComponentProgrammaticAsPlugin('$dialog', DialogProgrammatic)

export default DialogProgrammatic
