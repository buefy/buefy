import Checkbox from './Checkbox.vue'
import CheckboxButton from './CheckboxButton.vue'

import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Checkbox)
        registerComponent(Vue, CheckboxButton)
    }
}

export default Plugin

export {
    Checkbox as BCheckbox,
    CheckboxButton as BCheckboxButton
}
