import Message from './Message.vue'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Message)
    }
}

use(Plugin)

export default Plugin

export {
    Message as BMessage
}
