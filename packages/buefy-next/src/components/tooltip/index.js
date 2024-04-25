import Tooltip from './Tooltip.vue'

import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Tooltip)
    }
}

export default Plugin

export {
    Tooltip as BTooltip
}
