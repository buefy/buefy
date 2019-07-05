import { mount } from '@vue/test-utils'
import BMenuList from '@components/menu/MenuList'

describe('BMenuList', () => {
    it('is called', () => {
        const Menu = {
            components: { BMenuList },
            template: `
              <div>
                <b-menu-list label="Test">
                </b-menu-list>
              </div>
            `
        }
        const wrapper = mount(Menu)
        expect(wrapper.findAll('.menu-label').at(0).text()).toBe('Test')
    })
    it('slot label', () => {
        const Menu = {
            components: { BMenuList },
            template: `
              <div>
                <b-menu-list>
                    <template slot="label">Test</template>
                </b-menu-list>
              </div>
            `
        }
        const wrapper = mount(Menu)
        expect(wrapper.findAll('.menu-label').at(0).text()).toBe('Test')
    })
})
