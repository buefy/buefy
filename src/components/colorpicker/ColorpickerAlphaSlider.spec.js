import { shallowMount } from '@vue/test-utils'
import Color from '@utils/color'
import BColorpickerAlphaSlider from '@components/colorpicker/ColorpickerAlphaSlider'

describe('BColorpickerAlphaSlider', () => {
    it('render correctly', () => {
        const wrapper = shallowMount(BColorpickerAlphaSlider, {
            propsData: {
                value: 100,
                color: Color.parse('#123456')
            }
        })

        expect(wrapper.html()).toMatchSnapshot()
    })
})
