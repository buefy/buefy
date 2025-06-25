import type { App } from 'vue'

import Carousel from './Carousel.vue'
import CarouselItem from './CarouselItem.vue'
import CarouselList from './CarouselList.vue'

import { registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue: App) {
        registerComponent(Vue, Carousel)
        registerComponent(Vue, CarouselItem)
        registerComponent(Vue, CarouselList)
    }
}

export default Plugin

export {
    Carousel as BCarousel,
    CarouselItem as BCarouselItem,
    CarouselList as BCarouselList
}
