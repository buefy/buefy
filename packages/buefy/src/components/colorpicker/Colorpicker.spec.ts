import { describe, expect, it } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import BColorpicker from '@components/colorpicker/Colorpicker.vue'
import Palette from './ColorpickerHSLRepresentationTriangle.vue'
import Color from '../../utils/color'

describe('BColorpicker', () => {
    it('ignores palette input after the open color picker is disabled', async () => {
        const wrapper = mount(BColorpicker, {
            props: { modelValue: '#ff0000' }
        })
        try {
            wrapper.vm.togglePicker(true)
            await wrapper.vm.$nextTick()
            const palette = wrapper.findComponent(Palette)
            expect(palette.exists()).toBe(true)

            await wrapper.setProps({ disabled: true })
            palette.vm.$emit('input', new Color('#00ff00'))
            expect(wrapper.emitted('update:modelValue')).toBeUndefined()
        } finally {
            wrapper.unmount()
        }
    })

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
