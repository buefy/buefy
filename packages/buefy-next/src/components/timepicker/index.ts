import type { App } from 'vue'

import Timepicker from './Timepicker.vue'

import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue: App) {
        registerComponent(Vue, Timepicker)
    }
}

export default Plugin

export {
    Timepicker as BTimepicker
}
