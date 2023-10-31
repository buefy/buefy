import '@testing-library/jest-dom'
import { shallowMount } from '@vue/test-utils'
import BInput from '@components/input/Input'
import BTable from '@components/table/Table'

describe('BTable', () => {
    let wrapper
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
        let headRows
        let bodyRows
        let searchInput

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
            jest.useFakeTimers()
            await wrapper.setProps({
                debounceSearch: 1000
            })
            for (let i = 0; i < 10; i++) {
                searchInput.vm.$emit('update:modelValue', 'J'.repeat(10 - i))
                jest.advanceTimersByTime(500)
                await wrapper.vm.$nextTick() // makes sure the DOM is updated
                bodyRows = wrapper.findAll('tbody tr')
                expect(bodyRows).toHaveLength(5) // No filtering yet
            }
            jest.advanceTimersByTime(1000)
            await wrapper.vm.$nextTick() // makes sure the DOM is updated
            bodyRows = wrapper.findAll('tbody tr')
            expect(bodyRows).toHaveLength(2) // Filtering after debounce
            jest.useRealTimers()
        })
    })
})
