import { shallowMount } from '@vue/test-utils'
import BColorpicker from '@components/colorpicker/Colorpicker'

describe('BColorpicker', () => {
    it('render correctly', () => {
        const wrapper = shallowMount(BColorpicker)

        expect(wrapper.html()).toMatchSnapshot()
    })
})
