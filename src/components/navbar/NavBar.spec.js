import { mount } from '@vue/test-utils'
import BNavbar from '@components/navbar/Navbar'

describe('BNavbar', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(BNavbar)
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BNavbar')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('should have a nav tag', () => {
        expect(wrapper.find('nav').exists()).toBeTruthy()
    })

    it('should emmit the sync event when the burger menu was clicked', async () => {
        const anchorTag = wrapper.find('.navbar-burger')
        await anchorTag.trigger('click')
        const valueEmitted = wrapper.emitted()['update:modelValue'][0]
        expect(valueEmitted).toContainEqual(true)
        expect(wrapper.vm.isOpened).toBe(true)
    })

    it('should have the is-active class when we set the active prop manually', async () => {
        const navBar = mount(BNavbar)
        await navBar.setProps({ modelValue: true })
        const menuContainer = navBar.find('.navbar-menu')
        expect(menuContainer.classes('is-active')).toBe(true)
    })

    it('should wrap the slots into a wrapper when we set the wrapperClass prop', () => {
        const navBar = mount(BNavbar, {
            props: {
                wrapperClass: 'container'
            }
        })

        expect(navBar.find('.container').exists()).toBe(true)
    })

    it('manage closing the menu as expected', async () => {
        wrapper.vm.emitUpdateParentEvent = jest.fn()

        await wrapper.setProps({
            modelValue: true,
            closeOnClick: false
        })
        wrapper.vm.closeMenu()

        await wrapper.setProps({
            modelValue: true,
            closeOnClick: true
        })
        wrapper.vm.closeMenu()

        expect(wrapper.vm.internalIsActive).toBeFalsy()
        expect(wrapper.vm.emitUpdateParentEvent).toHaveBeenCalledTimes(1)
    })

    it('set body classes as expected', async () => {
        wrapper.vm.setBodyClass = jest.fn(() => wrapper.vm.setBodyClass)

        await wrapper.setProps({ fixedTop: true })
        expect(wrapper.vm.setBodyClass).toHaveBeenCalled()

        await wrapper.setProps({ fixedTop: false, fixedBottom: true })
        expect(wrapper.vm.setBodyClass).toHaveBeenCalled()
    })
})
