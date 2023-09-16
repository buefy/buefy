import { shallowMount } from '@vue/test-utils'
import BNotification from '@components/notification/Notification'

let wrapper

describe('BNotification', () => {
    beforeEach(() => {
        wrapper = shallowMount(BNotification)
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BNotification')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
