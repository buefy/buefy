import { shallowMount } from '@vue/test-utils'
import BCheckbox from '@components/checkbox/Checkbox'

describe('BCheckbox', () => {
    it('is called', () => {
        const wrapper = shallowMount(BCheckbox)
        expect(wrapper.name()).toBe('BCheckbox')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
