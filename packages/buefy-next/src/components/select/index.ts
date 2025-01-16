import type { App } from 'vue'
import Select from './Select.vue'

import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue: App) {
        registerComponent(Vue, Select)
    }
}

export default Plugin

export {
    Select as BSelect
}
