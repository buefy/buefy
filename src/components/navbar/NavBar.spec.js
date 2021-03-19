import { mount } from '@vue/test-utils'
import BNavbar from '@components/navbar/Navbar.vue'

describe('BNavbar', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(BNavbar)
    })

    it('is called', () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('should have a nav tag', () => {
        expect(wrapper.contains('nav')).toBeTruthy()
    })

    it('should emmit the sync event when the burger menu was clicked', () => {
        const anchorTag = wrapper.find('.navbar-burger')
        anchorTag.trigger('click')
        const valueEmitted = wrapper.emitted()['update:active'][0]
        expect(valueEmitted).toContainEqual(true)
        expect(wrapper.vm.isOpened).toBe(true)
    })

    it('should have the is-active class when we set the active prop manually', () => {
        const navBar = mount(BNavbar)
        navBar.setProps({ active: true })
        const menuContainer = navBar.find('.navbar-menu')
        expect(menuContainer.classes('is-active')).toBe(true)
    })

    it('should wrap the slots into a wrapper when we set the wrapperClass prop', () => {
        const navBar = mount(BNavbar, {
            propsData: {
                wrapperClass: 'container'
            }
        })

        expect(navBar.find('.container').exists()).toBe(true)
    })

    it('manage closing the menu as expected', () => {
        wrapper.vm.emitUpdateParentEvent = jest.fn()

        wrapper.setProps({
            active: true,
            closeOnClick: false
        })
        wrapper.vm.closeMenu()

        wrapper.setProps({
            active: true,
            closeOnClick: true
        })
        wrapper.vm.closeMenu()

        expect(wrapper.vm.internalIsActive).toBeFalsy()
        expect(wrapper.vm.emitUpdateParentEvent).toHaveBeenCalledTimes(1)
    })

    it('set body classes as expected', async () => {
        wrapper.vm.setBodyClass = jest.fn(() => wrapper.vm.setBodyClass)

        wrapper.setProps({ fixedTop: true })
        expect(wrapper.vm.setBodyClass).toHaveBeenCalled()

        wrapper.setProps({ fixedTop: false, fixedBottom: true })
        expect(wrapper.vm.setBodyClass).toHaveBeenCalled()
    })
})
