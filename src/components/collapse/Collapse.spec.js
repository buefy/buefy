import { shallow } from '@vue/test-utils'
import BCollapse from '@components/collapse/Collapse'

describe('BCollapse', () => {
    it('is called', () => {
        const wrapper = shallow(BCollapse)
        expect(wrapper.name()).toBe('BCollapse')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('default props and vm', () => {
        const wrapper = shallow(BCollapse)
        expect(wrapper.props().open).toBe(true)
        expect(wrapper.vm.animation).toBe('fade')
        expect(wrapper.vm.isOpen).toBe(true)
    })

    it('open prop to false', () => {
        const wrapper = shallow(BCollapse, {
            propsData: {
                open: false
            }
        })
        expect(wrapper.props().open).toBe(false)
        expect(wrapper.vm.isOpen).toBe(false)
    })

    it('should call toggle method', async () => {
        const wrapper = shallow(BCollapse, {
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

    it('should emit a click event', () => {
        const wrapper = shallow(BCollapse, {
            propsData: {
                open: false
            }
        })
        expect(wrapper.find('.collapse-content').isVisible()).toBe(false)
        const updateOpen = jest.fn()
        wrapper.vm.$on('update:open', updateOpen)
        wrapper.find('.collapse-trigger').trigger('click')
        expect(updateOpen).toHaveBeenCalledTimes(1)
        expect(wrapper.vm.isOpen).toBe(true)
        expect(wrapper.find('.collapse-content').isVisible()).toBe(true)
    })

    it('should have trigger slot', () => {
        const triggerSlot = '<strong> Header </strong>'
        const wrapper = shallow(BCollapse, {
            slots: {
                trigger: triggerSlot
            }
        })
        expect(wrapper.find('.collapse-trigger').element.innerHTML).toBe(triggerSlot)
    })

    it('should have default slot', () => {
        const slotDefault = '<div> Content </div>'
        const wrapper = shallow(BCollapse, {
            slots: {
                default: slotDefault
            }
        })
        expect(wrapper.find('.collapse-content').element.innerHTML).toBe(slotDefault)
    })
})
