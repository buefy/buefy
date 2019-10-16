import { shallowMount } from '@vue/test-utils'
import BTable from '@components/table/Table'

describe('BTable', () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallowMount(BTable)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BTable')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('has the filter row visible when searchable', () => {
        wrapper.setProps({
            searchable: 'true'
        })
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
})
