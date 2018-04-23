import Vue from 'vue'
import Snackbar from './Snackbar'

import { registerComponentProgrammaticAsPlugin } from '../../utils/plugins'

const SnackbarProgrammatic = {
    open(params) {
        let message
        if (typeof params === 'string') message = params

        const defaultParam = {
            type: 'is-success',
            position: 'is-bottom-right',
            message
        }
        const propsData = Object.assign(defaultParam, params)

        const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue
        const SnackbarComponent = vm.extend(Snackbar)
        return new SnackbarComponent({
            el: document.createElement('div'),
            propsData
        })
    }
}

registerComponentProgrammaticAsPlugin('$snackbar', SnackbarProgrammatic)

export default SnackbarProgrammatic
