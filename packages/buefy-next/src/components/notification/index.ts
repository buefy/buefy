import { createApp, h as createElement } from 'vue'
import type { App, ComponentPublicInstance, VNode } from 'vue'

import Notification from './Notification.vue'
import type { NotificationProps } from './Notification.vue'
import NotificationNotice from './NotificationNotice.vue'
import type { NotificationNoticeProps } from './NotificationNotice.vue'

import config from '../../utils/config'
import { copyAppContext, getComponentFromVNode } from '../../utils/helpers'
import { registerComponent, registerComponentProgrammatic } from '../../utils/plugins'

export type NotificationOpenParams =
    & Omit<NotificationNoticeProps, 'message'>
    & Omit<
        NotificationProps,
        'duration' | 'message' | 'modelValue' | 'position' | 'type'>
    & {
        message?: string | VNode | (string | VNode)[],
        onClose?: () => void
    }

// Minimal definition of a programmatically opened notification.
//
// ESLint does not like `{}` as a type but allowed here to make them look
// similar to Vue's definition.
/* eslint-disable @typescript-eslint/ban-types */
type NotificationProgrammaticInstance = ComponentPublicInstance<
    {}, // P
    {}, // B
    {}, // D
    {}, // C
    { close: () => void } // M
>

class NotificationProgrammatic {
    private app: App | undefined

    constructor(app?: App) {
        this.app = app // may be undefined in the testing environment
    }

    open(params: NotificationOpenParams | string) {
        if (typeof params === 'string') {
            params = {
                message: params
            }
        }

        let slot: NotificationOpenParams['message']
        let { message, ...restParams } = params
        if (typeof message !== 'string') {
            slot = message
            message = undefined
        }
        const propsData = {
            position: config.defaultNotificationPosition || 'is-top-right',
            message,
            ...restParams
        }
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
                        (notice as InstanceType<typeof NotificationNotice>).close()
                    }
                }
            },
            render() {
                this.noticeVNode = createElement(
                    NotificationNotice,
                    {
                        ...propsData,
                        onClose: () => {
                            if (propsData.onClose != null) {
                                propsData.onClose()
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            vueInstance.config.globalProperties.$buefy = {} as any
        }
        return vueInstance.mount(container) as NotificationProgrammaticInstance
    }
}

const Plugin = {
    install(Vue: App) {
        registerComponent(Vue, Notification)
        registerComponentProgrammatic(Vue, 'notification', new NotificationProgrammatic(Vue))
    }
}

export default Plugin

export {
    NotificationProgrammatic,
    Notification as BNotification
}
