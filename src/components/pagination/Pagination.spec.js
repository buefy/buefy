import { shallowMount } from '@vue/test-utils'
import BPagination from '@components/pagination/Pagination'

let wrapper

describe('BPagination', () => {
    beforeEach(() => {
        wrapper = shallowMount(BPagination)
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BPagination')
    })

    it('render correctly', () => {
        wrapper = shallowMount(BPagination, {
            global: {
                stubs: {
                    // to test if <b-icon>s are inserted
                    'b-pagination-button': false
                }
            }
        })
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('returns 1 for default firstItem', () => {
        expect(wrapper.vm.firstItem).toEqual(1)
    })

    it('returns firstItem accordingly', async () => {
        await wrapper.setProps({ modelValue: 0 })
        expect(wrapper.vm.firstItem).toEqual(0)

        await wrapper.setProps({ modelValue: 5 })
        const expected = wrapper.vm.modelValue * wrapper.vm.perPage - wrapper.vm.perPage + 1
        expect(wrapper.vm.firstItem).toEqual(expected)
    })

    it('should emit change with value of 1 when calling first', async () => {
        await wrapper.setProps({ modelValue: 1 })
        wrapper.vm.first()

        await wrapper.setProps({ modelValue: 5 })
        wrapper.vm.first()
        expect(wrapper.emitted().change[0]).toContainEqual(1)
        expect(wrapper.emitted()['update:modelValue'][0]).toContainEqual(1)
    })

    it('should emit change with value of pageCount when calling last', async () => {
        const event = {
            target: {
                focus: jest.fn()
            }
        }

        await wrapper.setProps({ modelValue: 5 })
        wrapper.vm.last(event)
        expect(wrapper.emitted().change[0]).toContainEqual(wrapper.vm.pageCount)
        expect(wrapper.emitted()['update:modelValue'][0]).toContainEqual(wrapper.vm.pageCount)

        await wrapper.vm.$nextTick()
        expect(event.target.focus).toHaveBeenCalled()
    })

    it('should emit change when calling prev', async () => {
        await wrapper.setProps({ modelValue: 5 })
        wrapper.vm.prev()
        expect(wrapper.emitted().change[0]).toContainEqual(4)
        expect(wrapper.emitted()['update:modelValue'][0]).toContainEqual(4)
    })

    it('should emit change when calling next', async () => {
        await wrapper.setProps({ total: 100, modelValue: 2 })
        wrapper.vm.next()
        expect(wrapper.emitted().change[0]).toContainEqual(3)
        expect(wrapper.emitted()['update:modelValue'][0]).toContainEqual(3)
    })

    it('set current to last if page count is smaller than current', async () => {
        wrapper.vm.last = jest.fn()
        await wrapper.setProps({ total: 100, modelValue: 3 })
        await wrapper.setProps({ total: 40 })
        expect(wrapper.vm.last).toHaveBeenCalled()
    })

    it('return no pages in range when simple', async () => {
        await wrapper.setProps({ simple: true })
        expect(wrapper.pagesInRange).toBeUndefined()
    })
})
