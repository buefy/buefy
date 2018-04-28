import { shallow } from '@vue/test-utils'
import BButton from '@components/button/Button'

describe('BButton', () => {
    it('is called', () => {
        const wrapper = shallow(BButton)
        expect(wrapper.name()).toBe('BButton')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
