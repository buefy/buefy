import Menu from './Menu.vue'
import MenuList from './MenuList.vue'
import MenuItem from './MenuItem.vue'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Menu)
        registerComponent(Vue, MenuList)
        registerComponent(Vue, MenuItem)
    }
}

use(Plugin)

export default Plugin

export {
    Menu as BMenu,
    MenuList as BMenuList,
    MenuItem as BMenuItem
}
