import { shallowMount } from '@vue/test-utils'
import BPagination from '@components/pagination/Pagination'

let wrapper

describe('BPagination', () => {
    beforeEach(() => {
        wrapper = shallowMount(BPagination)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BPagination')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
