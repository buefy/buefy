import { createApp, h as createElement } from 'vue'

import Snackbar from './Snackbar.vue'

import config from '../../utils/config'
import { merge, copyAppContext, getComponentFromVNode } from '../../utils/helpers'
import { use, registerComponentProgrammatic } from '../../utils/plugins'

class SnackbarProgrammatic {
    constructor(app) {
        this.app = app // may be undefined in the testing environment
    }

    open(params) {
        if (typeof params === 'string') {
            params = {
                message: params
            }
        }

        const defaultParam = {
            type: 'is-success',
            position: config.defaultSnackbarPosition || 'is-bottom-right',
            queue: true
        }
        if (params.parent) {
            delete params.parent
        }
        let slot
        if (Array.isArray(params.message)) {
            slot = params.message
            delete params.message
        }
        const propsData = merge(defaultParam, params)
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
                        snackbar.close()
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
            vueInstance.config.globalProperties.$buefy = {}
        }
        return vueInstance.mount(container)
    }
}

const Plugin = {
    install(Vue) {
        registerComponentProgrammatic(Vue, 'snackbar', new SnackbarProgrammatic(Vue))
    }
}

use(Plugin)

export default Plugin

export {
    SnackbarProgrammatic,
    Snackbar as BSnackbar
}
