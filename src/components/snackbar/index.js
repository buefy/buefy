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
        const defaultParam = {
            type: 'is-success',
            duration: 4000
        }

        const propsData = Object.assign(defaultParam, params)
        return open(propsData)
    }
}
