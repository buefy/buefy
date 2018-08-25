import { shallow } from '@vue/test-utils'
import BMenu from '@components/menu/Menu'
import BSubmenu from '@components/menu/Submenu'
import BMenuitem from '@components/menu/Menuitem'

describe('BMenu', () => {
    it('is called', () => {
        const wrapper = shallow(BMenu)
        expect(wrapper.name()).toBe('BMenu')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})

describe('BSubmenu', () => {
    it('is called', () => {
        const wrapper = shallow(BSubmenu)
        expect(wrapper.name()).toBe('BSubmenu')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})

describe('BMenuitem', () => {
    it('is called', () => {
        const wrapper = shallow(BMenuitem)
        expect(wrapper.name()).toBe('BMenuitem')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
