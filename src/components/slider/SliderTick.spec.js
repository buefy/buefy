import { shallowMount } from '@vue/test-utils'
import BSlider from '@components/slider/Slider'
import BSliderTick from '@components/slider/SliderTick'

let wrapper

describe('BSliderTick', () => {
    beforeEach(() => {
        wrapper = shallowMount(BSliderTick, {
            parentComponent: BSlider
        })
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BSliderTick')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
