import Vue from 'vue'
import Modal from './Modal'

function open(propsData) {
    const ModalComponent = Vue.extend(Modal)
    return new ModalComponent({
        el: document.createElement('div'),
        propsData
    })
}

export default {
    open(params) {
        let content
        if (typeof params === 'string') content = params

        const defaultParam = {
            content
        }
        const propsData = Object.assign(defaultParam, params)
        return open(propsData)
    }
}
