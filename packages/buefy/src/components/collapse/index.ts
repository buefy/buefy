import type { App } from 'vue'
import Collapse from './Collapse.vue'

import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue: App) {
        registerComponent(Vue, Collapse)
    }
}

export default Plugin

export {
    Collapse as BCollapse
}
