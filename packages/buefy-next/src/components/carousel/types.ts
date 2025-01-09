// Types shared among the carousel components.

import type { InjectedChild, ProviderParent } from '../../utils/ProvideInjectTypes'

// Interface that `Carousel` is supposed to implement.
export interface ICarousel extends ProviderParent {
    animated: string
    transition?: string
    activeChildIndex: number
}

// Interface that `CarouselItem` is supposed to implement.
export interface ICarouselItem extends InjectedChild {
    isActive: boolean

    $emit: (event: 'click') => void
}
