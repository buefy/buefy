import Sidebar from './Sidebar'

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
