import { shallowMount } from '@vue/test-utils'
import BDropdownItem from '@components/dropdown/DropdownItem'
import ProviderParentMixin from '../../utils/ProviderParentMixin'

let wrapper
const dropdownSelected = 'val'
const BDropdown = {
    mixins: [ProviderParentMixin('dropdown')],
    template: '<b-dropdown-stub></b-dropdown-stub>',
    data() {
        return {
            selected: dropdownSelected
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

    it('returns item classes accordingly', () => {
        const value = dropdownSelected
        const hasLink = true
        const disabled = false
        const paddingless = true
        const isActive = true
        wrapper.setProps({
            value,
            hasLink,
            disabled,
            paddingless
        })
        expect(wrapper.vm.itemClasses).toEqual({
            'dropdown-item': !hasLink,
            'is-disabled': disabled,
            'is-paddingless': paddingless,
            'is-active': isActive,
            'has-link': hasLink
        })
    })

    it('returns if item is clickable accordingly', () => {
        expect(wrapper.vm.isClickable).toBeTruthy()

        wrapper.setProps({ separator: true })
        expect(wrapper.vm.isClickable).toBeFalsy()
    })

    it('react accordingly when the item is selected', () => {
        wrapper.vm.$parent.selectItem = jest.fn()

        wrapper.setProps({ separator: true })
        wrapper.vm.selectItem()
        expect(wrapper.vm.$parent.selectItem).not.toHaveBeenCalled()

        wrapper.setProps({ separator: false })
        wrapper.vm.selectItem()
        expect(wrapper.vm.$parent.selectItem).toHaveBeenCalled()
        expect(wrapper.emitted()['click']).toBeTruthy()
    })
})
