import { shallowMount } from '@vue/test-utils'
import BTimepicker from '@components/timepicker/Timepicker'

let wrapper

describe('BTimepicker', () => {
    beforeEach(() => {
        wrapper = shallowMount(BTimepicker, {
            props: {
                // fixes the locale, and hour format to avoid flaky tests
                locale: 'en-US',
                hourFormat: '24'
            },
            global: {
                stubs: {
                    // these components must not be stubs
                    // to reproduce a snapshot closer to the legacy one
                    //
                    // "disables hour if no selectable minutes available"
                    // test case also depends on slots in <b-select>
                    'b-dropdown': false,
                    'b-dropdown-item': false,
                    'b-field': false,
                    'b-select': false
                }
            }
        })
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BTimepicker')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('returns "1" for nativeStep is enableSeconds is true', async () => {
        expect(wrapper.vm.nativeStep).toBeUndefined()
        await wrapper.setProps({ enableSeconds: true })
        expect(wrapper.vm.nativeStep).toBe('1')
    })

    it('disables hour if no selectable minutes available', async () => {
        await wrapper.setProps({
            minTime: new Date(2019, 8, 22, 11, 55),
            incrementMinutes: 10
        })
        expect(wrapper.find('option[value="11"]').attributes().disabled).toBe('')
        expect(wrapper.find('option[value="12"]').attributes().disabled).toBeUndefined()
    })

    describe('with compat fallthrough', () => {
        const attrs = {
            class: 'fallthrough-class',
            style: 'font-size: 2rem;',
            id: 'fallthrough-id'
        }

        it('should bind class, style, and id to the root div if compatFallthrough is true (default)', async () => {
            const wrapper = shallowMount(BTimepicker, {
                attrs,
                global: {
                    stubs: {
                        'b-dropdown': false
                    }
                }
            })

            const root = wrapper.find('div.timepicker')
            expect(root.classes(attrs.class)).toBe(true)
            expect(root.attributes('style')).toBe(attrs.style)
            expect(root.attributes('id')).toBe(attrs.id)

            const input = wrapper.findComponent({ ref: 'input' })
            expect(input.classes(attrs.class)).toBe(false)
            expect(input.attributes('style')).toBeUndefined()
            expect(input.attributes('id')).toBeUndefined()
        })

        it('should bind class, style, and id to the underlying input if compatFallthrough is false', async () => {
            const wrapper = shallowMount(BTimepicker, {
                attrs,
                props: {
                    compatFallthrough: false
                },
                global: {
                    stubs: {
                        'b-dropdown': false
                    }
                }
            })

            const root = wrapper.find('div.timepicker')
            expect(root.classes(attrs.class)).toBe(false)
            expect(root.attributes('style')).toBeUndefined()
            expect(root.attributes('id')).toBeUndefined()

            const input = wrapper.findComponent({ ref: 'input' })
            expect(input.classes(attrs.class)).toBe(true)
            expect(input.attributes('style')).toBe(attrs.style)
            expect(input.attributes('id')).toBe(attrs.id)
        })
    })
})
