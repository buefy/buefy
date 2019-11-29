import { shallowMount } from '@vue/test-utils'
import BCarousel from '@components/carousel/Carousel'
import BIcon from '@components/icon/Icon'

let wrapper

describe('BCarousel', () => {
    beforeEach(() => {
        wrapper = shallowMount(BCarousel, {
            Component: BIcon
        })
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
    
    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('reacts when value changes', () => {
        const value = 1
        wrapper.setProps({ value })
        expect(wrapper.vm.activeItem).toBe(value)
    })

    it('reacts when autoplay changes', () => {
        const autoplay = false
        wrapper.setProps({ autoplay })
        expect(wrapper.vm.autoplay).toBe(autoplay)
    })

    it('returns item classes accordingly', () => {
        const indicatorBackground = true
        const indicatorCustom = true
        const indicatorInside = true
        const indicatorCustomSize = 'is-small'
        const indicatorPosition = 'is-bottom'
        wrapper.setProps({
            indicatorBackground,
            indicatorCustom,
            indicatorInside,
            indicatorCustomSize,
            indicatorPosition
        })
        expect(wrapper.vm.indicatorClasses).toEqual([
            {
                'has-background': indicatorBackground,
                'has-custom': indicatorCustom,
                'is-inside': indicatorInside
            },
            indicatorCustom && indicatorCustomSize,
            indicatorInside && indicatorPosition
        ])
    })

})
