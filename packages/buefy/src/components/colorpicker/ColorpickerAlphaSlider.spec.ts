import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Color from '@utils/color'
import BColorpickerAlphaSlider from '@components/colorpicker/ColorpickerAlphaSlider.vue'

describe('BColorpickerAlphaSlider', () => {
    it('render correctly', () => {
        const wrapper = shallowMount(BColorpickerAlphaSlider, {
            props: {
                value: 100,
                color: Color.parse('#123456')
            }
        })

        expect(wrapper.html()).toMatchSnapshot()
    })
})
