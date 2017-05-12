import Vue from 'vue'
import Dialog from './Dialog'

function open(propsData) {
    const DialogComponent = Vue.extend(Dialog)
    return new DialogComponent({
        el: document.createElement('div'),
        propsData
    })
}

export default {
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
