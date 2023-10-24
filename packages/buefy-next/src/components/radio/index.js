import Radio from './Radio.vue'
import RadioButton from './RadioButton.vue'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Radio)
        registerComponent(Vue, RadioButton)
    }
}

use(Plugin)

export default Plugin

export {
    Radio as BRadio,
    RadioButton as BRadioButton
}
