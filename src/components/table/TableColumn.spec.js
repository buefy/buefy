import { mount } from '@vue/test-utils'
import BTable from '@components/table/Table'
import BTableColumn from '@components/table/TableColumn'

let wrapper
const WrapperComp = {
    template: `
        <BTable>
            <BTableColumn/>
            <BTableColumn ref="testItem" />
            <BTableColumn />
        </BTable>`,
    components: {
        BTable, BTableColumn
    }
}

describe('BTableColumn', () => {
    beforeEach(() => {
        wrapper = mount(WrapperComp, { sync: false }).find({ ref: 'testItem' })
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BTableColumn')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
