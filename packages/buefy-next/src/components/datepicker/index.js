import Datepicker from './Datepicker.vue'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Datepicker)
    }
}

use(Plugin)

export default Plugin

export {
    Datepicker as BDatepicker
}
