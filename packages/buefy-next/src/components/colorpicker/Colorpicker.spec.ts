import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import BColorpicker from '@components/colorpicker/Colorpicker.vue'

describe('BColorpicker', () => {
    it('render correctly', () => {
        const wrapper = shallowMount(BColorpicker, {
            global: {
                stubs: {
                    // to better reproduce the legacy snapshot
                    'b-button': false,
                    'b-dropdown': false,
                    'b-dropdown-item': false,
                    'b-field': false,
                    'b-field-body': false
                }
            }
        })

        expect(wrapper.html()).toMatchSnapshot()
    })
})
