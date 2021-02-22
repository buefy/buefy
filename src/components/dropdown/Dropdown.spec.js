import { shallowMount } from '@vue/test-utils'
import BDropdown from '@components/dropdown/Dropdown'

describe('BDropdown', () => {
    const val1 = 'val1'
    const val2 = 'val2'
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(BDropdown, {
            slots: {
                trigger: '<button class="trigger">trigger</button>'
            }
        })
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

    it('emit activity when it changes', async () => {
        wrapper.vm.updateAppendToBody = jest.fn(() => wrapper.vm.updateAppendToBody)
        wrapper.setProps({ appendToBody: true })

        wrapper.vm.isActive = true
        expect(wrapper.emitted()['active-change']).toBeTruthy()

        await wrapper.vm.$nextTick()
        expect(wrapper.vm.updateAppendToBody).toHaveBeenCalled()
    })

    it('react accordingly on mouse over', () => {
        const trigger = wrapper.find({ ref: 'trigger' })
        trigger.trigger('mouseenter')
        expect(wrapper.vm.isHoverable).toBeFalsy()

        wrapper.setProps({ triggers: ['hover'] })
        trigger.trigger('mouseenter')
        expect(wrapper.vm.isHoverable).toBeTruthy()
    })

    it('react accordingly when new item is selected', () => {
        jest.useFakeTimers()

        wrapper.vm.selectItem(val1)
        expect(wrapper.emitted().input).toHaveLength(1)
        expect(wrapper.emitted().input[0]).toEqual([val1])
        expect(wrapper.emitted().change).toHaveLength(1)
        expect(wrapper.emitted().change[0]).toEqual([val1])

        wrapper.setProps({
            hoverable: true,
            closeOnClick: true
        })

        wrapper.vm.selectItem(val2)
        expect(wrapper.emitted().input).toHaveLength(2)
        expect(wrapper.emitted().input[1]).toEqual([val2])
        expect(wrapper.emitted().change).toHaveLength(2)
        expect(wrapper.emitted().change[1]).toEqual([val2])

        expect(wrapper.vm.isHoverable).toBeFalsy()
    })

    it('react accordingly when same item is selected', () => {
        jest.useFakeTimers()

        // will emit only input event
        wrapper.setProps({ value: val1 })
        wrapper.vm.selectItem(val1)
        expect(wrapper.emitted().input).toHaveLength(1)
        expect(wrapper.emitted().input[0]).toEqual([val1])
        expect(wrapper.emitted().change).toBeUndefined()
    })

    it('react accordingly when an item is selected with multiple prop', () => {
        jest.useFakeTimers()
        wrapper.setProps({
            multiple: true
        })
        wrapper.vm.selected = null

        // no initial value, will return an array with the only selected option
        wrapper.vm.selectItem(val1)
        expect(wrapper.emitted().input).toHaveLength(1)
        expect(wrapper.emitted().input[0]).toEqual([[val1]])
        expect(wrapper.emitted().change).toHaveLength(1)
        expect(wrapper.emitted().change[0]).toEqual([[val1]])

        // will return an array with the new value appended
        wrapper.setProps({ value: [val1] })
        wrapper.vm.selectItem(val2)
        expect(wrapper.emitted().input).toHaveLength(2)
        expect(wrapper.emitted().input[1]).toEqual([[val1, val2]])
        expect(wrapper.emitted().change).toHaveLength(2)
        expect(wrapper.emitted().change[1]).toEqual([[val1, val2]])

        // will remove the last selection since it was part of the list
        wrapper.setProps({ value: [val1, val2] })
        wrapper.vm.selectItem(val2)
        expect(wrapper.emitted().input).toHaveLength(3)
        expect(wrapper.emitted().input[2]).toEqual([[val1]])
        expect(wrapper.emitted().change).toHaveLength(3)
        expect(wrapper.emitted().change[2]).toEqual([[val1]])
    })

    it('manage the whitelisted items accordingly', () => {
        let el = wrapper.vm.$refs.dropdownMenu
        expect(wrapper.vm.isInWhiteList(el)).toBeTruthy()

        el = wrapper.vm.$refs.dropdownMenu.querySelector('.dropdown-content')
        expect(wrapper.vm.isInWhiteList(el)).toBeTruthy()

        wrapper.vm.$refs.dropdownMenu = undefined

        el = wrapper.vm.$refs.trigger
        expect(wrapper.vm.isInWhiteList(el)).toBeTruthy()

        el = wrapper.vm.$refs.trigger.querySelector('.trigger')
        expect(wrapper.vm.isInWhiteList(el)).toBeTruthy()

        wrapper.vm.$refs.trigger = undefined

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

    it('close on escape', () => {
        wrapper.vm.isActive = true
        const event = new KeyboardEvent('keyup', { 'key': 'Escape' })
        wrapper.vm.keyPress({})
        wrapper.vm.keyPress(event)
        expect(wrapper.vm.isActive).toBeFalsy()

        wrapper.vm.isActive = true
        wrapper.setProps({ canClose: ['click'] })
        wrapper.vm.keyPress(event)
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

    it('reset events before destroy', () => {
        document.removeEventListener = jest.fn()

        wrapper.destroy()

        expect(document.removeEventListener).toBeCalledWith('click', expect.any(Function))
        expect(document.removeEventListener).toBeCalledWith('keyup', expect.any(Function))
    })
})
