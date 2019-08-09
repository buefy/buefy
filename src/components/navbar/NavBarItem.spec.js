import { shallowMount } from '@vue/test-utils'
import BNavbarItem from '@components/navbar/NavbarItem.vue'

let wrapper

describe('BNavbarItem', () => {
    const tag = 'div'
    beforeEach(() => {
        wrapper = shallowMount(BNavbarItem)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BNavbarItem')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('correctly renders the provided tag', () => {
        wrapper.setProps({tag})
        expect(wrapper.contains(tag)).toBeTruthy()
    })
})
