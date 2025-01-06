import type { App } from 'vue'
import Sidebar from './Sidebar.vue'

import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue: App) {
        registerComponent(Vue, Sidebar)
    }
}

export default Plugin

export {
    Sidebar as BSidebar
}
