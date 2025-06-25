import type { App } from 'vue'

import Datepicker from './Datepicker.vue'

import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue: App) {
        registerComponent(Vue, Datepicker)
    }
}

export default Plugin

export {
    Datepicker as BDatepicker
}
