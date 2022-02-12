import { shallowMount } from '@vue/test-utils'
import BColorpickerHSLRepresentationTriangle from '@components/colorpicker/ColorpickerHSLRepresentationTriangle'
import Color from '../../utils/color'

let defaultProps

describe('BColorpickerHSLRepresentationTriangle', () => {
    beforeEach(() => {
        defaultProps = () => ({
            value: Color.parse('#123456')
        })
    })
    it('render correctly', () => {
        const wrapper = shallowMount(BColorpickerHSLRepresentationTriangle, {
            propsData: {
                ...defaultProps()
            }
        })

        expect(wrapper.html()).toMatchSnapshot()
    })
})
