import Vue from 'vue'
import Snackbar from './Snackbar'

export default {
    open(params) {
        let message
        if (typeof params === 'string') message = params

        const defaultParam = {
            type: 'is-success',
            position: 'is-bottom-right',
            message
        }
        const propsData = Object.assign(defaultParam, params)

        const SnackbarComponent = Vue.extend(Snackbar)
        return new SnackbarComponent({
            el: document.createElement('div'),
            propsData
        })
    }
}
