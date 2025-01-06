import { createApp, h as createElement } from 'vue'
import type { App, ComponentPublicInstance, VNode } from 'vue'

import Toast from './Toast.vue'
import type { ToastProps } from './Toast.vue'

import config from '../../utils/config'
import { copyAppContext, getComponentFromVNode } from '../../utils/helpers'
import { registerComponentProgrammatic } from '../../utils/plugins'

export type ToastOpenParams = Omit<ToastProps, 'message'> & {
    // programmatically opened toast can have VNode(s) as the message
    message?: string | VNode | (string | VNode)[],
    onClose?: () => void
}

// Minimal definition of a programmatically opened toast.
//
// ESLint does not like `{}` as a type but allowed here to make them look
// similar to Vue's definition.
/* eslint-disable @typescript-eslint/ban-types */
type ToastProgrammaticInstance = ComponentPublicInstance<
    {}, // P
    {}, // B
    {}, // D
    {}, // C
    { close: () => void } // M
>
/* eslint-enable @typescript-eslint/ban-types */

class ToastProgrammatic {
    private app: App | undefined

    constructor(app?: App) {
        this.app = app // may be undefined in the testing environment
    }

    open(params: string | ToastOpenParams) {
        if (typeof params === 'string') {
            params = {
                message: params
            }
        }

        let slot: ToastOpenParams['message']
        let { message, ...restParams } = params
        if (typeof message !== 'string') {
            slot = message
            message = undefined
        }
        const propsData: ToastProps = {
            position: config.defaultToastPosition || 'is-top',
            message,
            ...restParams
        }
        const container = document.createElement('div')
        // Vue 3 requires a new app to mount another component
        const vueInstance = createApp({
            data() {
                return {
                    toastVNode: null
                }
            },
            methods: {
                close() {
                    const toast = getComponentFromVNode(this.toastVNode)
                    if (toast) {
                        (toast as InstanceType<typeof Toast>).close()
                    }
                }
            },
            render() {
                this.toastVNode = createElement(
                    Toast,
                    {
                        ...propsData,
                        // On Vue 3, $destroy is no longer available.
                        // A toast has to be unmounted manually.
                        onClose: () => {
                            if (typeof propsData.onClose === 'function') {
                                propsData.onClose()
                            }
                            // timeout for the animation complete
                            // before unmounting
                            setTimeout(() => {
                                vueInstance.unmount()
                            }, 150)
                        }
                    },
                    slot != null ? { default: () => slot } : undefined
                )
                // we are interested in `toastVNode.component` but
                // at this point `toastVNode.component` should be null
                return this.toastVNode
            }
        })
        if (this.app) {
            copyAppContext(this.app, vueInstance)
        } else {
            // adds $buefy global property
            // so that $buefy.globalNoticeInterval is available on the new Vue app
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            vueInstance.config.globalProperties.$buefy = {} as any
        }
        return vueInstance.mount(container) as ToastProgrammaticInstance
    }
}

const Plugin = {
    install(Vue: App) {
        registerComponentProgrammatic(Vue, 'toast', new ToastProgrammatic(Vue))
    }
}

export default Plugin

export {
    ToastProgrammatic,
    Toast as BToast
}
