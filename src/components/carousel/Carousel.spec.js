import { shallowMount } from '@vue/test-utils'
import BCarousel from '@components/carousel/Carousel'

let wrapper

describe('BCarousel', () => {
    beforeEach(() => {
        wrapper = shallowMount(BCarousel)
        wrapper.setData({
            carouselItems: [
                {
                    isActive: true,
                    status: jest.fn(),
                    $slots: {}
                },
                {
                    isActive: false,
                    clickable: false,
                    status: jest.fn(),
                    $slots: {}
                }
            ]
        })
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BCarousel')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
