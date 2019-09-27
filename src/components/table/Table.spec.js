import { shallowMount } from '@vue/test-utils'
import BTable from '@components/table/Table'

let wrapper

describe('BTable', () => {
    beforeEach(() => {
        wrapper = shallowMount(BTable)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BTable')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
