import { shallowMount } from '@vue/test-utils'
import MessageMixin from '@utils/MessageMixin'

let wrapper

describe('MessageMixin', () => {
    HTMLElement.prototype.insertAdjacentElement = jest.fn()
    beforeEach(() => {
        const component = {
            template: '<div class="b-component"></div>'
        }
        wrapper = shallowMount(component, {
            attachToDocument: true,
            mixins: [MessageMixin]
        })
    })

    it('is active', () => {
        expect(wrapper.vm.isActive).toBeTruthy()
    })

    it('should set isActive when active is set', (done) => {
        wrapper.setProps({active: false})
        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.isActive).toBeFalsy()
            done()
        })
    })

    it('should return correct icon depending on type', () => {
        const expected = {
            'is-info': 'information',
            'is-success': 'check-circle',
            'is-warning': 'alert',
            'is-danger': 'alert-circle',
            'other': null
        }
        for (let [key, value] of Object.entries(expected)) {
            wrapper.setProps({type: key})
            expect(wrapper.vm.computedIcon).toEqual(value)
        }
    })

    it('should reset isActive and emit close event on close', (done) => {
        wrapper.vm.close()
        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.isActive).toBeFalsy()
            expect(wrapper.emitted()['close']).toBeTruthy()
            done()
        })
    })
})
