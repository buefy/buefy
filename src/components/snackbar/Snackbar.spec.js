import { shallowMount } from '@vue/test-utils'
import BSnackbar from '@components/snackbar/Snackbar'

let wrapper

describe('BSnackbar', () => {
    HTMLElement.prototype.insertAdjacentElement = jest.fn()
    beforeEach(() => {
        wrapper = shallowMount(BSnackbar, {
            attachToDocument: true,
            propsData: {
                onAction: jest.fn()
            }
        })
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BSnackbar')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('calls the action listener and close on action', (done) => {
        wrapper.vm.close = jest.fn()
        wrapper.vm.action()
        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.onAction).toHaveBeenCalled()
            expect(wrapper.vm.close).toHaveBeenCalled()
            done()
        })
    })
})
