import { defineComponent } from 'vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { MockInstance } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import TableFilterMixin from '@components/table/mixins/TableFilterMixin'
import type { ITableColumn } from '@components/table/types'

function makeColumn(overrides: Partial<ITableColumn> = {}): ITableColumn {
    return {
        thAttrs: () => ({}),
        tdAttrs: () => ({}),
        getRootClasses: () => [],
        getRootStyle: () => undefined,
        $slots: {},
        ...overrides
    } as ITableColumn
}

// Minimal host providing the column/data/sort members `TableFilterMixin`
// reads/writes/calls (see `TableFilterMixinHost` in types.ts).
const HostComponent = defineComponent({
    mixins: [TableFilterMixin],
    props: {
        data: {
            type: Array,
            default: () => []
        },
        newColumns: {
            type: Array,
            default: () => []
        },
        backendPagination: Boolean,
        backendSorting: Boolean,
        sortMultiple: Boolean
    },
    data() {
        return {
            newData: this.data,
            newDataTotal: this.data.length,
            sortMultipleDataLocal: [] as unknown[],
            currentSortColumn: {} as ITableColumn
        }
    },
    methods: {
        doSortMultiColumn() {},
        doSortSingleColumn() {}
    },
    template: '<div></div>'
})

describe('TableFilterMixin', () => {
    const data = [
        { id: 1, name: 'Jesse' },
        { id: 2, name: 'João' },
        { id: 3, name: 'Tina' }
    ]
    const nameColumn = makeColumn({ field: 'name', searchable: true })
    let wrapper: VueWrapper<InstanceType<typeof HostComponent>>
    let spyOnDoSortMultiColumn: MockInstance
    let spyOnDoSortSingleColumn: MockInstance

    beforeEach(() => {
        // spies on methods before mounting the component, because
        // wrapper.vm does not allow spies (methods are bound on creation)
        spyOnDoSortMultiColumn = vi.spyOn(HostComponent.methods!, 'doSortMultiColumn')
        spyOnDoSortSingleColumn = vi.spyOn(HostComponent.methods!, 'doSortSingleColumn')
        wrapper = shallowMount(HostComponent, {
            props: { data, newColumns: [nameColumn] }
        })
    })

    it('hasSearchablenewColumns reflects whether any column is searchable', async () => {
        expect(wrapper.vm.hasSearchablenewColumns).toBe(true)

        await wrapper.setProps({ newColumns: [makeColumn({ field: 'name' })] })
        expect(wrapper.vm.hasSearchablenewColumns).toBe(false)
    })

    it('isRowFiltered matches on a case-insensitive, diacritic-insensitive substring', () => {
        wrapper.vm.filters.name = 'joao'
        expect(wrapper.vm.isRowFiltered(data[1])).toBe(true) // João
        expect(wrapper.vm.isRowFiltered(data[0])).toBe(false) // Jesse
    })

    it('isRowFiltered defers to a column customSearch when provided', async () => {
        const customSearch = vi.fn((row) => row.id === 3)
        await wrapper.setProps({ newColumns: [makeColumn({ field: 'name', customSearch })] })
        wrapper.vm.filters.name = 'anything'

        expect(wrapper.vm.isRowFiltered(data[2])).toBe(true)
        expect(customSearch).toHaveBeenCalled()
    })

    it('filters newData locally and updates newDataTotal when filters change', async () => {
        wrapper.vm.filters.name = 'jo'
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.$data.newData).toEqual([data[1]])
        expect(wrapper.vm.$data.newDataTotal).toBe(1)
    })

    it('re-sorts by the current single-sort column after filtering', async () => {
        wrapper.vm.$data.currentSortColumn = nameColumn
        wrapper.vm.filters.name = 'j'
        await wrapper.vm.$nextTick()

        expect(spyOnDoSortSingleColumn).toHaveBeenCalledWith(nameColumn)
    })

    it('re-sorts via multi-sort when sortMultiple and priorities exist', async () => {
        await wrapper.setProps({ sortMultiple: true })
        wrapper.vm.$data.sortMultipleDataLocal = [{ field: 'name', order: 'asc' }]
        wrapper.vm.filters.name = 'j'
        await wrapper.vm.$nextTick()

        expect(spyOnDoSortMultiColumn).toHaveBeenCalled()
    })

    it('emits filters-change instead of filtering locally when backendFiltering is set', async () => {
        await wrapper.setProps({ backendFiltering: true })
        wrapper.vm.filters.name = 'jo'
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.$data.newData).toEqual(data) // untouched, backend's job
        expect(wrapper.emitted('filters-change')![0]).toEqual([{ name: 'jo' }])
    })

    it('debounces handleFiltersChange when debounceSearch is set', async () => {
        vi.useFakeTimers()
        await wrapper.setProps({ debounceSearch: 100 })

        wrapper.vm.filters.name = 'j'
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.$data.newData).toEqual(data) // not yet, still debouncing

        vi.advanceTimersByTime(100)
        expect(wrapper.vm.$data.newData).toEqual([data[0], data[1]]) // Jesse, João

        vi.useRealTimers()
    })

    it('onFiltersEvent emits a dynamic filters-event-<name> event', async () => {
        await wrapper.setProps({ filtersEvent: 'change' })
        const event = new Event('change')
        wrapper.vm.onFiltersEvent(event)

        expect(wrapper.emitted('filters-event-change')![0]).toEqual([
            { event, filters: wrapper.vm.filters }
        ])
    })
})
