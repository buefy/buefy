import Navbar from './Navbar'
import NavbarItem from './NavbarItem'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Navbar)
        registerComponent(Vue, NavbarItem)
    }
}

use(Plugin)

export default Plugin

export {
    Navbar,
    NavbarItem
}
