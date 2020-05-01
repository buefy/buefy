import { mount } from '@vue/test-utils'
import BTableColumn from '@components/table/TableColumn'

let wrapper
const BTable = {
    template: '<b-table-stub></b-table-stub>',
    data() {
        return {
            _isTable: true
        }
    },
    methods: {
        refreshSlots() { }
    }
}

describe('BTableColumn', () => {
    beforeEach(() => {
        wrapper = mount(BTableColumn, {
            parentComponent: BTable
        })
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BTableColumn')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
