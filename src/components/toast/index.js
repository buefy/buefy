import { h, ref } from 'vue-demi'

import Toast from './Toast'

import config, { VueInstance } from '../../utils/config'
import { merge } from '../../utils/helpers'
import { use, registerComponentProgrammatic } from '../../utils/plugins'

let localVueInstance

const ToastProgrammatic = {
    open(params) {
        let parent
        if (typeof params === 'string') {
            params = {
                message: params
            }
        }

        const defaultParam = {
            position: config.defaultToastPosition || 'is-top'
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
        const ToastComponent = vm.extend(Toast)
        const component = new ToastComponent({
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
        registerComponentProgrammatic(Vue, 'toast', ToastProgrammatic)
    }
}

use(Plugin)

export default Plugin

/**
 * <template>
 *   <b-button @click="Toast.open">click me</button>
 *   <component :is="Toast">
 *     Success!
 *   </component>
 * </template>
 * <script>
 * export default {
 *   setup() {
 *     const Toast = useToast({ type: 'is-success' })
 *
 *     return { Toast }
 *   }
 * }
 * </script>
 */
function useToast(hookProps) {
    const isOpen = ref(false)

    const UseToast = (props, context) => {
        if (!isOpen.value) return null

        return h(Toast, merge(hookProps, props), context.slots.default)
    }

    UseToast.open = () => { isOpen.value = true }

    return UseToast
}

export {
    ToastProgrammatic,
    Toast as BToast,
    useToast
}
