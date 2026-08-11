import { defineComponent } from 'vue'
import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import BTable from '@components/table/Table.vue'
import BTableColumn from '@components/table/TableColumn.vue'
import BButton from '@components/button/Button.vue'

const WrapperComp = defineComponent({
    components: {
        BTable, BTableColumn
    },
    template: `
        <BTable>
            <BTableColumn/>
            <BTableColumn ref="testItem" />
            <BTableColumn />
        </BTable>`
})
let wrapper: VueWrapper<InstanceType<typeof WrapperComp>>

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
                    <BTableColumn :td-attrs="tdAttrs" v-slot="props">
                        <div>
                            {{ props.row.name }} - {{ props.isActiveDetailRow(props.row) ? 'Opened' : 'Closed' }}
                        </div>
                        <BButton @click="props.toggleDetails(props.row)">Toggle details</BButton>
                    </BTableColumn>
                </BTable>`,
            components: { BTable, BTableColumn, BButton },
            methods: {
                tdAttrs(td: { id: string }) {
                    return { id: `td-${td.id}` }
                }
            }
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

    // Regression test for https://github.com/buefy/buefy/issues/2850
    it('keeps the sort icon visible when a sortable column uses a custom header slot', async () => {
        const SortableCustomHeader = {
            template: `
                <BTable :data="tableData">
                    <BTableColumn field="id" label="ID" sortable>
                        <template #header="{ column }">
                            <strong>{{ column.label }}</strong>
                        </template>
                        <template #default="props">{{ props.row.id }}</template>
                    </BTableColumn>
                </BTable>`,
            components: { BTable, BTableColumn },
            data: () => ({
                tableData: [{ id: 2 }, { id: 1 }]
            })
        }

        const wrapper = mount(SortableCustomHeader)
        await wrapper.vm.$nextTick()
        const th = wrapper.find('thead th')

        // custom header content still renders
        expect(th.find('strong').text()).toBe('ID')
        // ...and the sort icon renders alongside it, not just the default label
        expect(th.find('.sort-icon').exists()).toBe(true)
        expect(th.find('.sort-icon').classes()).toContain('is-invisible')

        await th.trigger('click')

        expect(th.find('strong').text()).toBe('ID')
        expect(th.find('.sort-icon').exists()).toBe(true)
        expect(th.find('.sort-icon').classes()).not.toContain('is-invisible')
    })
})
