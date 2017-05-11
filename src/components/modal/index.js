import Vue from 'vue'
import Modal from './Modal'

export default {
    open(params) {
        let propsData
        if (typeof params === 'string') {
            propsData = {
                content: params
            }
        } else {
            propsData = params
        }

        const ModalComponent = Vue.extend(Modal)
        return new ModalComponent({
            el: document.createElement('div'),
            propsData
        })
    }
}
