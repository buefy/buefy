import Tooltip from './Tooltip.vue'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Tooltip)
    }
}

use(Plugin)

export default Plugin

export {
    Tooltip as BTooltip
}
