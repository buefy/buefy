import type { App } from 'vue'
import Tabs from './Tabs.vue'
import TabItem from './TabItem.vue'

import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue: App) {
        registerComponent(Vue, Tabs)
        registerComponent(Vue, TabItem)
    }
}

export default Plugin

export {
    Tabs as BTabs,
    TabItem as BTabItem
}
