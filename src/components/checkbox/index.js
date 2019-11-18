import Checkbox from './Checkbox'
import CheckboxButton from './CheckboxButton'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Checkbox)
        registerComponent(Vue, CheckboxButton)
    }
}

use(Plugin)

export default Plugin

export {
    Checkbox as BCheckbox,
    CheckboxButton as BCheckboxButton
}
