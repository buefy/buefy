import Dropdown from './Dropdown'
import DropdownItem from './DropdownItem'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Dropdown)
        registerComponent(Vue, DropdownItem)
    }
}

use(Plugin)

export default Plugin

export {
    Dropdown,
    DropdownItem
}
