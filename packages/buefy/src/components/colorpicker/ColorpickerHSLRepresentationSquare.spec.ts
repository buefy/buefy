import { beforeEach, describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Color from '@utils/color'
import BColorpickerHSLRepresentationSquare from '@components/colorpicker/ColorpickerHSLRepresentationSquare.vue'

let defaultProps: () => { value: Color }

describe('BColorpickerHSLRepresentationSquare', () => {
    beforeEach(() => {
        defaultProps = () => ({
            value: Color.parse('#123456')
        })
    })
    it('render correctly', () => {
        const wrapper = shallowMount(BColorpickerHSLRepresentationSquare, {
            props: {
                ...defaultProps()
            }
        })

        expect(wrapper.html()).toMatchSnapshot()
    })
})
