import { shallowMount } from '@vue/test-utils'
import BCarouselItem from '@components/carousel/CarouselItem'

let wrapper
const BCarousel = {
    template: '<b-carousel-stub></b-carousel-stub>',
    data() {
        return {
            carouselItems: [],
            _isCarousel: true
        }
    }
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

    it('set action when status is called', () => {
        wrapper.vm.status()
        expect(wrapper.vm.isActive).toBeFalsy()
    })
})
