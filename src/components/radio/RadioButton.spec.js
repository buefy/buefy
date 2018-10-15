import { shallowMount } from '@vue/test-utils'
import BRadioButton from '@components/radio/RadioButton'

describe('BRadioButton', () => {
    it('is called', () => {
        const wrapper = shallowMount(BRadioButton)
        expect(wrapper.name()).toBe('BRadioButton')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
