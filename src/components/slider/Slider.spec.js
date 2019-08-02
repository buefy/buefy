import { mount } from '@vue/test-utils'
import BSlider from '@components/slider/Slider'

describe('BSlider', () => {
    it('is called', () => {
        const wrapper = mount(BSlider)
        expect(wrapper.name()).toBe('BSlider')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
