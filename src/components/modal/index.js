import Vue from 'vue'
import Modal from './Modal'

export { Modal }
export default {
    open(params) {
        let content
        let parent
        if (typeof params === 'string') content = params

        const defaultParam = {
            programmatic: true,
            content
        }
        if (params.parent) {
            parent = params.parent
            delete params.parent
        }
        const propsData = Object.assign(defaultParam, params)

        const ModalComponent = Vue.extend(Modal)
        return new ModalComponent({
            parent,
            el: document.createElement('div'),
            propsData
        })
    }
}
