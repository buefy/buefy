import { shallowMount } from '@vue/test-utils'
import BTableMobileSort from '@components/table/TableMobileSort'

describe('BTableMobileSort', () => {
    it('is called', () => {
        const wrapper = shallowMount(BTableMobileSort)

        expect(wrapper.name()).toBe('BTableMobileSort')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
