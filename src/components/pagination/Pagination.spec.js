import { shallowMount } from '@vue/test-utils'
import BPagination from '@components/pagination/Pagination'

describe('BPagination', () => {
    it('is called', () => {
        const wrapper = shallowMount(BPagination)
        expect(wrapper.name()).toBe('BPagination')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
