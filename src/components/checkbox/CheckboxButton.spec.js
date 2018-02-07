import { shallow } from '@vue/test-utils'
import BCheckboxButton from '@components/checkbox/CheckboxButton'

describe('BCheckboxButton', () => {
    it('is called', () => {
        const wrapper = shallow(BCheckboxButton)
        expect(wrapper.name()).toBe('BCheckboxButton')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
