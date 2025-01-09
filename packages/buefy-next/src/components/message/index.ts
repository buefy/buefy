import type { App } from 'vue'
import Message from './Message.vue'
import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue: App) {
        registerComponent(Vue, Message)
    }
}

export default Plugin

export {
    Message as BMessage
}
