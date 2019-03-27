import { shallowMount } from '@vue/test-utils'
import BTaglist from '@components/tag/Taglist'

describe('BTaglist', () => {
    it('is called', () => {
        const wrapper = shallowMount(BTaglist)

        expect(wrapper.name()).toBe('BTaglist')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
