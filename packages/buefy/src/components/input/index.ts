import type { App } from 'vue'

import Input from './Input.vue'

import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue: App) {
        registerComponent(Vue, Input)
    }
}

export default Plugin

export {
    Input as BInput
}
