import Datetimepicker from './Datetimepicker'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Datetimepicker)
    }
}

use(Plugin)

export default Plugin

export {
    Datetimepicker as BDatetimepicker
}
