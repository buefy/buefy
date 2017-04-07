import Vue from 'vue'
import Snackbar from './Snackbar'

function open(propsData) {
    const SnackbarComponent = Vue.extend(Snackbar)
    return new SnackbarComponent({
        el: document.createElement('div'),
        propsData
    })
}

export default {
    open(params) {
        let message
        if (typeof params === 'string') message = params

        const defaultParam = {
            type: 'is-success',
            position: 'bottom-right',
            duration: 3500,
            message
        }
        const propsData = Object.assign(defaultParam, params)
        return open(propsData)
    }
}
