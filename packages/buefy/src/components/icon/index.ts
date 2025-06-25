import type { App } from 'vue'

import Icon from './Icon.vue'

import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue: App) {
        registerComponent(Vue, Icon)
    }
}

export default Plugin

export {
    Icon as BIcon
}
