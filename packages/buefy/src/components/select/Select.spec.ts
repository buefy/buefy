import { shallowMount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import BSelect from '@components/select/Select.vue'

let wrapper: VueWrapper<InstanceType<typeof BSelect>>

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

    describe('validation behavior', () => {
        it('should pass required attribute to native select element', () => {
            const wrapper = shallowMount(BSelect, {
                attrs: {
                    required: true
                }
            })

            const select = wrapper.find('select')
            expect(select.attributes('required')).toBeDefined()
        })

        it('should trigger validation on blur when required and no value selected', async () => {
            const wrapper = shallowMount(BSelect, {
                props: {
                    placeholder: 'Select an option',
                    useHtml5Validation: true
                },
                attrs: {
                    required: true
                }
            })

            // Initially should be valid (not dirty)
            expect(wrapper.vm.isValid).toBe(true)

            // Simulate focus and blur without selecting a value
            const select = wrapper.find('select')
            await select.trigger('focus')
            await select.trigger('blur')

            // Should now be invalid due to required validation
            expect(wrapper.vm.isValid).toBe(false)
        })

        it('should handle required validation with null placeholder value', async () => {
            const wrapper = shallowMount(BSelect, {
                props: {
                    placeholder: 'Choose...',
                    useHtml5Validation: true
                },
                attrs: {
                    required: true
                }
            })

            // Verify placeholder option has empty string value
            const placeholderOption = wrapper.find('option[disabled]')
            expect(placeholderOption.attributes('value')).toBe('')
            expect(placeholderOption.text()).toBe('Choose...')

            // Simulate interaction that should trigger validation
            const select = wrapper.find('select')
            await select.trigger('focus')
            await select.trigger('blur')

            // Check that HTML5 validation was called
            expect(wrapper.vm.isValid).toBe(false)
        })

        it('should become valid when a value is selected after being invalid', async () => {
            const wrapper = shallowMount(BSelect, {
                props: {
                    placeholder: 'Select...',
                    useHtml5Validation: true
                },
                attrs: {
                    required: true
                },
                slots: {
                    default: '<option value="test">Test Option</option>'
                }
            })

            // Make it invalid first
            const select = wrapper.find('select')
            await select.trigger('focus')
            await select.trigger('blur')
            expect(wrapper.vm.isValid).toBe(false)

            // Simulate actual user selection by changing the DOM value and triggering change
            const selectElement = select.element as HTMLSelectElement
            selectElement.value = 'test'
            await select.trigger('change')

            // Should become valid after change event
            expect(wrapper.vm.isValid).toBe(true)
        })

        it('should work with multiple select and required validation', async () => {
            const wrapper = shallowMount(BSelect, {
                props: {
                    multiple: true,
                    useHtml5Validation: true
                },
                attrs: {
                    required: true
                }
            })

            // Should start as valid
            expect(wrapper.vm.isValid).toBe(true)

            // Focus and blur without selection
            const select = wrapper.find('select')
            await select.trigger('focus')
            await select.trigger('blur')

            // Should be invalid for multiple select with no selections
            expect(wrapper.vm.isValid).toBe(false)
        })
    })
})
