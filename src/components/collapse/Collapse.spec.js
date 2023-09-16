import { shallowMount } from '@vue/test-utils'
import BCollapse from '@components/collapse/Collapse'

let wrapper

describe('BCollapse', () => {
    describe('default', () => {
        beforeEach(() => {
            wrapper = shallowMount(BCollapse)
        })

        it('is called', () => {
            expect(wrapper.vm).toBeTruthy()
            expect(wrapper.vm.$options.name).toBe('BCollapse')
        })

        it('default props and vm', () => {
            expect(wrapper.props().modelValue).toBe(true)
            expect(wrapper.props().animation).toBe('fade')
            expect(wrapper.vm.isOpen).toBe(true)
        })

        it('render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot()
        })
    })
    describe('open prop is false', () => {
        beforeEach(() => {
            wrapper = shallowMount(BCollapse, {
                props: {
                    modelValue: false,
                    position: 'is-bottom'
                }
            })
        })

        it('set default open prop', () => {
            expect(wrapper.props().modelValue).toBe(false)
            expect(wrapper.vm.isOpen).toBe(false)
        })

        it('call toggle method', async () => {
            expect(wrapper.find('.collapse-content').isVisible()).toBe(false)
            wrapper.vm.toggle()
            await wrapper.vm.$nextTick()
            expect(wrapper.vm.isOpen).toBe(true)
            expect(wrapper.find('.collapse-content').isVisible()).toBe(true)
        })

        it('emit a click event', async () => {
            expect(wrapper.find('.collapse-content').isVisible()).toBe(false)
            wrapper.find('.collapse-trigger').trigger('click')
            await wrapper.vm.$nextTick()
            expect(wrapper.emitted()['update:modelValue']).toEqual([[true]])
            expect(wrapper.vm.isOpen).toBe(true)
            expect(wrapper.find('.collapse-content').isVisible()).toBe(true)
        })

        it('should emit open event', async () => {
            wrapper.find('.collapse-trigger').trigger('click')
            await wrapper.vm.$nextTick()
            expect(wrapper.emitted().open).toBeTruthy()
        })

        it('update open prop', async () => {
            expect(wrapper.find('.collapse-content').isVisible()).toBe(false)
            await wrapper.setProps({ modelValue: true })
            expect(wrapper.vm.isOpen).toBe(true)
            expect(wrapper.find('.collapse-content').isVisible()).toBe(true)
        })
    })

    it('should have trigger slot', () => {
        const triggerSlot = '<strong> Header </strong>'
        const wrapper = shallowMount(BCollapse, {
            slots: {
                trigger: triggerSlot
            }
        })
        expect(wrapper.find('.collapse-trigger :first-child').html()).toBe(triggerSlot)
    })

    it('should have default slot', () => {
        const slotDefault = '<div> Content </div>'
        wrapper = shallowMount(BCollapse, {
            slots: {
                default: slotDefault
            }
        })
        expect(wrapper.find('.collapse-content :first-child').html()).toBe(slotDefault)
    })

    it('should emit close event', async () => {
        wrapper = shallowMount(BCollapse, {
            props: {
                modelValue: true
            }
        })
        wrapper.find('.collapse-trigger').trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.emitted().close).toBeTruthy()
    })
})
