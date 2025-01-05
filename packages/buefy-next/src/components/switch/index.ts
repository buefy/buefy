import type { App } from 'vue'
import Switch from './Switch.vue'

import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue: App) {
        registerComponent(Vue, Switch)
    }
}

export default Plugin

export {
    Switch as BSwitch
}
