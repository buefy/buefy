import type { App } from 'vue'
import Rate from './Rate.vue'
import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue: App) {
        registerComponent(Vue, Rate)
    }
}

export default Plugin

export {
    Rate as BRate
}
