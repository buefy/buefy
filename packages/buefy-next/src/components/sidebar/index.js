import Sidebar from './Sidebar.vue'

import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Sidebar)
    }
}

export default Plugin

export {
    Sidebar as BSidebar
}
