import Vue from 'vue'
import Notification from './Notification'
import NotificationNotice from './NotificationNotice'

import config from '../../utils/config'
import { use, registerComponent, registerComponentProgrammatic } from '../../utils/plugins'

const NotificationProgrammatic = {
    open(params) {
        let message
        let parent
        if (typeof params === 'string') message = params

        const defaultParam = {
            message,
            position: config.defaultNotificationPosition || 'is-top-right'
        }
        if (params.parent) {
            parent = params.parent
            delete params.parent
        }
        const propsData = Object.assign(defaultParam, typeof params === 'string' ? {} : params)

        const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue
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
        registerComponent(Vue, Notification)
        registerComponentProgrammatic(Vue, '$notification', NotificationProgrammatic)
    }
}

use(Plugin)

export default Plugin

export {
    Notification,
    NotificationProgrammatic
}
