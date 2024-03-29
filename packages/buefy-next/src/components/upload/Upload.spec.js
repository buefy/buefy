import { shallowMount } from '@vue/test-utils'
import BUpload from '@components/upload/Upload'

let wrapper

describe('BUpload', () => {
    beforeEach(() => {
        wrapper = shallowMount(BUpload)
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BUpload')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    describe('with fallthrough attributes', () => {
        const attrs = {
            class: 'fallthrough-class',
            style: 'font-size: 2rem;',
            id: 'fallthrough-id'
        }

        it('should apply class, style, and id to the root <label> element if compatFallthrough is true (default)', () => {
            const wrapper = shallowMount(BUpload, { attrs })

            const root = wrapper.find('label.upload')
            expect(root.classes(attrs.class)).toBe(true)
            expect(root.attributes('style')).toBe(attrs.style)
            expect(root.attributes('id')).toBe(attrs.id)

            const input = wrapper.find({ ref: 'input' })
            expect(input.classes(attrs.class)).toBe(false)
            expect(input.attributes('style')).toBeUndefined()
            expect(input.attributes('id')).toBeUndefined()
        })

        it('should apply class, style, and id to the underlying <input> element if compatFallthrough is false', () => {
            const wrapper = shallowMount(BUpload, {
                attrs,
                props: {
                    compatFallthrough: false
                }
            })

            const root = wrapper.find('label.upload')
            expect(root.classes(attrs.class)).toBe(false)
            expect(root.attributes('style')).toBeUndefined()
            expect(root.attributes('id')).toBeUndefined()

            const input = wrapper.find({ ref: 'input' })
            expect(input.classes(attrs.class)).toBe(true)
            expect(input.attributes('style')).toBe(attrs.style)
            expect(input.attributes('id')).toBe(attrs.id)
        })
    })
})
