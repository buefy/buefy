import { shallowMount } from '@vue/test-utils'
import Color from '@utils/color'
import BColorpickerHSLRepresentationTriangle from '@components/colorpicker/ColorpickerHSLRepresentationTriangle'

let defaultProps

describe('BColorpickerHSLRepresentationTriangle', () => {
    beforeEach(() => {
        defaultProps = () => ({
            value: Color.parse('#123456')
        })
    })
    it('render correctly', () => {
        const wrapper = shallowMount(BColorpickerHSLRepresentationTriangle, {
            props: {
                ...defaultProps()
            }
        })

        expect(wrapper.html()).toMatchSnapshot()
    })
})
