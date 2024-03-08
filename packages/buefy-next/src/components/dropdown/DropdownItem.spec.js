import { shallowMount } from '@vue/test-utils'
import { DROPDOWN_INJECTION_KEY } from '@components/dropdown/Dropdown'
import BDropdownItem from '@components/dropdown/DropdownItem'

let wrapper
const dropdownSelected = 'val'

describe('BDropdownItem', () => {
    let parent

    beforeEach(() => {
        parent = {
            selected: dropdownSelected,
            selectItem: jest.fn()
        } // mocks injected Dropdown
        wrapper = shallowMount(BDropdownItem, {
            global: {
                provide: {
                    [DROPDOWN_INJECTION_KEY]: parent
                }
            }
        })
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BDropdownItem')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('returns item classes accordingly', async () => {
        const value = dropdownSelected
        const hasLink = true
        const disabled = false
        const paddingless = true
        const isActive = true
        await wrapper.setProps({
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

    it('returns if item is clickable accordingly', async () => {
        expect(wrapper.vm.isClickable).toBeTruthy()

        await wrapper.setProps({ separator: true })
        expect(wrapper.vm.isClickable).toBeFalsy()
    })

    it('react accordingly when the item is selected', async () => {
        await wrapper.setProps({ separator: true })
        wrapper.vm.selectItem()
        expect(parent.selectItem).not.toHaveBeenCalled()

        await wrapper.setProps({ separator: false })
        wrapper.vm.selectItem()
        expect(parent.selectItem).toHaveBeenCalled()
        expect(wrapper.emitted().click).toBeTruthy()
    })
})
