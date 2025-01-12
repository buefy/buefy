import type { App } from 'vue'
import Numberinput from './Numberinput.vue'

import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue: App) {
        registerComponent(Vue, Numberinput)
    }
}

export default Plugin

export {
    Numberinput as BNumberinput
}
