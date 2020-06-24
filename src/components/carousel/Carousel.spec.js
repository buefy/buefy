import { shallowMount } from '@vue/test-utils'
import BCarousel from '@components/carousel/Carousel'
import BIcon from '@components/icon/Icon'
import InjectedChildMixin from '../../utils/InjectedChildMixin'

let wrapper

const mockCarouselItems = {
    mixins: [InjectedChildMixin('carousel')],
    name: 'BCarouselItem',
    template: '<div></div>',
    computed: {
        isActive() {
            return this.parent.activeChild === this.index
        }
    }
}

describe('BCarousel', () => {
    beforeEach(() => {
        wrapper = shallowMount(BCarousel, {
            sync: false,
            Component: BIcon,
            propsData: {
                autoplay: false,
                repeat: false
            },
            stubs: {'b-carousel-item': mockCarouselItems},
            slots: {
                default: [
                    '<b-carousel-item/>',
                    '<b-carousel-item/>'
                ]
            }
        })
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BCarousel')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('reacts when value changes', async () => {
        let value = 1
        wrapper.setProps({ value })
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.activeChild).toBe(value)

        value = 0
        wrapper.setProps({ value })
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.activeChild).toBe(value)
    })

    it('reacts when autoplay changes', async () => {
        wrapper.vm.startTimer = jest.fn(wrapper.vm.startTimer)
        wrapper.vm.pauseTimer = jest.fn(wrapper.vm.pauseTimer)
        wrapper.vm.next = jest.fn(wrapper.vm.next)

        let autoplay = true
        wrapper.setProps({ autoplay })
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.autoplay).toBe(autoplay)
        expect(wrapper.vm.startTimer).toHaveBeenCalled()

        autoplay = false
        wrapper.setProps({ autoplay })

        await wrapper.vm.$nextTick()

        expect(wrapper.vm.autoplay).toBe(autoplay)
        expect(wrapper.vm.pauseTimer).toHaveBeenCalled()
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
        expect(wrapper.vm.activeChild).toBe(first)
        wrapper.vm.prev()
        expect(wrapper.vm.activeChild).toBe(first) // Wont go below 0 without repeat prop
        repeat = true
        wrapper.setProps({ repeat })
        wrapper.vm.prev()
        expect(wrapper.vm.activeChild).toBe(last) // Will be set to the last value using repeat

        wrapper.vm.next()
        expect(wrapper.vm.activeChild).toBe(first) // Navigate to the first value with repeat
        wrapper.vm.next()
        expect(wrapper.vm.activeChild).toBe(last)
        repeat = false
        wrapper.setProps({ repeat })
        wrapper.vm.next()
        expect(wrapper.vm.activeChild).toBe(last) // Wont go above last when not using repeat
    })

    it('autoplays', async () => {
        jest.useFakeTimers()
        wrapper.setProps({ autoplay: true, 'pause-hover': false, repeat: false })

        expect(wrapper.vm.activeChild).toBe(0)

        await wrapper.vm.$nextTick()
        jest.runOnlyPendingTimers()
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.activeChild).toBe(1)

        jest.runOnlyPendingTimers()
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.activeChild).toBe(1)

        wrapper.setProps({ repeat: true })

        await wrapper.vm.$nextTick()
        jest.runOnlyPendingTimers()
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.activeChild).toBe(0)
    })

    it('pauses on hover', async () => {
        jest.useFakeTimers()
        wrapper.setProps({ autoplay: true, 'pause-hover': true, repeat: true })

        await wrapper.vm.$nextTick()
        jest.runOnlyPendingTimers()
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.activeChild).toBe(1)

        jest.runOnlyPendingTimers()
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.activeChild).toBe(0)

        wrapper.find('.carousel').trigger('mouseenter')

        jest.runOnlyPendingTimers()
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.activeChild).toBe(0)

        wrapper.find('.carousel').trigger('mouseleave')
        expect(wrapper.vm.activeChild).toBe(0)

        jest.runOnlyPendingTimers()
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.activeChild).toBe(1)
    })

    it('destroys correctly', async () => {
        wrapper.setProps({autoplay: true})
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.timer).toBeTruthy()
        wrapper.destroy()
        expect(wrapper.vm.timer).toBeFalsy()
    })
})
