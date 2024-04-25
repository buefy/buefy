import Navbar from './Navbar.vue'
import NavbarItem from './NavbarItem.vue'
import NavbarDropdown from './NavbarDropdown.vue'

import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Navbar)
        registerComponent(Vue, NavbarItem)
        registerComponent(Vue, NavbarDropdown)
    }
}

export default Plugin

export {
    Navbar as BNavbar,
    NavbarItem as BNavbarItem,
    NavbarDropdown as BNavbarDropdown
}
