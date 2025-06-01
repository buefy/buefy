import { beforeEach, describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Color from '@utils/color'
import BColorpickerHSLRepresentationTriangle from '@components/colorpicker/ColorpickerHSLRepresentationTriangle.vue'

let defaultProps: () => { value: Color }

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
