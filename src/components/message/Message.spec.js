import { shallowMount } from '@vue/test-utils'
import BMessage from '@components/message/Message'

let wrapper

describe('BMessage', () => {
    beforeEach(() => {
        wrapper = shallowMount(BMessage)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BMessage')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
