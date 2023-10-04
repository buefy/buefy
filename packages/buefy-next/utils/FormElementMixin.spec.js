import { shallowMount } from '@vue/test-utils'
import FormElementMixin from '@utils/FormElementMixin'

let wrapper

describe('FormElementMixin', () => {
    HTMLElement.prototype.insertAdjacentElement = jest.fn()
    beforeEach(() => {
        const component = {
            template: '<div class="b-component"></div>',
            mixins: [FormElementMixin]
        }
        wrapper = shallowMount(component, {
            attachTo: document.body
        })
    })

    it('is valid as default', () => {
        expect(wrapper.vm.isValid).toBeTruthy()
    })

    it('should set isFocused and emit focus event on onFocus', (done) => {
        wrapper.vm.onFocus()
        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.isFocused).toBeTruthy()
            expect(wrapper.emitted().focus).toBeTruthy()
            done()
        })
    })

    it('should reset isFocused and emit blur event on onBlur', (done) => {
        wrapper.vm.checkHtml5Validity = jest.fn()
        wrapper.vm.onBlur()
        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.isFocused).toBeFalsy()
            expect(wrapper.emitted().blur).toBeTruthy()
            expect(wrapper.vm.checkHtml5Validity).toHaveBeenCalled()
            done()
        })
    })
})
