import Timepicker from './Timepicker.vue'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Timepicker)
    }
}

use(Plugin)

export default Plugin

export {
    Timepicker as BTimepicker
}
