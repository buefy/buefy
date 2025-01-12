import type { App } from 'vue'
import Colorpicker from './Colorpicker.vue'

import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue: App) {
        registerComponent(Vue, Colorpicker)
    }
}

export default Plugin

export {
    Colorpicker as BColorpicker
}
