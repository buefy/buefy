import { shallowMount } from '@vue/test-utils'
import BClockpickerFace from '@components/clockpicker/ClockpickerFace'

describe('BClockpickerFace', () => {
    it('is called', () => {
        const wrapper = shallowMount(BClockpickerFace)

        expect(wrapper.name()).toBe('BClockpickerFace')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
