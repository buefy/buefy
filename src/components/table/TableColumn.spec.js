import { shallowMount } from '@vue/test-utils'
import BTableColumn from '@components/table/TableColumn'
import { createProvideOptions } from './provide'

let wrapper
const BTable = {
    template: '<b-table-stub></b-table-stub>',
    data() {
        return {
            newColumns: []
        }
    }
}

describe('BTableColumn', () => {
    beforeEach(() => {
        wrapper = shallowMount(BTableColumn, {
            parentComponent: BTable,
            provide() {
                return createProvideOptions(this)
            }
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
