import { shallowMount } from '@vue/test-utils'
import BColorpickerHSLRepresentationSquare from '@components/colorpicker/ColorpickerHSLRepresentationSquare'
import Color from '../../utils/color'

let defaultProps

describe('BColorpickerHSLRepresentationSquare', () => {
    beforeEach(() => {
        defaultProps = () => ({
            value: Color.parse('#123456')
        })
    })
    it('render correctly', () => {
        const wrapper = shallowMount(BColorpickerHSLRepresentationSquare, {
            propsData: {
                ...defaultProps()
            }
        })

        expect(wrapper.html()).toMatchSnapshot()
    })
})
