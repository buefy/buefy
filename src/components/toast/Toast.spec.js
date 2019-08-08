import { shallowMount } from '@vue/test-utils'
import BToast from '@components/toast/Toast'

let wrapper

describe('BToast', () => {
    HTMLElement.prototype.insertAdjacentElement = jest.fn()
    beforeEach(() => {
        wrapper = shallowMount(BToast)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BToast')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
