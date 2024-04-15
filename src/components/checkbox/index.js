import Checkbox from './Checkbox.vue'
import CheckboxButton from './CheckboxButton.vue'

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
