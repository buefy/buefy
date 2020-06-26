import { shallowMount } from '@vue/test-utils'
import BCarouselItem from '@components/carousel/CarouselItem'
import { default as ProviderParentMixin, Sorted } from '../../utils/ProviderParentMixin'

let wrapper
const BCarousel = {
    template: '<b-carousel-stub></b-carousel-stub>',
    mixins: [ProviderParentMixin('carousel', Sorted)]
}

describe('BCarouselItem', () => {
    beforeEach(() => {
        wrapper = shallowMount(BCarouselItem, {
            parentComponent: BCarousel
        })
    })

    it('is vue instance', () => {
        expect(wrapper.name()).toBe('BCarouselItem')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
