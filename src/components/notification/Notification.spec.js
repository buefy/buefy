import { shallowMount } from '@vue/test-utils'
import BNotification from '@components/notification/Notification'

let wrapper

describe('BNotification', () => {
    beforeEach(() => {
        wrapper = shallowMount(BNotification)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BNotification')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
