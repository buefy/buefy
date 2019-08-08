import { shallowMount } from '@vue/test-utils'
import BTable from '@components/table/Table'
import BTableColumn from '@components/table/TableColumn'

let wrapper

describe('BTableColumn', () => {
    beforeEach(() => {
        wrapper = shallowMount(BTableColumn, {
            parentComponent: BTable
        })
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BTableColumn')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
