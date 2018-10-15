import { shallowMount } from '@vue/test-utils'
import BSelect from '@components/select/Select'

describe('BSelect', () => {
    it('is called', () => {
        const wrapper = shallowMount(BSelect)
        expect(wrapper.name()).toBe('BSelect')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
