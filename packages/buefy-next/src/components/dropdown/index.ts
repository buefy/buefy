import type { App } from 'vue'

import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'

import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue: App) {
        registerComponent(Vue, Dropdown)
        registerComponent(Vue, DropdownItem)
    }
}

export default Plugin

export {
    Dropdown as BDropdown,
    DropdownItem as BDropdownItem
}
