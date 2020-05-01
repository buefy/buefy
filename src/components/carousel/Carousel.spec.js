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
        let value = 1
        wrapper.setProps({ value })
        expect(wrapper.vm.activeItem).toBe(value)

        value = 0
        wrapper.setProps({ value })
        expect(wrapper.vm.activeItem).toBe(value)
    })

    it('reacts when autoplay changes', () => {
        wrapper.vm.startTimer = jest.fn(wrapper.vm.startTimer)
        wrapper.vm.pauseTimer = jest.fn(wrapper.vm.pauseTimer)
        wrapper.vm.next = jest.fn(wrapper.vm.next)

        let autoplay = false
        wrapper.setProps({ autoplay })
        expect(wrapper.vm.autoplay).toBe(autoplay)
        expect(wrapper.vm.pauseTimer).toHaveBeenCalled()

        autoplay = true
        wrapper.setProps({ autoplay })
        expect(wrapper.vm.autoplay).toBe(autoplay)
        expect(wrapper.vm.startTimer).toHaveBeenCalled()
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

    it('manage next and previous accordingly', () => {
        const first = 0
        const last = 1
        let repeat = false
        wrapper.setProps({ value: last, repeat })

        wrapper.vm.prev()
        expect(wrapper.vm.activeItem).toBe(first)
        wrapper.vm.prev()
        expect(wrapper.vm.activeItem).toBe(first) // Wont go below 0 without repeat prop
        repeat = true
        wrapper.setProps({ repeat })
        wrapper.vm.prev()
        expect(wrapper.vm.activeItem).toBe(last) // Will be set to the last value using repeat

        wrapper.vm.next()
        expect(wrapper.vm.activeItem).toBe(first) // Navigate to the first value with repeat
        wrapper.vm.next()
        expect(wrapper.vm.activeItem).toBe(last)
        repeat = false
        wrapper.setProps({ repeat })
        wrapper.vm.next()
        expect(wrapper.vm.activeItem).toBe(last) // Wont go above last when not using repeat
    })
})
