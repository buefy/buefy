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
        const valueEmitted = wrapper.emitted()['update:isActive'][0]
        expect(valueEmitted).toContainEqual(true)
        expect(wrapper.vm.isOpened).toBe(true)
    })

    it('should have the is-active class when we set the isActive prop manually', () => {
        const navBar = mount(BNavbar)
        navBar.setProps({ isActive: true })
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
})
