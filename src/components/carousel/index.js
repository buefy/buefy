import Carousel from './Carousel.vue'
import CarouselItem from './CarouselItem.vue'
import CarouselList from './CarouselList.vue'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Carousel)
        registerComponent(Vue, CarouselItem)
        registerComponent(Vue, CarouselList)
    }
}

use(Plugin)

export default Plugin

export {
    Carousel as BCarousel,
    CarouselItem as BCarouselItem,
    CarouselList as BCarouselList
}
