import { defineComponent } from 'vue'
import { beforeEach, describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import TableSortMixin from '@components/table/mixins/TableSortMixin'
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

// Minimal host providing `newColumns`/`newData`/`data`, which
// `TableSortMixin` reads/writes but are owned by `Table.vue` itself
// (see `TableSortMixinHost` in types.ts).
const HostComponent = defineComponent({
    mixins: [TableSortMixin],
    props: {
        data: {
            type: Array,
            default: () => []
        },
        newColumns: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return { newData: this.data }
    },
    template: '<div></div>'
})

describe('TableSortMixin', () => {
    const data = [
        { id: 1, name: 'Jesse' },
        { id: 2, name: 'João' },
        { id: 3, name: 'Tina' },
        { id: 4, name: 'Anne' }
    ]
    const idColumn = makeColumn({ field: 'id', sortable: true })
    const nameColumn = makeColumn({ field: 'name', sortable: true })
    let wrapper: VueWrapper<InstanceType<typeof HostComponent>>

    beforeEach(() => {
        wrapper = shallowMount(HostComponent, {
            props: { data, newColumns: [idColumn, nameColumn] }
        })
        // mirrors Table.vue's own `mounted()` calling `checkSort()`, which
        // clears `firstTimeSort` (sort() suppresses its first 'sort' emit
        // until this has run, to avoid a spurious event from initSort()).
        wrapper.vm.checkSort()
    })

    it('sorts ascending then descending on repeated calls', () => {
        wrapper.vm.sort(idColumn)
        expect(wrapper.vm.isAsc).toBe(true)
        expect(wrapper.vm.$data.newData).toEqual(data)
        expect(wrapper.emitted('sort')![0]).toEqual(['id', 'asc', null])

        wrapper.vm.sort(idColumn)
        expect(wrapper.vm.isAsc).toBe(false)
        expect(wrapper.vm.$data.newData).toEqual([...data].reverse())
    })

    it('does nothing for a non-sortable column', () => {
        const nonSortable = makeColumn({ field: 'id', sortable: false })
        wrapper.vm.sort(nonSortable)
        expect(wrapper.vm.$data.newData).toEqual(data)
        expect(wrapper.emitted('sort')).toBeUndefined()
    })

    describe('multi-sort', () => {
        beforeEach(async () => {
            await wrapper.setProps({ sortMultiple: true })
        })

        it('accumulates sort priorities and can remove one', () => {
            wrapper.vm.sort(nameColumn)
            wrapper.vm.sort(idColumn)
            expect(wrapper.vm.sortMultipleDataLocal.map((s) => s.field)).toEqual(['name', 'id'])

            wrapper.vm.removeSortingPriority(nameColumn)
            expect(wrapper.vm.sortMultipleDataLocal.map((s) => s.field)).toEqual(['id'])
        })

        it('resets multi-sort back to the original data order', () => {
            wrapper.vm.sort(nameColumn)
            wrapper.vm.removeSortingPriority(nameColumn)
            expect(wrapper.vm.sortMultipleDataLocal).toEqual([])
            expect(wrapper.vm.$data.newData).toEqual(data)
        })
    })

    describe('backend sorting', () => {
        beforeEach(async () => {
            await wrapper.setProps({ backendSorting: true })
        })

        it('does not re-sort newData locally, but still emits sort', () => {
            wrapper.vm.sort(idColumn)
            expect(wrapper.vm.$data.newData).toEqual(data) // unsorted, backend's job
            expect(wrapper.emitted('sort')![0]).toEqual(['id', 'asc', null])
        })

        it('emits sorting-priority-removed instead of sorting locally', () => {
            wrapper.vm.removeSortingPriority(idColumn)
            expect(wrapper.emitted('sorting-priority-removed')![0]).toEqual(['id'])
        })
    })

    describe('initSort via defaultSort/checkSort', () => {
        it('sorts by the defaultSort field on the first checkSort call', () => {
            wrapper = shallowMount(HostComponent, {
                props: { data, newColumns: [idColumn, nameColumn], defaultSort: 'name' }
            })
            wrapper.vm.checkSort()
            expect(wrapper.vm.$data.newData).toEqual([
                data[3], data[0], data[1], data[2]
            ])
        })
    })
})
