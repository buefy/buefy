import Tabs from './Tabs'
import TabItem from './TabItem'

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
    Tabs,
    TabItem
}
