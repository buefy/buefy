import Slider from './Slider'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Slider)
    }
}

use(Plugin)

export default Plugin

export {
    Slider
}
