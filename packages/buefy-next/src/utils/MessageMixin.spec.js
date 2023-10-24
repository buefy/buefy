import { shallowMount } from '@vue/test-utils'
import MessageMixin from '@utils/MessageMixin'

let wrapper

describe('MessageMixin', () => {
    HTMLElement.prototype.insertAdjacentElement = jest.fn()
    beforeEach(() => {
        const component = {
            template: '<div class="b-component"></div>',
            mixins: [MessageMixin]
        }
        wrapper = shallowMount(component, {
            attachTo: document.body
        })
    })

    it('is active', () => {
        expect(wrapper.vm.isActive).toBeTruthy()
    })

    it('should set isActive when active is set', async () => {
        await wrapper.setProps({ modelValue: false })
        expect(wrapper.vm.isActive).toBeFalsy()
    })

    it('should return correct icon depending on type', async () => {
        const expected = {
            'is-info': 'information',
            'is-success': 'check-circle',
            'is-warning': 'alert',
            'is-danger': 'alert-circle',
            other: null
        }
        for (const [key, value] of Object.entries(expected)) {
            await wrapper.setProps({ type: key })
            expect(wrapper.vm.computedIcon).toEqual(value)
        }
    })

    it('should reset isActive and emit close event on close', async () => {
        wrapper.vm.close()
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.isActive).toBeFalsy()
        expect(wrapper.emitted().close).toBeTruthy()
    })
})
