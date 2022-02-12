import { shallowMount } from '@vue/test-utils'
import BColorpickerAlphaSlider from '@components/colorpicker/ColorpickerAlphaSlider'

describe('BColorpickerAlphaSlider', () => {
    it('render correctly', () => {
        const wrapper = shallowMount(BColorpickerAlphaSlider)

        expect(wrapper.html()).toMatchSnapshot()
    })
})
