import { shallowMount } from '@vue/test-utils'
import BAutocomplete from '@components/autocomplete/Autocomplete'

describe('BAutocomplete', () => {
    it('is called', () => {
        const wrapper = shallowMount(BAutocomplete)
        expect(wrapper.name()).toBe('BAutocomplete')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
