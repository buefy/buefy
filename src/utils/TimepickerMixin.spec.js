import { shallowMount } from '@vue/test-utils'
import TimepickerMixin from '@utils/TimepickerMixin'

let wrapper

describe('TimepickerMixin', () => {
    HTMLElement.prototype.insertAdjacentElement = jest.fn()
    beforeEach(() => {
        const component = {
            template: '<div class="b-component"></div>'
        }
        wrapper = shallowMount(component, {
            attachToDocument: true,
            mixins: [TimepickerMixin]
        })
    })

    it('should call toggle on close', (done) => {
        wrapper.vm.toggle = jest.fn()
        wrapper.vm.close()
        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.toggle).toHaveBeenCalledTimes(1)
            done()
        })
    })
})
