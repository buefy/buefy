import { shallowMount } from '@vue/test-utils'
import BNotification from '@components/notification/Notification'

describe('BNotification', () => {
    it('is called', () => {
        const wrapper = shallowMount(BNotification)
        expect(wrapper.name()).toBe('BNotification')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
