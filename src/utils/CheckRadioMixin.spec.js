import { shallowMount } from '@vue/test-utils'
import CheckRadioMixin from '@utils/CheckRadioMixin'

let wrapper

describe('CheckRadioMixin', () => {
    HTMLElement.prototype.insertAdjacentElement = jest.fn()
    beforeEach(() => {
        const component = {
            template: '<div class="b-component"></div>'
        }
        wrapper = shallowMount(component, {
            attachToDocument: true,
            mixins: [CheckRadioMixin]
        })
    })

    it('set value prop', () => {
        wrapper.setProps({
            value: 'test'
        })
        expect(wrapper.vm.newValue).toEqual('test')
    })
})
