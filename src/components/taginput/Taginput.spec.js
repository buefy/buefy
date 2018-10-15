import { shallowMount } from '@vue/test-utils'
import BTaginput from '@components/taginput/Taginput'

describe('BTaginput', () => {
    it('is called', () => {
        const wrapper = shallowMount(BTaginput)

        expect(wrapper.name()).toBe('BTaginput')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
