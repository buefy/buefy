import Datetimepicker from './Datetimepicker.vue'

import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Datetimepicker)
    }
}

export default Plugin

export {
    Datetimepicker as BDatetimepicker
}
