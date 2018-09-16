import Icon from './Icon'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Icon)
    }
}

use(Plugin)

export default Plugin

export {
    Icon
}
