import { shallowMount } from '@vue/test-utils'
import BDropdown from '@components/dropdown/Dropdown'

let wrapper

describe('BDropdown', () => {
    beforeEach(() => {
        wrapper = shallowMount(BDropdown)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BDropdown')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
