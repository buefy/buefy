import Select from './Select.vue'

import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Select)
    }
}

export default Plugin

export {
    Select as BSelect
}
