import { shallowMount, mount } from '@vue/test-utils'
import BNavbarBurger from '@components/navbar/NavbarBurger'

describe('BNavbarBurger', () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallowMount(BNavbarBurger)
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('NavbarBurger')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('should be an anchor tag', () => {
        expect(wrapper.find('a.navbar-burger').exists()).toBeTruthy()
    })

    it('should have the is-active class when the prop isOpened is true', async () => {
        const burgerWrapper = mount(BNavbarBurger)
        await burgerWrapper.setProps({ isOpened: true })
        expect(burgerWrapper.classes('is-active')).toBe(true)
    })
})
