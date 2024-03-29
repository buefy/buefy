import { shallowMount } from '@vue/test-utils'
import BSelect from '@components/select/Select'

let wrapper

describe('BSelect', () => {
    beforeEach(() => {
        wrapper = shallowMount(BSelect)
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BSelect')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('has a select element', () => {
        expect(wrapper.find('select').exists()).toBeTruthy()
    })

    it('emit input event with value when value change', async () => {
        await wrapper.setProps({ modelValue: true })
        expect(wrapper.vm.computedValue).toBeTruthy()
        wrapper.vm.computedValue = false
        const valueEmitted = wrapper.emitted()['update:modelValue'][0]
        expect(valueEmitted).toContainEqual(false)
    })

    describe('with fallthrough attributes', () => {
        const attrs = {
            class: 'fallthrough-class',
            style: 'font-size: 2rem;',
            id: 'fallthrough-id'
        }

        it('should apply class, style, and id to the root <div> element if compatFallthrough is true (default)', () => {
            const wrapper = shallowMount(BSelect, { attrs })

            const root = wrapper.find('div.control')
            expect(root.classes(attrs.class)).toBe(true)
            expect(root.attributes('style')).toBe(attrs.style)
            expect(root.attributes('id')).toBe(attrs.id)

            const select = wrapper.find({ ref: 'select' })
            expect(select.classes(attrs.class)).toBe(false)
            expect(select.attributes('style')).toBeUndefined()
            expect(select.attributes('id')).toBeUndefined()
        })

        it('should apply class, style, and id to the underlying <select> element if compatFallthrough is false', () => {
            const wrapper = shallowMount(BSelect, {
                attrs,
                props: {
                    compatFallthrough: false
                }
            })

            const root = wrapper.find('div.control')
            expect(root.classes(attrs.class)).toBe(false)
            expect(root.attributes('style')).toBeUndefined()
            expect(root.attributes('id')).toBeUndefined()

            const select = wrapper.find({ ref: 'select' })
            expect(select.classes(attrs.class)).toBe(true)
            expect(select.attributes('style')).toBe(attrs.style)
            expect(select.attributes('id')).toBe(attrs.id)
        })
    })
})
