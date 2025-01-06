import { createApp, h as createElement } from 'vue'
import type { App, ComponentPublicInstance, VNode } from 'vue'

import Snackbar from './Snackbar.vue'
import type { SnackbarProps } from './Snackbar.vue'

import config from '../../utils/config'
import { copyAppContext, getComponentFromVNode } from '../../utils/helpers'
import { registerComponentProgrammatic } from '../../utils/plugins'

type SnackbarOpenParams = Omit<SnackbarProps, 'message'> & {
    // programmatically opened snackbar can have VNode(s) as the message
    message?: string | VNode | (string | VNode)[]
    onClose?: () => void
}

// Minimal definition of a programmatically opened snackbar.
//
// ESLint does not like `{}` as a type but allowed here to make them look
// similar to Vue's definition.
/* eslint-disable @typescript-eslint/ban-types */
type SnackbarProgrammaticInstance = ComponentPublicInstance<
    {}, // P
    {}, // B
    {}, // D
    {}, // C
    { close: () => void } // M
>
/* eslint-enable @typescript-eslint/ban-types */

class SnackbarProgrammatic {
    app: App | undefined // may be undefined in the testing environment

    constructor(app?: App) {
        this.app = app
    }

    open(params: SnackbarOpenParams | string) {
        if (typeof params === 'string') {
            params = {
                message: params
            }
        }

        let slot: SnackbarOpenParams['message']
        let { message, ...restParams } = params
        if (typeof message !== 'string') {
            slot = message
            message = undefined
        }
        const propsData: SnackbarProps = {
            type: 'is-success',
            position: config.defaultSnackbarPosition || 'is-bottom-right',
            queue: true,
            message,
            ...restParams
        }
        const container = document.createElement('div')
        // Vue 3 requires a new app to mount another component
        const vueInstance = createApp({
            data() {
                return {
                    snackbarVNode: null
                }
            },
            methods: {
                close() {
                    const snackbar = getComponentFromVNode(this.snackbarVNode)
                    if (snackbar) {
                        (snackbar as InstanceType<typeof Snackbar>).close()
                    }
                }
            },
            render() {
                this.snackbarVNode = createElement(
                    Snackbar,
                    {
                        ...propsData,
                        onClose() {
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
                return this.snackbarVNode
            }
        })
        if (this.app) {
            copyAppContext(this.app, vueInstance)
        } else {
            // adds $buefy global property so that
            // this.$buefy.globalNoticeInterval is available
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            vueInstance.config.globalProperties.$buefy = {} as any
        }
        return vueInstance.mount(container) as SnackbarProgrammaticInstance
    }
}

const Plugin = {
    install(Vue: App) {
        registerComponentProgrammatic(Vue, 'snackbar', new SnackbarProgrammatic(Vue))
    }
}

export default Plugin

export {
    SnackbarProgrammatic,
    Snackbar as BSnackbar
}
