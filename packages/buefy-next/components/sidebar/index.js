import Sidebar from './Sidebar.vue'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Sidebar)
    }
}

use(Plugin)

export default Plugin

export {
    Sidebar as BSidebar
}
