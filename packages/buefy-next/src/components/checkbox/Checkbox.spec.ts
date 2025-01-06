import { shallowMount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import BCheckbox from '@components/checkbox/Checkbox.vue'

let wrapper: VueWrapper<InstanceType<typeof BCheckbox>>

describe('BCheckbox', () => {
    beforeEach(() => {
        wrapper = shallowMount(BCheckbox)
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BCheckbox')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('has an input checkbox', () => {
        expect(wrapper.find('label input[type=checkbox]').exists()).toBeTruthy()
    })

    it('emit input event with value when value change', async () => {
        await wrapper.setProps({ modelValue: true })
        expect(wrapper.vm.computedValue).toBeTruthy()
        wrapper.vm.computedValue = false
        const valueEmitted = wrapper.emitted()['update:modelValue'][0]
        expect(valueEmitted).toContainEqual(false)
    })

    it('method focus() gives focus to the input element', async () => {
        (wrapper.vm.$refs.input as HTMLElement).focus = vi.fn()
        wrapper.vm.focus()
        await wrapper.vm.$nextTick()
        expect((wrapper.vm.$refs.input as HTMLElement).focus).toHaveBeenCalled()
    })
})
