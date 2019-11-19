import Carousel from './Carousel'
import CarouselItem from './CarouselItem'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Carousel)
        registerComponent(Vue, CarouselItem)
    }
}

use(Plugin)

export default Plugin

export {
    Carousel as BCarousel,
    CarouselItem as BCarouselItem
}
