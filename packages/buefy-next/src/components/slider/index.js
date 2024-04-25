import Slider from './Slider.vue'
import SliderTick from './SliderTick.vue'

import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Slider)
        registerComponent(Vue, SliderTick)
    }
}

export default Plugin

export {
    Slider as BSlider,
    SliderTick as BSliderTick
}
