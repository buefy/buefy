import { mount } from '@vue/test-utils'
import BMenuList from '@components/menu/MenuList'

let wrapper

describe('BMenuList', () => {
    beforeEach(() => {
        const Menu = {
            components: { BMenuList },
            template: `
            <div>
                <b-menu-list label="Test">
                </b-menu-list>
            </div>
            `
        }
        wrapper = mount(Menu)
    })

    it('is called', () => {
        expect(wrapper.findAll('.menu-label').at(0).text()).toBe('Test')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('slot label', () => {
        expect(wrapper.findAll('.menu-label').at(0).text()).toBe('Test')
    })
})
