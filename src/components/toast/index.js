import Vue from 'vue'
import Toast from './Toast'

export default {
    open(params) {
        let message
        if (typeof params === 'string') message = params

        const defaultParam = { message }
        const propsData = Object.assign(defaultParam, params)

        const ToastComponent = Vue.extend(Toast)
        return new ToastComponent({
            el: document.createElement('div'),
            propsData
        })
    }
}
