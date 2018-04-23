import Dropdown from './Dropdown'
import DropdownItem from './DropdownItem'

import { registerComponentsAsPlugin } from '../../utils/plugins'

registerComponentsAsPlugin([Dropdown, DropdownItem])

export {
    Dropdown,
    DropdownItem
}
