import Radio from './Radio'
import RadioButton from './RadioButton'

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
    Radio,
    RadioButton
}
