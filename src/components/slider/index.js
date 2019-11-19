import Slider from './Slider'
import SliderTick from './SliderTick'

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
