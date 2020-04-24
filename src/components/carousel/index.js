import Carousel from './Carousel'
import CarouselItem from './CarouselItem'
import CarouselList from './CarouselList'

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
