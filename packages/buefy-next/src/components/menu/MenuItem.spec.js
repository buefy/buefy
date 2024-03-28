import { shallowMount } from '@vue/test-utils'
import BMenuItem from '@components/menu/MenuItem'

let wrapper

describe('BMenuItem', () => {
    beforeEach(() => {
        wrapper = shallowMount(BMenuItem)
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BMenuItem')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('sets newActive when active is changed', async () => {
        await wrapper.setProps({ active: true })
        expect(wrapper.vm.newActive).toBeTruthy()
    })

    it('sets newExpanded when expanded is changed', async () => {
        await wrapper.setProps({ expanded: true })
        expect(wrapper.vm.newExpanded).toBeTruthy()
    })

    it('manage onClick', async () => {
        wrapper.vm.reset = jest.fn()

        await wrapper.setProps({ disabled: true })
        wrapper.vm.onClick()

        await wrapper.setProps({ disabled: false })
        wrapper.vm.onClick()

        expect(wrapper.vm.reset).toHaveBeenCalledTimes(1)
        expect(wrapper.vm.newExpanded).toBeTruthy()
        expect(wrapper.emitted()['update:expanded'][0]).toContainEqual(true)
    })

    describe('with fallthrough attributes', () => {
        const attrs = {
            class: 'fallthrough-class',
            style: 'font-size: 2rem;',
            id: 'fallthrough-id'
        }

        it('should apply class, style, and id to the root <li> element, if compatFallthrough is true (default)', () => {
            const wrapper = shallowMount(BMenuItem, {
                attrs,
                props: {
                    tag: 'a'
                }
            })

            const root = wrapper.find('li')
            expect(root.classes(attrs.class)).toBe(true)
            expect(root.attributes('style')).toBe(attrs.style)
            expect(root.attributes('id')).toBe(attrs.id)

            const tag = wrapper.find('a')
            expect(tag.classes(attrs.class)).toBe(false)
            expect(tag.attributes('style')).toBeUndefined()
            expect(tag.attributes('id')).toBeUndefined()
        })

        it('should apply class, style, and id to the underlying tag, if compatFallthrough is false', () => {
            const wrapper = shallowMount(BMenuItem, {
                attrs,
                props: {
                    tag: 'a',
                    compatFallthrough: false
                }
            })

            const root = wrapper.find('li')
            expect(root.classes(attrs.class)).toBe(false)
            expect(root.attributes('style')).toBeUndefined()
            expect(root.attributes('id')).toBeUndefined()

            const tag = wrapper.find('a')
            expect(tag.classes(attrs.class)).toBe(true)
            expect(tag.attributes('style')).toBe(attrs.style)
            expect(tag.attributes('id')).toBe(attrs.id)
        })
    })
})
