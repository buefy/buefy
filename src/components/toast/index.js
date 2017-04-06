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
        const defaultParam = {
            type: 'is-dark',
            duration: 2000
        }
        const propsData = Object.assign(defaultParam, params)
        return open(propsData)
    }
}
