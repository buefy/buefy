import Avatar from './Avatar'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Avatar)
    }
}

use(Plugin)

export default Plugin

export {
    Avatar as BAvatar
}
