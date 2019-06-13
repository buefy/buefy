import { shallowMount } from '@vue/test-utils'
import BClockpicker from '@components/clockpicker/Clockpicker'

describe('BClockpicker', () => {
    it('is called', () => {
        const wrapper = shallowMount(BClockpicker)
        expect(wrapper.name()).toBe('BClockpicker')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
