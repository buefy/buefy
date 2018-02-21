import { shallow } from '@vue/test-utils'
import BRadio from '@components/radio/Radio'

describe('BRadio', () => {
    it('is called', () => {
        const wrapper = shallow(BRadio)
        expect(wrapper.name()).toBe('BRadio')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
