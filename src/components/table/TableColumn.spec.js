import { shallowMount } from '@vue/test-utils'
import BTableColumn from '@components/table/TableColumn'

let wrapper
const BTable = {
    template: '<b-table-stub></b-table-stub>',
    data() {
        return {
            newColumns: [],
            _isTable: true
        }
    }
}

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
