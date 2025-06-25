import { beforeEach, describe, expect, it, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import BDropdown from '@components/dropdown/Dropdown.vue'

describe('BDropdown', () => {
    const val1 = 'val1'
    const val2 = 'val2'
    let wrapper: VueWrapper<InstanceType<typeof BDropdown>>

    beforeEach(() => {
        wrapper = shallowMount(BDropdown, {
            slots: {
                trigger: '<button class="trigger">trigger</button>'
            }
        })
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BDropdown')
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

    it('react accordingly when changing v-model', async () => {
        const value = 'value'
        await wrapper.setProps({ modelValue: value })
        expect(wrapper.vm.selected).toBe(value)
    })

    it('emit activity when it changes', async () => {
        wrapper.vm.updateAppendToBody = vi.fn(() => wrapper.vm.updateAppendToBody)
        await wrapper.setProps({ appendToBody: true })

        await wrapper.setData({ isActive: true })
        expect(wrapper.emitted()['active-change']).toBeTruthy()

        await wrapper.vm.$nextTick()
        expect(wrapper.vm.updateAppendToBody).toHaveBeenCalled()
    })

    it('react accordingly on mouse over', async () => {
        const trigger = wrapper.find({ ref: 'trigger' })
        trigger.trigger('mouseenter')
        expect(wrapper.vm.isHoverable).toBeFalsy()

        await wrapper.setProps({ triggers: ['hover'] })
        trigger.trigger('mouseenter')
        expect(wrapper.vm.isHoverable).toBeTruthy()
    })

    it('react accordingly when new item is selected', async () => {
        wrapper.vm.selectItem(val1)
        expect(wrapper.emitted()['update:modelValue']).toHaveLength(1)
        expect(wrapper.emitted()['update:modelValue'][0]).toEqual([val1])
        expect(wrapper.emitted().change).toHaveLength(1)
        expect(wrapper.emitted().change[0]).toEqual([val1])

        await wrapper.setProps({
            triggers: ['hover'],
            closeOnClick: true
        })

        wrapper.vm.selectItem(val2)
        expect(wrapper.emitted()['update:modelValue']).toHaveLength(2)
        expect(wrapper.emitted()['update:modelValue'][1]).toEqual([val2])
        expect(wrapper.emitted().change).toHaveLength(2)
        expect(wrapper.emitted().change[1]).toEqual([val2])

        expect(wrapper.vm.isHoverable).toBeFalsy()
    })

    it('react accordingly when same item is selected', async () => {
        // will emit only input event
        await wrapper.setProps({ modelValue: val1 })
        wrapper.vm.selectItem(val1)
        expect(wrapper.emitted()['update:modelValue']).toHaveLength(1)
        expect(wrapper.emitted()['update:modelValue'][0]).toEqual([val1])
        expect(wrapper.emitted().change).toBeUndefined()
    })

    it('react accordingly when an item is selected with multiple prop', async () => {
        await wrapper.setProps({
            multiple: true
        })
        await wrapper.setData({
            selected: null
        })

        // no initial value, will return an array with the only selected option
        wrapper.vm.selectItem(val1)
        expect(wrapper.emitted()['update:modelValue']).toHaveLength(1)
        expect(wrapper.emitted()['update:modelValue'][0]).toEqual([[val1]])
        expect(wrapper.emitted().change).toHaveLength(1)
        expect(wrapper.emitted().change[0]).toEqual([[val1]])

        // will return an array with the new value appended
        await wrapper.setProps({ modelValue: [val1] })
        wrapper.vm.selectItem(val2)
        expect(wrapper.emitted()['update:modelValue']).toHaveLength(2)
        expect(wrapper.emitted()['update:modelValue'][1]).toEqual([[val1, val2]])
        expect(wrapper.emitted().change).toHaveLength(2)
        expect(wrapper.emitted().change[1]).toEqual([[val1, val2]])

        // will remove the last selection since it was part of the list
        await wrapper.setProps({ modelValue: [val1, val2] })
        wrapper.vm.selectItem(val2)
        expect(wrapper.emitted()['update:modelValue']).toHaveLength(3)
        expect(wrapper.emitted()['update:modelValue'][2]).toEqual([[val1]])
        expect(wrapper.emitted().change).toHaveLength(3)
        expect(wrapper.emitted().change[2]).toEqual([[val1]])
    })

    it('manage the whitelisted items accordingly', () => {
        let el = wrapper.vm.$refs.dropdownMenu as Element
        expect(wrapper.vm.isInWhiteList(el)).toBeTruthy()

        el = (wrapper.vm.$refs.dropdownMenu as Element).querySelector('.dropdown-content')!
        expect(wrapper.vm.isInWhiteList(el)).toBeTruthy()

        el = wrapper.vm.$refs.trigger as Element
        expect(wrapper.vm.isInWhiteList(el)).toBeTruthy()

        el = (wrapper.vm.$refs.trigger as Element).querySelector('.trigger')!
        expect(wrapper.vm.isInWhiteList(el)).toBeTruthy()

        el = document.createElement('div')
        expect(wrapper.vm.isInWhiteList(el)).toBeFalsy()
    })

    it('manage the whitelisted items accordingly without trigger (inline)', async () => {
        const trigger = wrapper.vm.$refs.trigger as Element
        expect(trigger).toBeTruthy()
        const triggerEl = trigger.querySelector('.trigger')
        expect(triggerEl).toBeTruthy()

        await wrapper.setProps({ inline: true })
        expect(wrapper.vm.$refs.trigger).toBeFalsy()

        expect(wrapper.vm.isInWhiteList(trigger)).toBeFalsy()
        expect(wrapper.vm.isInWhiteList(triggerEl)).toBeFalsy()

        const el = document.createElement('div')
        expect(wrapper.vm.isInWhiteList(el)).toBeFalsy()
    })

    it('manage clicking outside accordingly', async () => {
        const el = document.createElement('div')
        const event = new Event('click')
        vi.spyOn(event, 'target', 'get').mockReturnValue(el)

        await wrapper.setData({ isActive: true })
        wrapper.vm.clickedOutside(event)
        expect(wrapper.vm.isActive).toBeFalsy()

        await wrapper.setData({ isActive: true })
        const event2 = new Event('click')
        vi.spyOn(event2, 'target', 'get').mockReturnValue(wrapper.vm.$refs.trigger as Element)
        wrapper.vm.clickedOutside(event2)
        expect(wrapper.vm.isActive).toBeTruthy()

        await wrapper.setData({ isActive: true })
        await wrapper.setProps({ inline: true })
        wrapper.vm.clickedOutside(event)
        expect(wrapper.vm.isActive).toBeTruthy()

        await wrapper.setData({ isActive: true })
        await wrapper.setProps({ canClose: false })
        wrapper.vm.clickedOutside(event)
        expect(wrapper.vm.isActive).toBeTruthy()
    })

    it('close on escape', async () => {
        await wrapper.setData({ isActive: true })
        const event = new KeyboardEvent('keyup', { key: 'Escape' })
        wrapper.vm.keyPress({})
        wrapper.vm.keyPress(event)
        expect(wrapper.vm.isActive).toBeFalsy()

        await wrapper.setData({ isActive: true })
        await wrapper.setProps({ canClose: ['click'] })
        wrapper.vm.keyPress(event)
        expect(wrapper.vm.isActive).toBeTruthy()
    })

    it('manage toggle function accordingly', async () => {
        await wrapper.setData({ isActive: true })
        await wrapper.setProps({ disabled: true })
        wrapper.vm.toggle()
        expect(wrapper.vm.isActive).toBeTruthy()

        await wrapper.setProps({ disabled: false })
        wrapper.vm.toggle()
        expect(wrapper.vm.isActive).toBeFalsy()

        vi.useFakeTimers()
        vi.spyOn(global, 'setTimeout')
        await wrapper.setData({ isActive: false })
        wrapper.vm.toggle()
        await wrapper.vm.$nextTick()
        expect(setTimeout).toHaveBeenCalled()
        expect(wrapper.vm.isActive).toBeFalsy()
        vi.advanceTimersByTime(1)
        expect(wrapper.vm.isActive).toBeTruthy()
        vi.useRealTimers()
    })

    it('reset events before destroy', () => {
        document.removeEventListener = vi.fn()

        wrapper.unmount()

        expect(document.removeEventListener).toBeCalledWith('click', expect.any(Function))
        expect(document.removeEventListener).toBeCalledWith('keyup', expect.any(Function))
    })
})
