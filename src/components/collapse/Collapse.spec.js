import { shallowMount } from '@vue/test-utils'
import BCollapse from '@components/collapse/Collapse'

describe('BCollapse', () => {
    it('is called', () => {
        const wrapper = shallowMount(BCollapse)
        expect(wrapper.name()).toBe('BCollapse')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('default props and vm', () => {
        const wrapper = shallowMount(BCollapse)
        expect(wrapper.props().open).toBe(true)
        expect(wrapper.props().animation).toBe('fade')
        expect(wrapper.vm.isOpen).toBe(true)
    })

    it('set default open prop', () => {
        const wrapper = shallowMount(BCollapse, {
            propsData: {
                open: false
            }
        })
        expect(wrapper.props().open).toBe(false)
        expect(wrapper.vm.isOpen).toBe(false)
    })

    it('call toggle method', async () => {
        const wrapper = shallowMount(BCollapse, {
            propsData: {
                open: false
            }
        })
        expect(wrapper.find('.collapse-content').isVisible()).toBe(false)
        wrapper.vm.toggle()
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.isOpen).toBe(true)
        expect(wrapper.find('.collapse-content').isVisible()).toBe(true)
    })

    it('emit a click event', () => {
        const wrapper = shallowMount(BCollapse, {
            propsData: {
                open: false
            }
        })
        expect(wrapper.find('.collapse-content').isVisible()).toBe(false)
        const updateOpen = jest.fn()
        wrapper.vm.$on('update:open', updateOpen)
        wrapper.find('.collapse-trigger').trigger('click')
        expect(updateOpen).toHaveBeenCalledTimes(1)
        expect(updateOpen).toHaveBeenCalledWith(true)
        expect(wrapper.vm.isOpen).toBe(true)
        expect(wrapper.find('.collapse-content').isVisible()).toBe(true)
    })

    it('update open prop', () => {
        const wrapper = shallowMount(BCollapse, {
            propsData: {
                open: false
            }
        })
        expect(wrapper.find('.collapse-content').isVisible()).toBe(false)
        wrapper.setProps({ open: true })
        expect(wrapper.vm.isOpen).toBe(true)
        expect(wrapper.find('.collapse-content').isVisible()).toBe(true)
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
        const wrapper = shallowMount(BCollapse, {
            slots: {
                default: slotDefault
            }
        })
        expect(wrapper.find('.collapse-content :first-child').html()).toBe(slotDefault)
    })

    it('should emit open event', () => {
        const wrapper = shallowMount(BCollapse, {
            propsData: {
                open: false
            }
        })
        const open = jest.fn()
        wrapper.vm.$on('open', open)
        wrapper.find('.collapse-trigger').trigger('click')
        expect(open).toHaveBeenCalledTimes(1)
    })

    it('should emit close event', () => {
        const wrapper = shallowMount(BCollapse, {
            propsData: {
                open: true
            }
        })
        const close = jest.fn()
        wrapper.vm.$on('close', close)
        wrapper.find('.collapse-trigger').trigger('click')
        expect(close).toHaveBeenCalledTimes(1)
    })
})
