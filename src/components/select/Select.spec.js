import { shallow } from '@vue/test-utils'
import BSelect from '@components/select/Select'

describe('BSelect', () => {
    it('is called', () => {
        const wrapper = shallow(BSelect)
        expect(wrapper.name()).toBe('BSelect')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
