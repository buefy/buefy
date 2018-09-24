import Notification from './Notification'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Notification)
    }
}

use(Plugin)

export default Plugin

export {
    Notification
}
