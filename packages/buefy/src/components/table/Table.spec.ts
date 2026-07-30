import '@testing-library/jest-dom/vitest'
import { toRaw } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import type { DOMWrapper, VueWrapper } from '@vue/test-utils'
import BInput from '@components/input/Input.vue'
import BTable from '@components/table/Table.vue'
import BTablePagination from '@components/table/TablePagination.vue'
import type { ITableColumn, ModifierKeys } from '@components/table/types'

const noModifiers: ModifierKeys = { shiftKey: false, altKey: false, ctrlKey: false }
const shiftModifier: ModifierKeys = { shiftKey: true, altKey: false, ctrlKey: false }

describe('BTable', () => {
    let wrapper: VueWrapper<InstanceType<typeof BTable>>
    beforeEach(() => {
        wrapper = shallowMount(BTable)
    })

    const tableCols = shallowMount(BTable, {
        props: {
            columns: [
                { label: 'default', width: '100px' },
                { label: 'pecent', width: '50%' },
                { label: 'fixed_num', width: 100 },
                { label: 'fixed_str', width: '100' }
            ]
        }
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BTable')

        expect(tableCols.vm).toBeTruthy()
        expect(tableCols.vm.$options.name).toBe('BTable')
    })

    it('has the filter row visible when searchable', async () => {
        await wrapper.setProps({
            columns: [
                {
                    field: 'id',
                    label: 'ID',
                    width: '40',
                    numeric: true
                }
            ]
        })
        // Don't show if no searchable column
        expect(wrapper.vm.hasSearchablenewColumns).toBe(false)
        // Show if one or more searchable column
        await wrapper.setProps({
            columns: [
                {
                    field: 'id',
                    label: 'ID',
                    width: '40',
                    numeric: true,
                    searchable: true
                }
            ]
        })
        expect(wrapper.vm.hasSearchablenewColumns).toBe(true)
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('holds columns', () => {
        const headers = tableCols.findAll('th')

        expect(headers.length).toBeGreaterThanOrEqual(4)

        const cols = headers.filter((th) => {
            const div = th.find('div')

            return div.classes('th-wrap')
        })

        expect(cols.length).toBe(4)
        expect(cols[0].attributes('style')).toBe('width: 100px;')
        expect(cols[1].attributes('style')).toBe('width: 50%;')
        expect(cols[2].attributes('style')).toBe('width: 100px;')
        expect(cols[3].attributes('style')).toBe('width: 100px;')
    })

    describe('Selectable', () => {
        const data = [
            { id: 1, name: 'Jesse' },
            { id: 2, name: 'John' },
            { id: 3, name: 'Tina' },
            { id: 4, name: 'Anne' },
            { id: 5, name: 'Clarence' }
        ]
        beforeEach(() => {
            wrapper = shallowMount(BTable, {
                props: {
                    columns: [
                        { label: 'ID', field: 'id' },
                        { label: 'Name', field: 'name' }
                    ],
                    data
                }
            })
        })

        it('unselected( no column-row-key )', () => {
            expect(wrapper.findAll('tbody tr.is-selected')).toHaveLength(0)
        })

        it('unselected( column-row-key )', async () => {
            await wrapper.setProps({
                customRowKey: 'id'
            })
            expect(wrapper.findAll('tbody tr.is-selected')).toHaveLength(0)
        })

        it('compare by instance itself', async () => {
            await wrapper.setProps({
                selected: data[0]
            })
            const rows = wrapper.findAll('tbody tr')
            expect(rows[0].classes()).toContain('is-selected')
        })

        it('target data and key match', async () => {
            await wrapper.setProps({
                selected: data[1],
                customRowKey: 'id'
            })
            const rows = wrapper.findAll('tbody tr')
            expect(rows[1].classes()).toContain('is-selected')
        })

        it('clear data', async () => {
            await wrapper.setProps({
                selected: data[0],
                customRowKey: 'id'
            })
            const rows = wrapper.findAll('tbody tr')
            expect(rows[0].classes()).toContain('is-selected')

            await wrapper.setProps({
                selected: undefined
            })
            expect(wrapper.findAll('tbody tr.is-selected')).toHaveLength(0)
        })
    })

    describe('Searchable', () => {
        const data = [
            { id: 1, name: 'Jesse' },
            { id: 2, name: 'João' },
            { id: 3, name: 'Tina' },
            { id: 4, name: 'Anne' },
            { id: 5, name: 'Clarence' }
        ]
        let headRows: DOMWrapper<Element>[]
        let bodyRows: DOMWrapper<Element>[]
        let searchInput: VueWrapper<InstanceType<typeof BInput>>

        beforeEach(() => {
            wrapper = shallowMount(BTable, {
                props: {
                    columns: [
                        { label: 'ID', field: 'id', numeric: true },
                        { label: 'Name', field: 'name', searchable: true }
                    ],
                    data
                }
            })
            headRows = wrapper.findAll('thead tr')
            bodyRows = wrapper.findAll('tbody tr')
            searchInput = wrapper.findComponent(BInput)
        })

        it('displays filter row when at least one column is searchable', () => {
            expect(headRows).toHaveLength(2)
        })

        it('displays filter input only on searchable columns', () => {
            const filterCells = headRows[1].findAll('.th-wrap')

            expect(filterCells[0].element).toBeEmptyDOMElement() // ID column is not searchable
            expect(
                filterCells[1].findComponent(BInput).exists()
            ).toBe(true) // Name column is searchable
        })

        it('displays all data', () => {
            expect(bodyRows).toHaveLength(5)
        })

        it('displays filtered data when searching', async () => {
            searchInput.vm.$emit('update:modelValue', 'J')
            await searchInput.vm.$nextTick() // makes sure the DOM is updated
            bodyRows = wrapper.findAll('tbody tr')

            expect(bodyRows).toHaveLength(2) // Jesse and João
        })

        it('displays filtered data when searching by name without accent', async () => {
            searchInput.vm.$emit('update:modelValue', 'Joao')
            await searchInput.vm.$nextTick() // makes sure the DOM is updated
            bodyRows = wrapper.findAll('tbody tr')

            expect(bodyRows).toHaveLength(1) // João
        })

        it('displays filtered data when searching by name with accent', async () => {
            searchInput.vm.$emit('update:modelValue', 'João')
            await searchInput.vm.$nextTick() // makes sure the DOM is updated
            bodyRows = wrapper.findAll('tbody tr')

            expect(bodyRows).toHaveLength(1) // João
        })

        it('displays filtered data when searching and updating data', async () => {
            searchInput.vm.$emit('update:modelValue', 'J')
            await wrapper.setProps({
                data: [
                    ...data,
                    { id: 6, name: 'Justin' }
                ]
            })
            bodyRows = wrapper.findAll('tbody tr')

            expect(bodyRows).toHaveLength(3) // Jesse, João and Justin
        })

        it('debounce search filtering when debounce-search is defined', async () => {
            vi.useFakeTimers()
            await wrapper.setProps({
                debounceSearch: 1000
            })
            for (let i = 0; i < 10; i++) {
                searchInput.vm.$emit('update:modelValue', 'J'.repeat(10 - i))
                vi.advanceTimersByTime(500)
                await wrapper.vm.$nextTick() // makes sure the DOM is updated
                bodyRows = wrapper.findAll('tbody tr')
                expect(bodyRows).toHaveLength(5) // No filtering yet
            }
            vi.advanceTimersByTime(1000)
            await wrapper.vm.$nextTick() // makes sure the DOM is updated
            bodyRows = wrapper.findAll('tbody tr')
            expect(bodyRows).toHaveLength(2) // Filtering after debounce
            vi.useRealTimers()
        })
    })

    describe('Sortable', () => {
        let wrapper: VueWrapper<InstanceType<typeof BTable>>
        const data = [
            { id: 1, name: 'Jesse' },
            { id: 2, name: 'João' },
            { id: 3, name: 'Tina' },
            { id: 4, name: 'Anne' },
            { id: 5, name: 'Clarence' }
        ]
        const columnsData = [
            {
                field: 'id',
                label: 'ID',
                numeric: true,
                sortable: true
            },
            {
                field: 'name',
                label: 'Name',
                sortable: true
            }
        ]
        let columns: ITableColumn[]

        beforeEach(() => {
            wrapper = shallowMount(BTable, {
                props: {
                    columns: columnsData,
                    data
                }
            })
            // columnsData is transformed into newColumns with new objects
            columns = wrapper.vm.newColumns
        })

        it('should be able to sort by ID', () => {
            const sorted = [...data]
            wrapper.vm.sort(columns[0])
            expect(toRaw(wrapper.vm.currentSortColumn)).toBe(toRaw(columns[0]))
            expect(wrapper.vm.isAsc).toBe(true)
            expect(wrapper.vm.visibleData).toEqual(sorted)
            // toggles
            wrapper.vm.sort(columns[0])
            expect(wrapper.vm.isAsc).toBe(false)
            expect(wrapper.vm.visibleData).toEqual(sorted.reverse())
        })

        it('should be able to sort by Name', () => {
            const sorted = [
                data[3], data[4], data[0], data[1], data[2]
            ]
            wrapper.vm.sort(columns[1])
            expect(toRaw(wrapper.vm.currentSortColumn)).toBe(toRaw(columns[1]))
            expect(wrapper.vm.isAsc).toBe(true)
            expect(wrapper.vm.visibleData).toEqual(sorted)
            // toggles
            wrapper.vm.sort(columns[1])
            expect(wrapper.vm.isAsc).toBe(false)
            expect(wrapper.vm.visibleData).toEqual(sorted.reverse())
        })
    })

    describe('Multi-sortable', () => {
        let wrapper: VueWrapper<InstanceType<typeof BTable>>
        const data = [
            { id: 1, name: 'Jesse', age: 23 },
            { id: 2, name: 'João', age: 22 },
            { id: 3, name: 'Tina', age: 22 },
            { id: 4, name: 'Anne', age: 23 },
            { id: 5, name: 'Clarence', age: 22 }
        ]
        const columnsData = [
            {
                field: 'id',
                label: 'ID'
            },
            {
                field: 'name',
                label: 'Name',
                sortable: true
            },
            {
                field: 'age',
                label: 'Age',
                numeric: true,
                sortable: true
            }
        ]
        let columns: ITableColumn[]

        beforeEach(() => {
            wrapper = shallowMount(BTable, {
                props: {
                    columns: columnsData,
                    data,
                    sortMultiple: true
                }
            })
            // columnsData is transformed into newColumns with new objects
            columns = wrapper.vm.newColumns
        })

        it('should be able to sort by Age then Name', () => {
            wrapper.vm.sort(columns[2])
            wrapper.vm.sort(columns[1])
            expect(wrapper.vm.sortMultipleDataLocal).toEqual([
                { field: 'age', order: 'asc' },
                { field: 'name', order: 'asc' }
            ])
            expect(wrapper.vm.visibleData).toEqual([
                data[4], data[1], data[2], data[3], data[0]
            ])
            // toggles age
            wrapper.vm.sort(columns[2])
            expect(wrapper.vm.sortMultipleDataLocal).toEqual([
                { field: 'age', order: 'desc' },
                { field: 'name', order: 'asc' }
            ])
            expect(wrapper.vm.visibleData).toEqual([
                data[3], data[0], data[4], data[1], data[2]
            ])
            // toggles name
            wrapper.vm.sort(columns[1])
            expect(wrapper.vm.sortMultipleDataLocal).toEqual([
                { field: 'age', order: 'desc' },
                { field: 'name', order: 'desc' }
            ])
            expect(wrapper.vm.visibleData).toEqual([
                data[0], data[3], data[2], data[1], data[4]
            ])
        })
    })

    describe('Sortable with custom sort', () => {
        let wrapper: VueWrapper<InstanceType<typeof BTable>>
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        const data = weekdays.map((day, i) => ({
            id: i + 1,
            day
        }))
        const customSort = vi.fn((a, b, isAsc) => {
            const ord = weekdays.indexOf(a.day) - weekdays.indexOf(b.day)
            return isAsc ? ord : -ord
        })
        const columnsData = [
            {
                field: 'id',
                label: 'ID',
                numeric: true
            },
            {
                field: 'day',
                label: 'Day',
                sortable: true,
                customSort
            }
        ]
        let columns: ITableColumn[]

        beforeEach(() => {
            wrapper = shallowMount(BTable, {
                props: {
                    columns: columnsData,
                    data
                }
            })
            // columnsData is transformed into newColumns with new objects
            columns = wrapper.vm.newColumns
        })

        afterEach(() => {
            customSort.mockClear()
        })

        it('should be able to sort by Day with custom sort', async () => {
            const sorted = [...data]
            wrapper.vm.sort(columns[1])
            expect(toRaw(wrapper.vm.currentSortColumn)).toBe(toRaw(columns[1]))
            expect(wrapper.vm.isAsc).toBe(true)
            expect(wrapper.vm.visibleData).toEqual(sorted)
            expect(customSort).toHaveBeenCalled()
            // toggles
            wrapper.vm.sort(columns[1])
            expect(wrapper.vm.isAsc).toBe(false)
            expect(wrapper.vm.visibleData).toEqual(sorted.reverse())
        })
    })

    describe('Multi-sortable with custom sort', () => {
        let wrapper: VueWrapper<InstanceType<typeof BTable>>
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        const data = [
            { id: 1, day: 'Sun', fee: 15 },
            { id: 2, day: 'Mon', fee: 12 },
            { id: 3, day: 'Tue', fee: 12 },
            { id: 4, day: 'Wed', fee: 12 },
            { id: 5, day: 'Thu', fee: 12 },
            { id: 6, day: 'Fri', fee: 12 },
            { id: 7, day: 'Sat', fee: 15 }
        ]
        const dayCustomSort = vi.fn((a, b, isAsc) => {
            const ord = weekdays.indexOf(a.day) - weekdays.indexOf(b.day)
            return isAsc ? ord : -ord
        })
        const feeCustomSort = vi.fn((a, b, isAsc) => {
            const ord = a.fee - b.fee
            return isAsc ? -ord : ord
        })
        const columnsData = [
            {
                field: 'id',
                label: 'ID',
                numeric: true
            },
            {
                field: 'day',
                label: 'Day',
                sortable: true,
                customSort: dayCustomSort
            },
            {
                field: 'fee',
                label: 'Fee',
                sortable: true,
                customSort: feeCustomSort
            }
        ]
        let columns: ITableColumn[]

        beforeEach(() => {
            wrapper = shallowMount(BTable, {
                props: {
                    columns: columnsData,
                    data,
                    sortMultiple: true
                }
            })
            columns = wrapper.vm.newColumns
        })

        afterEach(() => {
            dayCustomSort.mockClear()
            feeCustomSort.mockClear()
        })

        it('should be able to sort by Fee then Day with custom sort', () => {
            wrapper.vm.sort(columns[2])
            wrapper.vm.sort(columns[1])
            expect(wrapper.vm.sortMultipleDataLocal).toEqual([
                { field: 'fee', order: 'asc', customSort: feeCustomSort },
                { field: 'day', order: 'asc', customSort: dayCustomSort }
            ])
            expect(wrapper.vm.visibleData).toEqual([
                data[0], data[6], data[1], data[2], data[3], data[4], data[5]
            ])
            expect(feeCustomSort).toHaveBeenCalled()
            expect(dayCustomSort).toHaveBeenCalled()
            // toggles fee
            wrapper.vm.sort(columns[2])
            expect(wrapper.vm.sortMultipleDataLocal).toEqual([
                { field: 'fee', order: 'desc', customSort: feeCustomSort },
                { field: 'day', order: 'asc', customSort: dayCustomSort }
            ])
            expect(wrapper.vm.visibleData).toEqual([
                data[1], data[2], data[3], data[4], data[5], data[0], data[6]
            ])
            // toggles day
            wrapper.vm.sort(columns[1])
            expect(wrapper.vm.sortMultipleDataLocal).toEqual([
                { field: 'fee', order: 'desc', customSort: feeCustomSort },
                { field: 'day', order: 'desc', customSort: dayCustomSort }
            ])
            expect(wrapper.vm.visibleData).toEqual([
                data[5], data[4], data[3], data[2], data[1], data[6], data[0]
            ])
        })

        it('should be able to remove column from sort (Fee+Day → Day)', () => {
            wrapper.vm.sort(columns[2])
            wrapper.vm.sort(columns[1])
            wrapper.vm.sort(columns[1]) // day → descending order
            expect(wrapper.vm.sortMultipleDataLocal).toEqual([
                { field: 'fee', order: 'asc', customSort: feeCustomSort },
                { field: 'day', order: 'desc', customSort: dayCustomSort }
            ])
            expect(wrapper.vm.visibleData).toEqual([
                data[6], data[0], data[5], data[4], data[3], data[2], data[1]
            ])
            // removes fee
            wrapper.vm.removeSortingPriority(columns[2])
            expect(wrapper.vm.sortMultipleDataLocal).toEqual([
                { field: 'day', order: 'desc', customSort: dayCustomSort }
            ])
            expect(wrapper.vm.visibleData).toEqual([
                data[6], data[5], data[4], data[3], data[2], data[1], data[0]
            ])
        })
    })

    describe('Checkable', () => {
        const data = [
            { id: 1, name: 'Jesse' },
            { id: 2, name: 'John' },
            { id: 3, name: 'Tina' }
        ]
        const columns = [
            { label: 'ID', field: 'id' },
            { label: 'Name', field: 'name' }
        ]

        beforeEach(() => {
            wrapper = shallowMount(BTable, {
                props: { columns, data, checkable: true }
            })
        })

        it('checks and unchecks a single row', () => {
            wrapper.vm.checkRow(data[0], 0, noModifiers)
            expect(wrapper.vm.newCheckedRows).toEqual([data[0]])
            expect(wrapper.emitted('check')![0]).toEqual([[data[0]], data[0]])
            expect(wrapper.emitted('update:checkedRows')![0]).toEqual([[data[0]]])

            wrapper.vm.checkRow(data[0], 0, noModifiers)
            expect(wrapper.vm.newCheckedRows).toEqual([])
        })

        it('checks a range of rows with shift-click', () => {
            wrapper.vm.checkRow(data[0], 0, noModifiers)
            wrapper.vm.checkRow(data[2], 2, shiftModifier)
            expect(wrapper.vm.newCheckedRows).toEqual(data)
        })

        it('checks and unchecks all rows via checkAll', () => {
            wrapper.vm.checkAll()
            expect(wrapper.vm.newCheckedRows).toEqual(data)
            expect(wrapper.vm.isAllChecked).toBe(true)
            expect(wrapper.emitted('check-all')![0]).toEqual([data])

            wrapper.vm.checkAll()
            expect(wrapper.vm.newCheckedRows).toEqual([])
            expect(wrapper.vm.isAllChecked).toBe(false)
        })

        it('respects isRowCheckable when checking all', async () => {
            await wrapper.setProps({
                isRowCheckable: (row: { id: number }) => row.id !== 2
            })
            wrapper.vm.checkAll()
            expect(wrapper.vm.newCheckedRows).toEqual([data[0], data[2]])
        })
    })

    describe('Detailed rows', () => {
        const data = [
            { id: 1, name: 'Jesse' },
            { id: 2, name: 'John' }
        ]
        const columns = [
            { label: 'ID', field: 'id' },
            { label: 'Name', field: 'name' }
        ]

        beforeEach(() => {
            wrapper = shallowMount(BTable, {
                props: { columns, data, detailed: true, detailKey: 'id' }
            })
        })

        it('opens and closes a detail row via toggleDetails', () => {
            expect(wrapper.vm.isVisibleDetailRow(data[0])).toBe(false)

            wrapper.vm.toggleDetails(data[0])
            expect(wrapper.vm.isVisibleDetailRow(data[0])).toBe(true)
            expect(wrapper.emitted('details-open')![0]).toEqual([data[0]])
            expect(wrapper.emitted('update:openedDetailed')![0]).toEqual([[1]])

            wrapper.vm.toggleDetails(data[0])
            expect(wrapper.vm.isVisibleDetailRow(data[0])).toBe(false)
            expect(wrapper.emitted('details-close')![0]).toEqual([data[0]])
        })

        it('throws when openedDetailed is set without a detailKey', async () => {
            await wrapper.setProps({ openedDetailed: [data[0]], detailKey: '' })
            expect(() => wrapper.vm.checkPredefinedDetailedRows()).toThrow()
        })

        it('syncs visible detail rows from the openedDetailed prop', async () => {
            await wrapper.setProps({ openedDetailed: [2] })
            expect(wrapper.vm.isVisibleDetailRow(data[1])).toBe(true)
        })
    })

    describe('Draggable rows', () => {
        const data = [
            { id: 1, name: 'Jesse' },
            { id: 2, name: 'John' }
        ]
        const columns = [
            { label: 'ID', field: 'id' },
            { label: 'Name', field: 'name' }
        ]

        beforeEach(() => {
            wrapper = shallowMount(BTable, {
                props: { columns, data, draggable: true }
            })
        })

        it('emits drag events for the dragged row', async () => {
            const row = wrapper.findAll('tbody tr')[0]

            await row.trigger('dragstart')
            expect(wrapper.vm.isDraggingRow).toBe(true)
            expect(wrapper.emitted('dragstart')![0][0]).toMatchObject({ row: data[0], index: 0 })

            await row.trigger('dragover')
            expect(wrapper.emitted('dragover')![0][0]).toMatchObject({ row: data[0], index: 0 })

            await row.trigger('drop')
            expect(wrapper.emitted('drop')![0][0]).toMatchObject({ row: data[0], index: 0 })

            await row.trigger('dragleave')
            expect(wrapper.emitted('dragleave')![0][0]).toMatchObject({ row: data[0], index: 0 })

            await row.trigger('dragend')
            expect(wrapper.vm.isDraggingRow).toBe(false)
            expect(wrapper.emitted('dragend')![0][0]).toMatchObject({ row: data[0], index: 0 })
        })

        it('only starts touch-dragging a row that was just tapped', async () => {
            const row = wrapper.findAll('tbody tr')[0]

            await row.trigger('touchstart')
            expect(wrapper.vm.mayBeTouchDragging).toBe(false) // row was never tapped

            await row.trigger('click')
            await row.trigger('touchstart')
            expect(wrapper.vm.mayBeTouchDragging).toBe(true)
        })
    })

    describe('Draggable columns', () => {
        const data = [
            { id: 1, name: 'Jesse' }
        ]
        const columns = [
            { label: 'ID', field: 'id' },
            { label: 'Name', field: 'name' }
        ]

        beforeEach(() => {
            wrapper = shallowMount(BTable, {
                props: { columns, data, draggableColumn: true }
            })
        })

        it('emits drag events for the dragged column', async () => {
            const th = wrapper.findAll('thead th')[0]

            await th.trigger('dragstart')
            expect(wrapper.vm.isDraggingColumn).toBe(true)
            expect(wrapper.emitted('columndragstart')![0][0]).toMatchObject({ index: 0 })

            await th.trigger('dragover')
            expect(wrapper.emitted('columndragover')![0][0]).toMatchObject({ index: 0 })

            await th.trigger('drop')
            expect(wrapper.emitted('columndrop')![0][0]).toMatchObject({ index: 0 })

            await th.trigger('dragleave')
            expect(wrapper.emitted('columndragleave')![0][0]).toMatchObject({ index: 0 })

            await th.trigger('dragend')
            expect(wrapper.vm.isDraggingColumn).toBe(false)
            expect(wrapper.emitted('columndragend')![0][0]).toMatchObject({ index: 0 })
        })

        it('disables column dragging while a row drag is in progress', async () => {
            await wrapper.setProps({ draggable: true })
            const row = wrapper.findAll('tbody tr')[0]
            const th = wrapper.findAll('thead th')[0]

            await row.trigger('dragstart')
            expect(wrapper.vm.isDraggingRow).toBe(true)

            await th.trigger('dragstart')
            expect(wrapper.vm.isDraggingColumn).toBe(false)
            expect(wrapper.emitted('columndragstart')).toBeUndefined()
        })
    })

    describe('with fallthrough attributes', () => {
        const data = [
            { id: 1, name: 'Jesse' },
            { id: 2, name: 'John' },
            { id: 3, name: 'Tina' },
            { id: 4, name: 'Anne' },
            { id: 5, name: 'Clarence' }
        ]
        const columns = [
            { label: 'ID', field: 'id' },
            { label: 'Name', field: 'name' }
        ]
        const attrs = {
            class: 'fallthrough-class',
            style: 'font-size: 2rem;',
            id: 'fallthrough-id'
        }

        it('should apply class, style, and id to the root <div> element if compatFallthrough is true (default)', () => {
            const wrapper = shallowMount(BTable, {
                attrs,
                props: {
                    paginated: true,
                    paginationPosition: 'both',
                    columns,
                    data
                }
            })

            const root = wrapper.find('div.b-table')
            expect(root.classes(attrs.class)).toBe(true)
            expect(root.attributes('style')).toBe(attrs.style)
            expect(root.attributes('id')).toBe(attrs.id)

            const paginations = wrapper.findAllComponents(BTablePagination)
            // top
            expect(paginations[0].classes(attrs.class)).toBe(false)
            expect(paginations[0].attributes('style')).toBeUndefined()
            expect(paginations[0].attributes('id')).toBeUndefined()
            // bottom
            expect(paginations[1].classes(attrs.class)).toBe(false)
            expect(paginations[1].attributes('style')).toBeUndefined()
            expect(paginations[1].attributes('id')).toBeUndefined()
        })

        it('should apply class, style, and id to the underlying <b-table-pagination> components if compatFallthrough is false', () => {
            const wrapper = shallowMount(BTable, {
                attrs,
                props: {
                    compatFallthrough: false,
                    paginated: true,
                    paginationPosition: 'both',
                    columns,
                    data
                }
            })

            const root = wrapper.find('div.b-table')
            expect(root.classes(attrs.class)).toBe(false)
            expect(root.attributes('style')).toBeUndefined()
            expect(root.attributes('id')).toBeUndefined()

            const paginations = wrapper.findAllComponents(BTablePagination)
            // top
            expect(paginations[0].classes(attrs.class)).toBe(true)
            expect(paginations[0].attributes('style')).toBe(attrs.style)
            expect(paginations[0].attributes('id')).toBe(attrs.id)
            // bottom
            expect(paginations[1].classes(attrs.class)).toBe(true)
            expect(paginations[1].attributes('style')).toBe(attrs.style)
            expect(paginations[1].attributes('id')).toBe(attrs.id)
        })
    })
})
