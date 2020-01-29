import Notification from './Notification'
import NotificationNotice from './NotificationNotice'

import config, { VueInstance } from '../../utils/config'
import { merge } from '../../utils/helpers'
import { use, registerComponent, registerComponentProgrammatic } from '../../utils/plugins'

let localVueInstance

const NotificationProgrammatic = {
    open(params) {
        let parent
        if (typeof params === 'string') {
            params = {
                message: params
            }
        }

        const defaultParam = {
            position: config.defaultNotificationPosition || 'is-top-right'
        }
        if (params.parent) {
            parent = params.parent
            delete params.parent
        }
        const propsData = merge(defaultParam, params)

        const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : localVueInstance || VueInstance
        const NotificationNoticeComponent = vm.extend(NotificationNotice)
        return new NotificationNoticeComponent({
            parent,
            el: document.createElement('div'),
            propsData
        })
    }
}

const Plugin = {
    install(Vue) {
        localVueInstance = Vue
        registerComponent(Vue, Notification)
        registerComponentProgrammatic(Vue, 'notification', NotificationProgrammatic)
    }
}

use(Plugin)

export default Plugin

export {
    NotificationProgrammatic,
    Notification as BNotification
}
