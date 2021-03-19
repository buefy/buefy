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
            { id: 2, name: 'John' },
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

            expect(bodyRows).toHaveLength(2) // Jesse and John
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

            expect(bodyRows).toHaveLength(3) // Jesse, John and Justin
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
})
