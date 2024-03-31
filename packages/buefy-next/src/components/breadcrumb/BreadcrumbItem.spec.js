import { mount } from '@vue/test-utils'
import BBreadcrumbItem from '@components/breadcrumb/BreadcrumbItem'

describe('BBreadcrumbItem', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(BBreadcrumbItem, {
            props: {
                tag: 'a'
            }
        })
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('should have a li tag', () => {
        expect(wrapper.find('li').exists()).toBeTruthy()
    })

    describe('with fallthrough attributes', () => {
        const attrs = {
            class: 'fallthrough-class',
            style: 'font-size: 2rem;',
            id: 'fallthrough-id'
        }

        it('should bind class, style, and id to the root li if compatFallthrough is true (default)', async () => {
            const wrapper = mount(BBreadcrumbItem, {
                attrs,
                props: {
                    tag: 'a'
                }
            })

            const root = wrapper.find('li')
            expect(root.classes(attrs.class)).toBe(true)
            expect(root.attributes('style')).toBe(attrs.style)
            expect(root.attributes('id')).toBe(attrs.id)

            const anchor = wrapper.find('a')
            expect(anchor.classes(attrs.class)).toBe(false)
            expect(anchor.attributes('style')).toBeUndefined()
            expect(anchor.attributes('id')).toBeUndefined()
        })

        it('should bind class, style, and id to the underlying tag if compatFallthrough is false', async () => {
            const wrapper = mount(BBreadcrumbItem, {
                attrs,
                props: {
                    compatFallthrough: false,
                    tag: 'a'
                }
            })

            const root = wrapper.find('li')
            expect(root.classes(attrs.class)).toBe(false)
            expect(root.attributes('style')).toBeUndefined()
            expect(root.attributes('id')).toBeUndefined()

            const anchor = wrapper.find('a')
            expect(anchor.classes(attrs.class)).toBe(true)
            expect(anchor.attributes('style')).toBe(attrs.style)
            expect(anchor.attributes('id')).toBe(attrs.id)
        })
    })
})
