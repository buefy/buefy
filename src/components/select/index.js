import Select from './Select'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Select)
    }
}

use(Plugin)

export default Plugin

export {
    Select
}
