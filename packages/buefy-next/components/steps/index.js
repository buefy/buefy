import Steps from './Steps.vue'
import StepItem from './StepItem.vue'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Steps)
        registerComponent(Vue, StepItem)
    }
}

use(Plugin)

export default Plugin

export {
    Steps as BSteps,
    StepItem as BStepItem
}
