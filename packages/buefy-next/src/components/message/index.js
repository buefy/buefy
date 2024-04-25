import Message from './Message.vue'

import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Message)
    }
}

export default Plugin

export {
    Message as BMessage
}
