import { shallowMount } from '@vue/test-utils'
import BDropdown from '@components/dropdown/Dropdown'

let wrapper

describe('BDropdown', () => {
    beforeEach(() => {
        wrapper = shallowMount(BDropdown)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BDropdown')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('manage props validator', () => {
        const position = wrapper.vm.$options.props.position

        expect(position.type).toBe(String)
        expect(position.validator && position.validator('is-top')).toBeFalsy()
        expect(position.validator && position.validator('is-top-left')).toBeTruthy()
        expect(position.validator && position.validator('is-top-right')).toBeTruthy()
        expect(position.validator && position.validator('is-bottom-left')).toBeTruthy()
    })

    it('react accordingly when changing v-model', () => {
        const value = 'value'
        wrapper.setProps({ value })
        expect(wrapper.vm.selected).toBe(value)
    })

    it('emit activity when it changes', () => {
        wrapper.vm.isActive = true
        expect(wrapper.emitted()['active-change']).toBeTruthy()
    })

    it('react accordingly when an item is selected', () => {
        jest.useFakeTimers()

        const val1 = 'val1'
        wrapper.vm.selectItem(val1)
        expect(wrapper.emitted()['input']).toBeTruthy()

        wrapper.vm.selectItem(val1)
        expect(wrapper.emitted()['input']).toBeTruthy()

        wrapper.setProps({
            hoverable: true,
            closeOnClick: true
        })

        const val2 = 'val2'
        wrapper.vm.selectItem(val2)
        expect(wrapper.vm.selected).toBe(val2)
        expect(wrapper.emitted()['change']).toBeTruthy()

        expect(wrapper.vm.isHoverable).toBeFalsy()
    })

    it('react accordingly when an item is selected with multiple prop', () => {
        jest.useFakeTimers()
        wrapper.setProps({
            multiple: true
        })
        wrapper.vm.selected = null

        // no initial value, will return an array with the only selected option
        const val1 = 'val1'
        wrapper.vm.selectItem(val1)
        expect(wrapper.vm.selected).toEqual([val1])
        expect(wrapper.emitted()['change']).toBeTruthy()

        // will return an array with the new value appended
        const val2 = 'val2'
        wrapper.vm.selectItem(val2)
        expect(wrapper.vm.selected).toEqual([val1, val2])

        // will remove the last selection since it was part of the list
        wrapper.vm.selectItem(val2)
        expect(wrapper.vm.selected).toEqual([val1])
    })

    it('manage the whitelisted items accordingly', () => {
        let el = wrapper.vm.$refs.dropdownMenu
        expect(wrapper.vm.isInWhiteList(el)).toBeTruthy()

        el = wrapper.vm.$refs.dropdownMenu.querySelector('.dropdown-content')
        expect(wrapper.vm.isInWhiteList(el)).toBeTruthy()

        wrapper.vm.$refs.dropdownMenu = undefined

        el = wrapper.vm.$refs.trigger
        expect(wrapper.vm.isInWhiteList(el)).toBeTruthy()

        el = document.createElement('div')
        expect(wrapper.vm.isInWhiteList(el)).toBeFalsy()
    })

    it('manage clicking outside accordingly', () => {
        const el = document.createElement('div')
        const event = {
            target: el
        }

        wrapper.vm.isActive = true
        wrapper.vm.clickedOutside(event)
        expect(wrapper.vm.isActive).toBeFalsy()

        wrapper.vm.isActive = true
        wrapper.vm.clickedOutside({
            target: wrapper.vm.$refs.trigger
        })
        expect(wrapper.vm.isActive).toBeTruthy()

        wrapper.vm.isActive = true
        wrapper.setProps({ inline: true })
        wrapper.vm.clickedOutside(event)
        expect(wrapper.vm.isActive).toBeTruthy()

        wrapper.vm.isActive = true
        wrapper.setProps({ canClose: false })
        wrapper.vm.clickedOutside(event)
        expect(wrapper.vm.isActive).toBeTruthy()
    })

    it('manage toggle function accordingly', (done) => {
        wrapper.vm.isActive = true
        wrapper.setProps({ disabled: true })
        wrapper.vm.toggle()
        expect(wrapper.vm.isActive).toBeTruthy()

        wrapper.setProps({ disabled: false })
        wrapper.vm.toggle()
        expect(wrapper.vm.isActive).toBeFalsy()

        jest.useFakeTimers()
        wrapper.vm.isActive = false
        wrapper.vm.toggle()
        wrapper.vm.$nextTick(() => {
            expect(setTimeout).toHaveBeenCalled()
            jest.advanceTimersByTime(1)
            expect(wrapper.vm.isActive).toBeTruthy()
            done()
        })
    })
})
