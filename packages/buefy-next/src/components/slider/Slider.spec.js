import { shallowMount } from '@vue/test-utils'
import BSlider from '@components/slider/Slider'

let wrapper

describe('BSlider', () => {
    beforeEach(() => {
        wrapper = shallowMount(BSlider)
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BSlider')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('manage props correctly', async () => {
        const newType = 'is-info'
        expect(wrapper.vm.newTooltipType).toBe(wrapper.vm.type)
        await wrapper.setProps({ tooltipType: newType })
        expect(wrapper.vm.newTooltipType).toBe(newType)

        const value1 = 3
        const value2 = 5
        const value = [value1, value2]
        const min = 1
        const max = 7
        await wrapper.setProps({ modelValue: value, min, max })
        expect(wrapper.vm.value1).toBe(value1)
        expect(wrapper.vm.value2).toBe(value2)
        expect(wrapper.vm.minValue).toBe(value1)
        expect(wrapper.vm.maxValue).toBe(value2)

        expect(wrapper.vm.tickValues).toEqual([])
        await wrapper.setProps({ ticks: true })
        expect(wrapper.vm.tickValues).toEqual([2, 3, 4, 5, 6])

        expect(wrapper.vm.precision).toBe(0)
        await wrapper.setProps({ step: 0.5 })
        expect(wrapper.vm.precision).toBe(1)
    })

    it('drags correctly', async () => {
        jest.useFakeTimers()

        wrapper.vm.onDragStart()
        expect(wrapper.vm.dragging).toBeTruthy()
        expect(wrapper.emitted().dragstart).toBeTruthy()

        await wrapper.setData({ value1: 50 })
        expect(wrapper.emitted().dragging).toBeTruthy()

        wrapper.vm.onDragEnd()
        expect(wrapper.vm.isTrackClickDisabled).toBeTruthy()
        jest.runOnlyPendingTimers()
        expect(wrapper.vm.isTrackClickDisabled).toBeFalsy()
        expect(wrapper.vm.dragging).toBeFalsy()
        expect(wrapper.emitted().dragend).toBeTruthy()

        await wrapper.setProps({ lazy: true })

        wrapper.vm.onDragStart()
        expect(wrapper.vm.dragging).toBeTruthy()
        expect(wrapper.emitted().dragstart).toBeTruthy()

        wrapper.vm.onDragEnd()
        expect(wrapper.vm.isTrackClickDisabled).toBeTruthy()
        jest.runOnlyPendingTimers()
        expect(wrapper.vm.isTrackClickDisabled).toBeFalsy()
        expect(wrapper.vm.dragging).toBeFalsy()
        expect(wrapper.emitted().dragend).toBeTruthy()
        expect(wrapper.emitted()['update:modelValue']).toBeTruthy()

        jest.useRealTimers()
    })

    it('manage click correctly', async () => {
        const bSlider = wrapper.find('.b-slider')
        wrapper.vm.$refs.button1.setPosition = jest.fn()

        bSlider.trigger('click')
        expect(wrapper.vm.$refs.button1.setPosition).toHaveBeenCalled()
        expect(wrapper.emitted().change).toBeTruthy()

        await wrapper.setProps({ modelValue: [25, 50] })
        wrapper.vm.$refs.button2.setPosition = jest.fn()
        bSlider.trigger('click')
        expect(wrapper.vm.$refs.button1.setPosition).toHaveBeenCalled()
        expect(wrapper.vm.$refs.button2.setPosition).toHaveBeenCalled()
        expect(wrapper.emitted().change).toBeTruthy()
    })

    describe('When biggerSliderFocus is set to true', () => {
        it('renders a component with sliderFocus class', async () => {
            await wrapper.setProps({ biggerSliderFocus: true })
            const subject = wrapper.find('.slider-focus')
            expect(subject.exists()).toBeTruthy()
        })
    })

    it('passes tooltip-always prop to b-slider-thumb component', async () => {
        await wrapper.setProps({ tooltipAlways: true })
        expect(wrapper.findComponent({ ref: 'button1' }).props().tooltipAlways).toBe(true)
        await wrapper.setProps({ modelValue: [25, 50] })
        expect(wrapper.findComponent({ ref: 'button2' }).props().tooltipAlways).toBe(true)
    })
})
