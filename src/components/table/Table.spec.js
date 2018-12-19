import { mount, shallowMount } from '@vue/test-utils'
import BTable from '@components/table/Table'

describe('BTable', () => {
    it('is called', () => {
        const wrapper = mount(BTable)
        expect(wrapper.name()).toBe('BTable')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('allows custom row component', () => {
        const wrapper = shallowMount(BTable, {
            propsData: {
                customRow: true
            }
        })
        expect(wrapper.props().customRow).toBe(true)
    })

    it('should have custom row', () => {
        const slotCustomRow = '<div class="custom-row"> Content </div>'
        const wrapper = shallowMount(BTable, {
            propsData: {
                customRow: true,
                data: [ {} ]
            },
            scopedSlots: {
                default: slotCustomRow
            }
        })
        expect(wrapper.find('.custom-row').html()).toBe(slotCustomRow)
        expect(wrapper.findAll('.custom-row').length).toBe(1)
    })

    it('should have custom row with access to row data', () => {
        const slotCustomRow = '<div class="custom-row">{{ props.row.name }}</div>'
        const wrapper = shallowMount(BTable, {
            propsData: {
                customRow: true,
                data: [ { name: 'Jack' }, { name: 'John' } ]
            },
            scopedSlots: {
                default: slotCustomRow
            }
        })
        const customRows = wrapper.findAll('.custom-row')
        expect(customRows.length).toBe(2)
        expect(customRows.at(0).text()).toBe('Jack')
        expect(customRows.at(1).text()).toBe('John')
    })
})
