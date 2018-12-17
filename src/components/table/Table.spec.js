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
})
