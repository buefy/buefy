import Tabs from './Tabs.vue'
import TabItem from './TabItem.vue'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Tabs)
        registerComponent(Vue, TabItem)
    }
}

use(Plugin)

export default Plugin

export {
    Tabs as BTabs,
    TabItem as BTabItem
}
