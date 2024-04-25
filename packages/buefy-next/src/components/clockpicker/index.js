import Clockpicker from './Clockpicker.vue'

import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Clockpicker)
    }
}

export default Plugin

export {
    Clockpicker as BClockpicker
}
