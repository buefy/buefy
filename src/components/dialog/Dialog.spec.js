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
