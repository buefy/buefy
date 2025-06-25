import type { App } from 'vue'
import Taginput from './Taginput.vue'

import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue: App) {
        registerComponent(Vue, Taginput)
    }
}

export default Plugin

export {
    Taginput as BTaginput
}
