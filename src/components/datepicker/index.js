import Datepicker from './Datepicker'

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
