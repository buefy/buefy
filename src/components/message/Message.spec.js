import { shallow } from '@vue/test-utils'
import BMessage from '@components/message/Message'

describe('BMessage', () => {
    it('is called', () => {
        const wrapper = shallow(BMessage)
        expect(wrapper.name()).toBe('BMessage')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
