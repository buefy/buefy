import Vue from 'vue'
import Toast from './Toast'

import { registerComponentProgrammaticAsPlugin } from '../../utils/plugins'

const ToastProgrammatic = {
    open(params) {
        let message
        if (typeof params === 'string') message = params

        const defaultParam = { message }
        const propsData = Object.assign(defaultParam, params)

        const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue
        const ToastComponent = vm.extend(Toast)
        return new ToastComponent({
            el: document.createElement('div'),
            propsData
        })
    }
}

registerComponentProgrammaticAsPlugin('$toast', ToastProgrammatic)

export default ToastProgrammatic
