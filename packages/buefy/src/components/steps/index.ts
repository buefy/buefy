import type { App } from 'vue'
import Steps from './Steps.vue'
import StepItem from './StepItem.vue'

import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue: App) {
        registerComponent(Vue, Steps)
        registerComponent(Vue, StepItem)
    }
}

export default Plugin

export {
    Steps as BSteps,
    StepItem as BStepItem
}
