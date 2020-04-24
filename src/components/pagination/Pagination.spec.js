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
        wrapper.setProps({current: 1})
        wrapper.vm.first()

        wrapper.setProps({current: 5})
        wrapper.vm.first()
        expect(wrapper.emitted()['change'][0]).toContainEqual(1)
        expect(wrapper.emitted()['update:current'][0]).toContainEqual(1)
    })

    it('should emit change with value of pageCount when calling last', (done) => {
        const event = {
            target: {
                focus: jest.fn()
            }
        }

        wrapper.setProps({current: 5})
        wrapper.vm.last(event)
        expect(wrapper.emitted()['change'][0]).toContainEqual(wrapper.vm.pageCount)
        expect(wrapper.emitted()['update:current'][0]).toContainEqual(wrapper.vm.pageCount)

        wrapper.vm.$nextTick(() => {
            expect(event.target.focus).toHaveBeenCalled()
            done()
        })
    })

    it('should emit change when calling prev', () => {
        wrapper.setProps({current: 5})
        wrapper.vm.prev()
        expect(wrapper.emitted()['change'][0]).toContainEqual(4)
        expect(wrapper.emitted()['update:current'][0]).toContainEqual(4)
    })

    it('should emit change when calling next', () => {
        wrapper.setProps({total: 100, current: 2})
        wrapper.vm.next()
        expect(wrapper.emitted()['change'][0]).toContainEqual(3)
        expect(wrapper.emitted()['update:current'][0]).toContainEqual(3)
    })

    it('set current to last if page count is smaller than current', () => {
        wrapper.vm.last = jest.fn()
        wrapper.setProps({total: 100, current: 3})
        wrapper.setProps({total: 40})
        expect(wrapper.vm.last).toHaveBeenCalled()
    })

    it('return no pages in range when simple', () => {
        wrapper.setProps({simple: true})
        expect(wrapper.pagesInRange).toBeUndefined()
    })
})
