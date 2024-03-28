import { shallowMount } from '@vue/test-utils'
import BNavbarDropdown from '@components/navbar/NavbarDropdown'

let wrapper

describe('BNavbarDropdown', () => {
    beforeEach(() => {
        wrapper = shallowMount(BNavbarDropdown)
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BNavbarDropdown')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('sets newActive when active prop is changed', async () => {
        await wrapper.setProps({ active: true })
        expect(wrapper.vm.newActive).toBeTruthy()

        await wrapper.setProps({ active: false })
        expect(wrapper.vm.newActive).toBeFalsy()
    })

    it('sets newActive when menu is shown/closed', () => {
        wrapper.vm.showMenu()
        expect(wrapper.vm.newActive).toBeTruthy()

        wrapper.vm.closeMenu()
        expect(wrapper.vm.newActive).toBeFalsy()
    })

    describe('with fallthrough attributes', () => {
        const attrs = {
            class: 'fallthrough-class',
            style: 'font-size: 2rem;',
            id: 'fallthrough-id'
        }

        it('should apply class, style, and id to the root <div> element if compatFallthrough is true (default)', () => {
            const wrapper = shallowMount(BNavbarDropdown, {
                attrs,
                props: {
                    tag: 'a'
                }
            })

            const root = wrapper.find('div.navbar-item')
            expect(root.classes(attrs.class)).toBe(true)
            expect(root.attributes('style')).toBe(attrs.style)
            expect(root.attributes('id')).toBe(attrs.id)

            const tag = wrapper.find('a.navbar-link')
            expect(tag.classes(attrs.class)).toBe(false)
            expect(tag.attributes('style')).toBeUndefined()
            expect(tag.attributes('id')).toBeUndefined()
        })

        it('should apply class, style, and id to the underlying tag if compatFallthrough is false', () => {
            const wrapper = shallowMount(BNavbarDropdown, {
                attrs,
                props: {
                    compatFallthrough: false,
                    tag: 'a'
                }
            })

            const root = wrapper.find('div.navbar-item')
            expect(root.classes(attrs.class)).toBe(false)
            expect(root.attributes('style')).toBeUndefined()
            expect(root.attributes('id')).toBeUndefined()

            const tag = wrapper.find('a.navbar-link')
            expect(tag.classes(attrs.class)).toBe(true)
            expect(tag.attributes('style')).toBe(attrs.style)
            expect(tag.attributes('id')).toBe(attrs.id)
        })
    })
})
