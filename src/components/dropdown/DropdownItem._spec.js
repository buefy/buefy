import { shallow } from '@vue/test-utils'
import BDropdownItem from '@components/dropdown/DropdownItem'

describe('BDropdownItem', () => {
    it('is called', () => {
        const wrapper = shallow(BDropdownItem, {
            propsData: {
                separator: true
            }
        })
        expect(wrapper.name()).toBe('BDropdownItem')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
