import { shallowMount } from '@vue/test-utils'
import BColorPickerHSLRepresentationSquare from '@components/colorpicker/ColorPickerHSLRepresentationSquare'
import Color from '../../utils/color'

let defaultProps

describe('BColorPickerHSLRepresentationSquare', () => {
    beforeEach(() => {
        defaultProps = () => ({
            value: Color.parse('#123456')
        })
    })
    it('render correctly', () => {
        const wrapper = shallowMount(BColorPickerHSLRepresentationSquare, {
            propsData: {
                ...defaultProps()
            }
        })

        expect(wrapper.html()).toMatchSnapshot()
    })
})
