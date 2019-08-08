import { shallowMount } from '@vue/test-utils'
import BDialog from '@components/dialog/Dialog'

describe('BDialog', () => {
    HTMLElement.prototype.focus = jest.fn()

    it('is called', () => {
        const wrapper = shallowMount(BDialog, {
            attachToDocument: true
        })
        expect(wrapper.name()).toBe('BDialog')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('should return correct icon depending on type', () => {
        const wrapper = shallowMount(BDialog, {
            attachToDocument: true
        })
        const expected = {
            'is-info': 'information',
            'is-success': 'check-circle',
            'is-warning': 'alert',
            'is-danger': 'alert-circle',
            'other': null
        }
        for (let [key, value] of Object.entries(expected)) {
            wrapper.setProps({type: key})
            expect(wrapper.vm.iconByType).toEqual(value)
        }
    })

    it('should reset isActive on close', () => {
        const wrapper = shallowMount(BDialog, {
            attachToDocument: true
        })
        wrapper.vm.close()
        expect(wrapper.vm.isActive).toBeFalsy()
    })

    it('gives focus to the input element if it contains one', (done) => {
        const wrapper = shallowMount(BDialog, {
            attachToDocument: true,
            propsData: {
                hasInput: true
            }
        })
        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.$refs.input.focus).toHaveBeenCalled()
            done()
        })
    })
})
