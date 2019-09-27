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

    it('returns 1 for default firstItem', () => {
        expect(wrapper.vm.firstItem).toEqual(1)
    })

    it('returns firstItem accordingly', () => {
        wrapper.setProps({current: 0})
        expect(wrapper.vm.firstItem).toEqual(0)

        wrapper.setProps({current: 5})
        const expected = wrapper.vm.current * wrapper.vm.perPage - wrapper.vm.perPage + 1
        expect(wrapper.vm.firstItem).toEqual(expected)
    })

    it('should emit change with value of 1 when calling first', () => {
        wrapper.setProps({current: 5})
        wrapper.vm.first()
        expect(wrapper.emitted()['change'][0]).toContainEqual(1)
        expect(wrapper.emitted()['update:current'][0]).toContainEqual(1)
    })

    it('should emit change with value of pageCount when calling last', () => {
        wrapper.setProps({current: 5})
        wrapper.vm.last()
        expect(wrapper.emitted()['change'][0]).toContainEqual(wrapper.vm.pageCount)
        expect(wrapper.emitted()['update:current'][0]).toContainEqual(wrapper.vm.pageCount)
    })

    it('should emit change when calling prev', () => {
        wrapper.setProps({current: 5})
        wrapper.vm.prev()
        expect(wrapper.emitted()['change'][0]).toContainEqual(4)
        expect(wrapper.emitted()['update:current'][0]).toContainEqual(4)
    })

    it('should emit change when calling next', () => {
        wrapper.setProps({total: 100, current: 4})
        wrapper.vm.next()
        expect(wrapper.emitted()['change'][0]).toContainEqual(5)
        expect(wrapper.emitted()['update:current'][0]).toContainEqual(5)
    })
})
