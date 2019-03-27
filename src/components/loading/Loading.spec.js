import { shallowMount } from '@vue/test-utils'
import BLoading from '@components/loading/Loading'

describe('BLoading', () => {
    it('Is called', () => {
        const wrapper = shallowMount(BLoading)
        expect(wrapper.name()).toBe('BLoading')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
