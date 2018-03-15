import { shallow } from '@vue/test-utils'
import BInput from '@components/input/Input'

describe('BInput', () => {
    it('Is called', () => {
        const wrapper = shallow(BInput)
        expect(wrapper.name()).toBe('BInput')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
