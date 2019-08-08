import { mount } from '@vue/test-utils'
import BNavbarItem from '@components/navbar/NavbarItem.vue'

let wrapper

describe('BNavbarItem', () => {
    const tag = 'div'
    beforeEach(() => {
        const NavbarItem = {
            components: { BNavbarItem },
            template: `
            <div>
                <b-navbar-item tag="${tag}"></b-navbar-item>
            </div>
            `
        }
        wrapper = mount(NavbarItem)
    })

    it('is called', () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('correctly renders the provided tag', () => {
        expect(wrapper.contains(tag)).toBeTruthy()
    })
})
