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
        wrapper = mount(WrapperComp).findComponent({ ref: 'testItem' })
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BTableColumn')
    })
})
