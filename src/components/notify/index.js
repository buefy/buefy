import Vue from 'vue'
import Notify from './Notify'

function open(propsData) {
    const NotifyComponent = Vue.extend(Notify)
    return new NotifyComponent({
        el: document.createElement('div'),
        propsData
    })
}

export default {
    open(params) {
        const propsData = Object.assign({}, params)
        return open(propsData)
    },

    info(params) {
        const defaultParam = {
            type: 'is-info'
        }
        const propsData = Object.assign(defaultParam, params)
        return open(propsData)
    },

    warning(params) {
        const defaultParam = {
            type: 'is-warning'
        }
        const propsData = Object.assign(defaultParam, params)
        return open(propsData)
    },

    success(params) {
        const defaultParam = {
            type: 'is-success'
        }
        const propsData = Object.assign(defaultParam, params)
        return open(propsData)
    },

    danger(params) {
        const defaultParam = {
            type: 'is-danger'
        }
        const propsData = Object.assign(defaultParam, params)
        return open(propsData)
    }
}
