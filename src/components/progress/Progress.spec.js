import { shallowMount } from '@vue/test-utils'
import BProgress from '@components/progress/Progress'

describe('BProgress', () => {
    it('is called', () => {
        const wrapper = shallowMount(BProgress)
        expect(wrapper.name()).toBe('BProgress')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
