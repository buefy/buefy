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

    it('sets newActive when active prop is changed', () => {
        wrapper.setProps({active: true})
        expect(wrapper.vm.newActive).toBeTruthy()

        wrapper.setProps({active: false})
        expect(wrapper.vm.newActive).toBeFalsy()
    })

    it('sets newActive when menu is shown/closed', () => {
        wrapper.vm.showMenu()
        expect(wrapper.vm.newActive).toBeTruthy()

        wrapper.vm.closeMenu()
        expect(wrapper.vm.newActive).toBeFalsy()
    })
})
