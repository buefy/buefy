import { shallowMount } from '@vue/test-utils'
import BMessage from '@components/message/Message'

describe('BMessage', () => {
    it('is called', () => {
        const wrapper = shallowMount(BMessage)
        expect(wrapper.name()).toBe('BMessage')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
