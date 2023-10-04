import { shallowMount } from '@vue/test-utils'
import CheckRadioMixin from '@utils/CheckRadioMixin'

let wrapper

describe('CheckRadioMixin', () => {
    HTMLElement.prototype.insertAdjacentElement = jest.fn()
    beforeEach(() => {
        const component = {
            template: '<div class="b-component"></div>',
            mixins: [CheckRadioMixin]
        }
        wrapper = shallowMount(component, {
            attachTo: document.body
        })
    })

    it('set value prop', async () => {
        await wrapper.setProps({
            modelValue: 'test'
        })
        expect(wrapper.vm.newValue).toEqual('test')
    })
})
