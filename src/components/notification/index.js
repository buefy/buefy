import { createApp, h as createElement } from 'vue'

import Notification from './Notification.vue'
import NotificationNotice from './NotificationNotice.vue'

import config from '../../utils/config'
import { merge, copyAppContext, getComponentFromVNode } from '../../utils/helpers'
import { use, registerComponent, registerComponentProgrammatic } from '../../utils/plugins'

class NotificationProgrammatic {
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
            position: config.defaultNotificationPosition || 'is-top-right'
        }
        if (params.parent) {
            delete params.parent
        }
        let onClose
        if (typeof params.onClose === 'function') {
            onClose = params.onClose
            delete params.onClose
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
                    noticeVNode: null
                }
            },
            methods: {
                close() {
                    const notice = getComponentFromVNode(this.noticeVNode)
                    if (notice) {
                        notice.close()
                    }
                }
            },
            render() {
                this.noticeVNode = createElement(
                    NotificationNotice,
                    {
                        ...propsData,
                        onClose: () => {
                            if (onClose != null) {
                                onClose()
                            }
                            // waits for a while in favor of animation
                            setTimeout(() => {
                                vueInstance.unmount()
                            }, 150)
                        }
                    },
                    slot != null ? { default: () => slot } : undefined
                )
                return this.noticeVNode
            }
        })
        if (this.app) {
            copyAppContext(this.app, vueInstance)
        } else {
            // workaround for an error that
            // $buefy.globalNoticeInterval is not defined
            vueInstance.use({
                install: (Vue) => {
                    Vue.config.globalProperties.$buefy = {
                        globalNoticeInterval: null
                    }
                }
            })
        }
        return vueInstance.mount(container)
    }
}

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Notification)
        registerComponentProgrammatic(Vue, 'notification', new NotificationProgrammatic(Vue))
    }
}

use(Plugin)

export default Plugin

export {
    NotificationProgrammatic,
    Notification as BNotification
}
