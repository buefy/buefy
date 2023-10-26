import Menu from './Menu.vue'
import MenuList from './MenuList.vue'
import MenuItem from './MenuItem.vue'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Menu)
        // explicit `name` is needed to avoid name mangling of
        // Functional Component in production
        registerComponent(Vue, MenuList, 'BMenuList')
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
