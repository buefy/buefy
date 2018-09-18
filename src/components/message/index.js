import Message from './Message'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Message)
    }
}

use(Plugin)

export default Plugin

export {
    Message
}
