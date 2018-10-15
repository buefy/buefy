import { shallowMount } from '@vue/test-utils'
import BDropdown from '@components/dropdown/Dropdown'

describe('BDropdown', () => {
    it('is called', () => {
        const wrapper = shallowMount(BDropdown)
        expect(wrapper.name()).toBe('BDropdown')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
