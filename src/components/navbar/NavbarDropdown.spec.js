import { shallowMount } from '@vue/test-utils'
import BNavbarDropdown from '@components/navbar/NavbarDropdown.vue'

let wrapper

describe('BNavbarDropdown', () => {
    beforeEach(() => {
        wrapper = shallowMount(BNavbarDropdown)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BNavbarDropdown')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
