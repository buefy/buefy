import type { App } from 'vue'
import Button from './Button.vue'

import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue: App) {
        registerComponent(Vue, Button)
    }
}

export default Plugin

export {
    Button as BButton
}
