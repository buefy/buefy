import { shallowMount } from '@vue/test-utils'
import BDropdown from '@components/dropdown/Dropdown'
import BDropdownItem from '@components/dropdown/DropdownItem'

let wrapper

describe('BDropdownItem', () => {
    beforeEach(() => {
        wrapper = shallowMount(BDropdownItem, {
            parentComponent: BDropdown
        })
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BDropdownItem')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
