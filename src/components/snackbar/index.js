import Snackbar from './Snackbar'

import config, { VueInstance } from '../../utils/config'
import { merge } from '../../utils/helpers'
import { use, registerComponentProgrammatic } from '../../utils/plugins'

let localVueInstance

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
        let slot
        if (Array.isArray(params.message)) {
            slot = params.message
            delete params.message
        }
        const propsData = merge(defaultParam, params)
        const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : localVueInstance || VueInstance
        const SnackbarComponent = vm.extend(Snackbar)
        const component = new SnackbarComponent({
            parent,
            el: document.createElement('div'),
            propsData
        })
        if (slot) {
            component.$slots.default = slot
            component.$forceUpdate()
        }
        return component
    }
}

const Plugin = {
    install(Vue) {
        localVueInstance = Vue
        registerComponentProgrammatic(Vue, 'snackbar', SnackbarProgrammatic)
    }
}

use(Plugin)

export default Plugin

export {
    SnackbarProgrammatic,
    Snackbar as BSnackbar
}
