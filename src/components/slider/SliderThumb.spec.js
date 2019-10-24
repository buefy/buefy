import { shallowMount } from '@vue/test-utils'
import BSliderThumb from '@components/slider/SliderThumb'

let wrapper
const BSlider = {
    template: '<b-slider-stub></b-slider-stub>',
    data() {
        return {
            _isSlider: true,
            step: 5,
            precision: 2
        }
    }
} // Mocking only necessary

describe('BSliderThumb', () => {
    beforeEach(() => {
        wrapper = shallowMount(BSliderThumb, {
            parentComponent: BSlider
        })
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BSliderThumb')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('inherits parent properties', () => {
        expect(wrapper.vm.step).toBe(BSlider.data().step)
        expect(wrapper.vm.precision).toBe(BSlider.data().precision)
    })

    it('manage focus', () => {
        wrapper.vm.onFocus()
        expect(wrapper.vm.isFocused).toBeTruthy()

        wrapper.vm.onBlur()
        expect(wrapper.vm.isFocused).toBeFalsy()
    })
})
