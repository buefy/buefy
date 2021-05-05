import { createApp, h as createElement } from 'vue'

import Toast from './Toast'

import config from '../../utils/config'
import { merge } from '../../utils/helpers'
import { use, registerComponentProgrammatic } from '../../utils/plugins'

const ToastProgrammatic = {
    open(params) {
        // TODO: should we take care of `parent`?
        // let parent
        if (typeof params === 'string') {
            params = {
                message: params
            }
        }

        const defaultParam = {
            position: config.defaultToastPosition || 'is-top'
        }
        if (params.parent) {
            // parent = params.parent
            delete params.parent
        }
        let slot
        if (Array.isArray(params.message)) {
            slot = params.message
            delete params.message
        }
        const propsData = merge(
            defaultParam,
            params,
            {
                // On Vue 3, $destroy is no longer available.
                // A toast has to be unmounted manually.
                onClose: () => {
                    if (typeof params.onClose === 'function') {
                        params.onClose()
                    }
                    vueInstance.unmount()
                }
            }
        )
        const vueInstance = createApp({
            data() {
                return {
                    toastVNode: null
                }
            },
            methods: {
                close() {
                    // TODO: too much dependence on Vue's internal structure?
                    const toast =
                      this.toastVNode.component?.expose ||
                      this.toastVNode.component?.proxy
                    toast?.close()
                }
            },
            render() {
                this.toastVNode = createElement(
                    Toast,
                    propsData,
                    slot ? { default: () => slot } : undefined
                )
                // we are interested in `toastVNode.component` but
                // at this point `toastVNode.component` is null
                return this.toastVNode
            }
        })
        return vueInstance.mount(document.createElement('div'))
    }
}

const Plugin = {
    install(Vue) {
        registerComponentProgrammatic(Vue, 'toast', ToastProgrammatic)
    }
}

use(Plugin)

export default Plugin

export {
    ToastProgrammatic,
    Toast as BToast
}
