import { shallowMount } from '@vue/test-utils'
import NoticeMixin from '@utils/NoticeMixin'

let wrapper

describe('NoticeMixin', () => {
    HTMLElement.prototype.insertAdjacentElement = jest.fn()
    beforeEach(() => {
        const component = {
            template: '<div class="b-component"></div>'
        }
        wrapper = shallowMount(component, {
            attachToDocument: true,
            mixins: [NoticeMixin]
        })
    })

    it('is active', () => {
        expect(wrapper.vm.isActive).toBeTruthy()
    })
})
