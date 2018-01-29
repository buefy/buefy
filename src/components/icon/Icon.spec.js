import { shallow } from '@vue/test-utils'
import BIcon from '@components/icon/Icon'

describe('BIcon', () => {
    it('is called', () => {
        const wrapper = shallow(BIcon)
        expect(wrapper.name()).toBe('BIcon')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
