import { mount } from '@vue/test-utils'
import BTable from '@components/table/Table'
import BTableColumn from '@components/table/TableColumn'
import BButton from '@components/button/Button'

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

    it('expose isActiveDetailRow method', async () => {
        const DetailedTable = {
            template: `
                <BTable :data="tableData" detail-key="id" detailed>
                    <BTableColumn :td-attrs="(td) => ({ id: \`td-\${td.id}\` })" v-slot="props">
                        <div>
                            {{ props.row.name }} - {{ props.isActiveDetailRow(props.row) ? 'Opened' : 'Closed' }}
                        </div>
                        <BButton @click="props.toggleDetails(props.row)">Toggle details</BButton>
                    </BTableColumn>
                </BTable>`,
            components: { BTable, BTableColumn, BButton }
        }

        const tableData = [
            { id: 1, name: 'Jesse' },
            { id: 2, name: 'John' },
            { id: 3, name: 'Tina' },
            { id: 4, name: 'Anne' },
            { id: 5, name: 'Clarence' }
        ]

        const wrapper = mount(DetailedTable, {
            data: () => ({ detailKey: 'id', detailed: true, tableData })
        })

        // Wait for component to properly mount
        await wrapper.vm.$nextTick()
        // Toggle first row details
        expect(wrapper.find('#td-1').text()).toContain('Closed')
        expect(wrapper.find('#td-1').text()).not.toContain('Opened')
        wrapper.find('#td-1 button').trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.find('#td-1').text()).not.toContain('Closed')
        expect(wrapper.find('#td-1').text()).toContain('Opened')
        wrapper.find('#td-1 button').trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.find('#td-1').text()).toContain('Closed')
        expect(wrapper.find('#td-1').text()).not.toContain('Opened')

        // Toggle second row details
        expect(wrapper.find('#td-2').text()).toContain('Closed')
        expect(wrapper.find('#td-2').text()).not.toContain('Opened')
        wrapper.find('#td-2 button').trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.find('#td-2').text()).not.toContain('Closed')
        expect(wrapper.find('#td-2').text()).toContain('Opened')
    })
})
