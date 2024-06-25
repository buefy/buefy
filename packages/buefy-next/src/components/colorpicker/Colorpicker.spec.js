import { shallowMount } from '@vue/test-utils'
import BColorpicker from '@components/colorpicker/Colorpicker'

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
