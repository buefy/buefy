import Navbar from './Navbar'
import NavbarItem from './NavbarItem'
import NavbarDropdown from './NavbarDropdown'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Navbar)
        registerComponent(Vue, NavbarItem)
        registerComponent(Vue, NavbarDropdown)
    }
}

use(Plugin)

export default Plugin

export {
    Navbar as BNavbar,
    NavbarItem as BNavbarItem,
    NavbarDropdown as BNavbarDropdown
}
