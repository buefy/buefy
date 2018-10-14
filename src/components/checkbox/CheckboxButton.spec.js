import { shallowMount } from '@vue/test-utils'
import BCheckboxButton from '@components/checkbox/CheckboxButton'

describe('BCheckboxButton', () => {
    it('is called', () => {
        const wrapper = shallowMount(BCheckboxButton)
        expect(wrapper.name()).toBe('BCheckboxButton')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
