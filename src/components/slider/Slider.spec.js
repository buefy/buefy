import { shallowMount } from '@vue/test-utils'
import BSlider from '@components/slider/Slider'

let wrapper

describe('BSlider', () => {
    beforeEach(() => {
        wrapper = shallowMount(BSlider)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BSlider')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('manage props correctly', () => {
        const newType = 'is-info'
        expect(wrapper.vm.newTooltipType).toBe(wrapper.vm.type)
        wrapper.setProps({ tooltipType: newType })
        expect(wrapper.vm.newTooltipType).toBe(newType)

        const value1 = 3
        const value2 = 5
        const value = [value1, value2]
        const min = 1
        const max = 7
        wrapper.setProps({ value, min, max })
        expect(wrapper.vm.value1).toBe(value1)
        expect(wrapper.vm.value2).toBe(value2)
        expect(wrapper.vm.minValue).toBe(value1)
        expect(wrapper.vm.maxValue).toBe(value2)

        expect(wrapper.vm.tickValues).toEqual([])
        wrapper.setProps({ ticks: true })
        expect(wrapper.vm.tickValues).toEqual([2, 3, 4, 5, 6])

        expect(wrapper.vm.precision).toBe(0)
        wrapper.setProps({ step: 0.5 })
        expect(wrapper.vm.precision).toBe(1)
    })

    describe('When biggerSliderFocus is set to true', () => {
        it('renders a component with sliderFocus class', () => {
            wrapper.setProps({biggerSliderFocus: true})
            const subject = wrapper.find('.slider-focus')
            expect(subject.exists()).toBeTruthy()
        })
    })
})
