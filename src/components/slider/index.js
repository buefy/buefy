import Slider from './Slider.vue'
import SliderTick from './SliderTick.vue'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Slider)
        registerComponent(Vue, SliderTick)
    }
}

use(Plugin)

export default Plugin

export {
    Slider as BSlider,
    SliderTick as BSliderTick
}
