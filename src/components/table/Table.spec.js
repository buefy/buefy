import { mount } from '@vue/test-utils'
import BTable from '@components/table/Table'

describe('BTable', () => {
    it('is called', () => {
        const wrapper = mount(BTable)
        expect(wrapper.name()).toBe('BTable')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
