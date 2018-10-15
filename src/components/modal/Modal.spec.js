import { shallowMount } from '@vue/test-utils'
import BModal from '@components/modal/Modal'

describe('BModal', () => {
    it('is called', () => {
        const wrapper = shallowMount(BModal)
        expect(wrapper.name()).toBe('BModal')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
