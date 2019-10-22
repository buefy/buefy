import { shallowMount } from '@vue/test-utils'
import BTable from '@components/table/Table'

describe('BTable', () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallowMount(BTable)
    })

    let tableCols = shallowMount(BTable, {
        propsData: {
            columns: [
                {label: 'default', width: '100px'},
                {label: 'pecent', width: '50%'},
                {label: 'fixed_num', width: 100},
                {label: 'fixed_str', width: '100'}
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
})
