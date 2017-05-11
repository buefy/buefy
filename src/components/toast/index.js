import Vue from 'vue'
import Toast from './Toast'

export default {
    open(params) {
        let propsData
        if (typeof params === 'string') {
            propsData = {
                message: params
            }
        } else {
            propsData = params
        }

        const ToastComponent = Vue.extend(Toast)
        return new ToastComponent({
            el: document.createElement('div'),
            propsData
        })
    }
}
