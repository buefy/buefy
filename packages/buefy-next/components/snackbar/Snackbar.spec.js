import { shallowMount } from '@vue/test-utils'
import BSnackbar from '@components/snackbar/Snackbar'

let wrapper

describe('BSnackbar', () => {
    HTMLElement.prototype.insertAdjacentElement = jest.fn()
    beforeEach(() => {
        wrapper = shallowMount(BSnackbar, {
            attachTo: document.body,
            props: {
                onAction: jest.fn()
            }
        })
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BSnackbar')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('calls the action listener and close on action', async () => {
        wrapper.vm.close = jest.fn()
        wrapper.vm.action()
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.onAction).toHaveBeenCalled()
        expect(wrapper.vm.close).toHaveBeenCalled()
    })
})
