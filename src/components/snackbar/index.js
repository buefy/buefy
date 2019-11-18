import Vue from 'vue'
import Snackbar from './Snackbar'

import config from '../../utils/config'
import { merge } from '../../utils/helpers'
import { use, registerComponentProgrammatic } from '../../utils/plugins'

const SnackbarProgrammatic = {
    open(params) {
        let parent
        if (typeof params === 'string') {
            params = {
                message: params
            }
        }

        const defaultParam = {
            type: 'is-success',
            position: config.defaultSnackbarPosition || 'is-bottom-right'
        }
        if (params.parent) {
            parent = params.parent
            delete params.parent
        }
        const propsData = merge(defaultParam, params)

        const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue
        const SnackbarComponent = vm.extend(Snackbar)
        return new SnackbarComponent({
            parent,
            el: document.createElement('div'),
            propsData
        })
    }
}

const Plugin = {
    install(Vue) {
        registerComponentProgrammatic(Vue, 'snackbar', SnackbarProgrammatic)
    }
}

use(Plugin)

export default Plugin

export {
    SnackbarProgrammatic,
    Snackbar as BSnackbar
}
