import Menu from './Menu'
import MenuList from './MenuList'
import MenuItem from './MenuItem'

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
