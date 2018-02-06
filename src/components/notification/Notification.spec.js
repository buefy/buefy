import { shallow } from '@vue/test-utils'
import BNotification from '@components/notification/Notification'

describe('BNotification', () => {
    it('is called', () => {
        const wrapper = shallow(BNotification)
        expect(wrapper.name()).toBe('BNotification')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
