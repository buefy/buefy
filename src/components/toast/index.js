import Vue from 'vue'
import Toast from './Toast'

function open(propsData) {
    const ToastComponent = Vue.extend(Toast)
    return new ToastComponent({
        el: document.createElement('div'),
        propsData
    })
}

export default {
    open(params) {
        let message
        if (typeof params === 'string') message = params

        const defaultParam = {
            type: 'is-dark',
            duration: 2000,
            message
        }
        const propsData = Object.assign(defaultParam, params)
        return open(propsData)
    }
}
