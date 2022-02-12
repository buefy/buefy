import { shallowMount } from '@vue/test-utils'
import BColorPickerHSLRepresentationTriangle from '@components/colorpicker/ColorPickerHSLRepresentationTriangle'
import Color from '../../utils/color'

let defaultProps

describe('BColorPickerHSLRepresentationTriangle', () => {
    beforeEach(() => {
        defaultProps = () => ({
            value: Color.parse('#123456')
        })
    })
    it('render correctly', () => {
        const wrapper = shallowMount(BColorPickerHSLRepresentationTriangle, {
            propsData: {
                ...defaultProps()
            }
        })

        expect(wrapper.html()).toMatchSnapshot()
    })
})
