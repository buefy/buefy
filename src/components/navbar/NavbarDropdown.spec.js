import { shallowMount } from '@vue/test-utils'
import BNavbarDropdown from '@components/navbar/NavbarDropdown'

let wrapper

describe('BNavbarDropdown', () => {
    beforeEach(() => {
        wrapper = shallowMount(BNavbarDropdown)
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BNavbarDropdown')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('sets newActive when active prop is changed', async () => {
        await wrapper.setProps({ active: true })
        expect(wrapper.vm.newActive).toBeTruthy()

        await wrapper.setProps({ active: false })
        expect(wrapper.vm.newActive).toBeFalsy()
    })

    it('sets newActive when menu is shown/closed', () => {
        wrapper.vm.showMenu()
        expect(wrapper.vm.newActive).toBeTruthy()

        wrapper.vm.closeMenu()
        expect(wrapper.vm.newActive).toBeFalsy()
    })
})
