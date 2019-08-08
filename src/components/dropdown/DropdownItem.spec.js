import { shallowMount } from '@vue/test-utils'
import BDropdownItem from '@components/dropdown/DropdownItem'

let wrapper
const BDropdown = {
    template: '<b-dropdown-stub></b-dropdown-stub>',
    data() {
        return {
            _isDropdown: true
        }
    }
}

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
