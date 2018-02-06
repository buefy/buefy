import { shallow } from '@vue/test-utils'
import BCheckbox from '@components/checkbox/Checkbox'

describe('BCheckbox', () => {
    it('is called', () => {
        const wrapper = shallow(BCheckbox)
        expect(wrapper.name()).toBe('BCheckbox')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
