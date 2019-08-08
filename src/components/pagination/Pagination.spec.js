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
        wrapper.setProps({current: 5})
        const expected = wrapper.vm.current * wrapper.vm.perPage - wrapper.vm.perPage + 1
        expect(wrapper.vm.firstItem).toEqual(expected)
    })

    it('should emit change with value of 1 when calling first', () => {
        wrapper.vm.first()
        const changeEmitted = wrapper.emitted()['change'][0]
        expect(changeEmitted).toContainEqual(1)
        wrapper.vm.first()
        const currentEmitted = wrapper.emitted()['update:current'][0]
        expect(currentEmitted).toContainEqual(1)
    })

    it('should emit change with value of pageCount when calling last', () => {
        wrapper.vm.last()
        const changeEmitted = wrapper.emitted()['change'][0]
        expect(changeEmitted).toContainEqual(wrapper.vm.pageCount)
        wrapper.vm.first()
        const currentEmitted = wrapper.emitted()['update:current'][0]
        expect(currentEmitted).toContainEqual(wrapper.vm.pageCount)
    })

    it('should emit change when calling prev', () => {
        wrapper.setProps({current: 5})
        wrapper.vm.prev()
        const changeEmitted = wrapper.emitted()['change'][0]
        expect(changeEmitted).toContainEqual(4)
        wrapper.vm.first()
        const currentEmitted = wrapper.emitted()['update:current'][0]
        expect(currentEmitted).toContainEqual(4)
    })

    it('should emit change when calling next', () => {
        wrapper.setProps({total: 100})
        wrapper.vm.next()
        const changeEmitted = wrapper.emitted()['change'][0]
        expect(changeEmitted).toContainEqual(2)
        wrapper.vm.first()
        const currentEmitted = wrapper.emitted()['update:current'][0]
        expect(currentEmitted).toContainEqual(2)
    })
})
