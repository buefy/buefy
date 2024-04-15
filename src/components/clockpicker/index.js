import Clockpicker from './Clockpicker.vue'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Clockpicker)
    }
}

use(Plugin)

export default Plugin

export {
    Clockpicker as BClockpicker
}
