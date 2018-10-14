import { shallowMount } from '@vue/test-utils'
import BSwitch from '@components/switch/Switch'

describe('BSwitch', () => {
    it('is called', () => {
        const wrapper = shallowMount(BSwitch)

        expect(wrapper.name()).toBe('BSwitch')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
