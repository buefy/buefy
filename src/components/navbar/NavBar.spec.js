import { shallowMount, mount } from '@vue/test-utils'
import BNavbar from '@components/navbar/Navbar.vue'
import BNavbarBurger from '@components/navbar/NavbarBurger.vue'
import BNavbarItem from '@components/navbar/NavbarItem.vue'

describe('BNavbar', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(BNavbar)
    })

    it('is called', () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('should the nav tag', () => {
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

    describe('BNavbarBurger', () => {
        let wrapper
        beforeEach(() => {
            wrapper = shallowMount(BNavbarBurger)
        })

        it('is called', () => {
            expect(wrapper.isVueInstance()).toBeTruthy()
        })

        it('should be an anchor tag', () => {
            const anchorTag = wrapper.find('.navbar-burger')
            expect(anchorTag.is('a')).toBe(true)
        })

        it('should have the is-active class when the prop isOpened is true', () => {
            const burgerWrapper = mount(BNavbarBurger)
            burgerWrapper.setProps({ isOpened: true })
            expect(burgerWrapper.classes('is-active')).toBe(true)
        })
    })

    describe('BNavbarItem', () => {
        let wrapper
        beforeEach(() => {
            wrapper = mount(BNavbarItem)
        })

        it('is called', () => {
            expect(wrapper.isVueInstance()).toBeTruthy()
        })

        it('should be an anchor tag by default', () => {
            const anchorTag = wrapper.find('a')
            expect(anchorTag.is('a')).toBe(true)
        })

        xit('should be functional', () => {})
    })
})
