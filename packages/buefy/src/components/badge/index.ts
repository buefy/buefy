import type { App } from 'vue'
import Badge from './Badge.vue'

import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue: App) {
        registerComponent(Vue, Badge)
    }
}

export default Plugin

export {
    Badge as BBadge
}
