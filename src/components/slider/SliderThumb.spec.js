import { shallowMount } from '@vue/test-utils'
import BSliderThumb from '@components/slider/SliderThumb'

let wrapper

describe('BSliderThumb', () => {
    beforeEach(() => {
        wrapper = shallowMount(BSliderThumb)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BSliderThumb')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
