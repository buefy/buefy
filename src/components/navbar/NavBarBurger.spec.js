import { shallowMount, mount } from '@vue/test-utils'
import BNavbarBurger from '@components/navbar/NavbarBurger.vue'

describe('BNavbarBurger', () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallowMount(BNavbarBurger)
    })

    it('is called', () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
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
