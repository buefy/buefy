import { shallowMount } from '@vue/test-utils'
import BSliderTick from '@components/slider/SliderTick'

let wrapper
const BSlider = {
    template: '<b-slider-stub></b-slider-stub>',
    data() {
        return {
            _isSlider: true
        }
    }
}

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
