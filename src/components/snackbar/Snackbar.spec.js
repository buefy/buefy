import { shallowMount } from '@vue/test-utils'
import BSnackbar from '@components/snackbar/Snackbar'

describe('BSnackbar', () => {
    HTMLElement.prototype.insertAdjacentElement = jest.fn()

    it('is called', () => {
        const wrapper = shallowMount(BSnackbar, {
            attachToDocument: true
        })
        expect(wrapper.name()).toBe('BSnackbar')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
