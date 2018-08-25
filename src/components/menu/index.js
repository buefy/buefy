import Menu from './Menu'
import Submenu from './Submenu'
import Menuitem from './Menuitem'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Menu)
        registerComponent(Vue, Submenu)
        registerComponent(Vue, Menuitem)
    }
}

use(Plugin)

export default Plugin
