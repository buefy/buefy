import { shallow } from '@vue/test-utils'
import BAutocomplete from '@components/autocomplete/Autocomplete'

describe('BAutocomplete', () => {
    it('is called', () => {
        const wrapper = shallow(BAutocomplete)
        expect(wrapper.name()).toBe('BAutocomplete')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
