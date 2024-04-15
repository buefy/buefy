import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import { useFakeTimers } from 'sinon'
import BInput from '@components/input/Input'
import BTable from '@components/table/Table'
import { setVueInstance } from '../../utils/config'

describe('BTable', () => {
    setVueInstance(Vue)

    let wrapper
    beforeEach(() => {
        wrapper = shallowMount(BTable)
    })

    let tableCols = shallowMount(BTable, {
        propsData: {
            columns: [
                { label: 'default', width: '100px' },
                { label: 'pecent', width: '50%' },
                { label: 'fixed_num', width: 100 },
                { label: 'fixed_str', width: '100' }
            ]
        }
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BTable')
        expect(wrapper.isVueInstance()).toBeTruthy()

        expect(tableCols.name()).toBe('BTable')
        expect(tableCols.isVueInstance()).toBeTruthy()
    })

    it('has the filter row visible when searchable', () => {
        wrapper.setProps({
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
        wrapper.setProps({
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
        let headers = tableCols.findAll('th')

        expect(headers.length).toBeGreaterThanOrEqual(4)

        let cols = headers.filter((th) => {
            let div = th.find('div')

            return div.classes('th-wrap')
        })

        expect(cols.length).toBe(4)
        expect(cols.at(0).attributes('style')).toBe('width: 100px;')
        expect(cols.at(1).attributes('style')).toBe('width: 50%;')
        expect(cols.at(2).attributes('style')).toBe('width: 100px;')
        expect(cols.at(3).attributes('style')).toBe('width: 100px;')
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
                propsData: {
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

        it('unselected( column-row-key )', () => {
            wrapper.setProps({
                customRowKey: 'id'
            })
            expect(wrapper.findAll('tbody tr.is-selected')).toHaveLength(0)
        })

        it('compare by instance itself', () => {
            wrapper.setProps({
                selected: data[0]
            })
            const rows = wrapper.findAll('tbody tr')
            expect(rows.at(0).classes()).toContain('is-selected')
        })

        it('target data and key match', () => {
            wrapper.setProps({
                selected: data[1],
                customRowKey: 'id'
            })
            const rows = wrapper.findAll('tbody tr')
            expect(rows.at(1).classes()).toContain('is-selected')
        })

        it('clear data', () => {
            wrapper.setProps({
                selected: data[0],
                customRowKey: 'id'
            })
            const rows = wrapper.findAll('tbody tr')
            expect(rows.at(0).classes()).toContain('is-selected')

            wrapper.setProps({
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
        let headRows
        let bodyRows
        let searchInput

        beforeEach(() => {
            wrapper = shallowMount(BTable, {
                propsData: {
                    columns: [
                        { label: 'ID', field: 'id', numeric: true },
                        { label: 'Name', field: 'name', searchable: true }
                    ],
                    data
                }
            })
            headRows = wrapper.findAll('thead tr')
            bodyRows = wrapper.findAll('tbody tr')
            searchInput = wrapper.find(BInput)
        })

        it('displays filter row when at least one column is searchable', () => {
            expect(headRows).toHaveLength(2)
        })

        it('displays filter input only on searchable columns', () => {
            const filterCells = headRows.at(1).findAll('.th-wrap')

            expect(filterCells.at(0).isEmpty()).toBe(true) // ID column is not searchable
            expect(filterCells.at(1).contains(BInput)).toBe(true) // Name column is searchable
        })

        it('displays all data', () => {
            expect(bodyRows).toHaveLength(5)
        })

        it('displays filtered data when searching', () => {
            searchInput.vm.$emit('input', 'J')
            bodyRows = wrapper.findAll('tbody tr')

            expect(bodyRows).toHaveLength(2) // Jesse and João
        })

        it('displays filtered data when searching by name without accent', () => {
            searchInput.vm.$emit('input', 'Joao')
            bodyRows = wrapper.findAll('tbody tr')

            expect(bodyRows).toHaveLength(1) // João
        })

        it('displays filtered data when searching by name with accent', () => {
            searchInput.vm.$emit('input', 'João')
            bodyRows = wrapper.findAll('tbody tr')

            expect(bodyRows).toHaveLength(1) // João
        })

        it('displays filtered data when searching and updating data', () => {
            searchInput.vm.$emit('input', 'J')
            wrapper.setProps({
                data: [
                    ...data,
                    { id: 6, name: 'Justin' }
                ]
            })
            bodyRows = wrapper.findAll('tbody tr')

            expect(bodyRows).toHaveLength(3) // Jesse, João and Justin
        })

        it('debounce search filtering when debounce-search is defined', () => {
            let clock = useFakeTimers()
            wrapper.setProps({
                debounceSearch: 1000
            })
            for (let i = 0; i < 10; i++) {
                searchInput.vm.$emit('input', 'J'.repeat(10 - i))
                clock.tick(500)
                bodyRows = wrapper.findAll('tbody tr')
                expect(bodyRows).toHaveLength(5) // No filtering yet
            }
            clock.tick(1000)
            bodyRows = wrapper.findAll('tbody tr')
            expect(bodyRows).toHaveLength(2) // Filtering after debounce
        })
    })

    describe('Sortable', () => {
        let wrapper
        const data = [
            { id: 1, name: 'Jesse' },
            { id: 2, name: 'João' },
            { id: 3, name: 'Tina' },
            { id: 4, name: 'Anne' },
            { id: 5, name: 'Clarence' }
        ]
        const columns = [
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

        beforeEach(() => {
            wrapper = shallowMount(BTable, {
                propsData: {
                    columns,
                    data
                }
            })
        })

        it('should be able to sort by ID', () => {
            const sorted = [...data]
            wrapper.vm.sort(columns[0])
            expect(wrapper.vm.currentSortColumn).toBe(columns[0])
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
            expect(wrapper.vm.currentSortColumn).toBe(columns[1])
            expect(wrapper.vm.isAsc).toBe(true)
            expect(wrapper.vm.visibleData).toEqual(sorted)
            // toggles
            wrapper.vm.sort(columns[1])
            expect(wrapper.vm.isAsc).toBe(false)
            expect(wrapper.vm.visibleData).toEqual(sorted.reverse())
        })
    })

    describe('Multi-sortable', () => {
        let wrapper
        const data = [
            { id: 1, name: 'Jesse', age: 23 },
            { id: 2, name: 'João', age: 22 },
            { id: 3, name: 'Tina', age: 22 },
            { id: 4, name: 'Anne', age: 23 },
            { id: 5, name: 'Clarence', age: 22 }
        ]
        const columns = [
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

        beforeEach(() => {
            wrapper = shallowMount(BTable, {
                propsData: {
                    columns,
                    data,
                    sortMultiple: true
                }
            })
        })

        it('should be able to sort by Age then Name', () => {
            wrapper.vm.sort(columns[2])
            wrapper.vm.sort(columns[1])
            expect(wrapper.vm.sortMultipleDataLocal).toEqual([
                { field: 'age', order: undefined },
                { field: 'name', order: undefined }
            ])
            expect(wrapper.vm.visibleData).toEqual([
                data[4], data[1], data[2], data[3], data[0]
            ])
            // toggles age
            wrapper.vm.sort(columns[2])
            expect(wrapper.vm.sortMultipleDataLocal).toEqual([
                { field: 'age', order: 'desc' },
                { field: 'name', order: undefined }
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
        let wrapper
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        const data = weekdays.map((day, i) => ({
            id: i + 1,
            day
        }))
        const customSort = jest.fn((a, b, isAsc) => {
            const ord = weekdays.indexOf(a.day) - weekdays.indexOf(b.day)
            return isAsc ? ord : -ord
        })
        const columns = [
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

        beforeEach(() => {
            wrapper = shallowMount(BTable, {
                propsData: {
                    columns,
                    data
                }
            })
        })

        afterEach(() => {
            customSort.mockClear()
        })

        it('should be able to sort by Day with custom sort', () => {
            const sorted = [...data]
            wrapper.vm.sort(columns[1])
            expect(wrapper.vm.currentSortColumn).toBe(columns[1])
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
        let wrapper
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
        const dayCustomSort = jest.fn((a, b, isAsc) => {
            const ord = weekdays.indexOf(a.day) - weekdays.indexOf(b.day)
            return isAsc ? ord : -ord
        })
        const feeCustomSort = jest.fn((a, b, isAsc) => {
            const ord = a.fee - b.fee
            return isAsc ? -ord : ord
        })
        const columns = [
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

        beforeEach(() => {
            wrapper = shallowMount(BTable, {
                propsData: {
                    columns,
                    data,
                    sortMultiple: true
                }
            })
        })

        afterEach(() => {
            dayCustomSort.mockClear()
            feeCustomSort.mockClear()
        })

        it('should be able to sort by Fee then Day with custom sort', () => {
            wrapper.vm.sort(columns[2])
            wrapper.vm.sort(columns[1])
            expect(wrapper.vm.sortMultipleDataLocal).toEqual([
                { field: 'fee', order: undefined, customSort: feeCustomSort },
                { field: 'day', order: undefined, customSort: dayCustomSort }
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
                { field: 'day', order: undefined, customSort: dayCustomSort }
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
                { field: 'fee', order: undefined, customSort: feeCustomSort },
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
})
