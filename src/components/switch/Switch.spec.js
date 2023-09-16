import { shallowMount } from '@vue/test-utils'
import BSwitch from '@components/switch/Switch'

let wrapper

describe('BSwitch', () => {
    beforeEach(() => {
        wrapper = shallowMount(BSwitch, {
            slots: {
                default: [
                    'Control label'
                ]
            }
        })
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BSwitch')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('renders input element by default', () => {
        expect(wrapper.find('input').exists()).toBeTruthy()
        expect(wrapper.classes()).toContain('switch')
    })

    it('updates internal value when v-model is changed', async () => {
        const newValue = 'switch value'
        await wrapper.setProps({ modelValue: newValue })
        expect(wrapper.vm.newValue).toBe(newValue)
    })

    it('emit input event when computedValue is set', () => {
        const newValue = 'switch value'
        wrapper.vm.computedValue = newValue
        const valueEmitted = wrapper.emitted()['update:modelValue'][0]
        expect(wrapper.vm.newValue).toBe(newValue)
        expect(valueEmitted).toContainEqual(newValue)
    })

    it('method focus() gives focus to the input element', async () => {
        wrapper.vm.$refs.input.focus = jest.fn()
        wrapper.vm.focus()
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.$refs.input.focus).toHaveBeenCalled()
    })

    it('applies passiveType prop properly', async () => {
        const passiveType = 'is-danger'
        const modelValue = false
        await wrapper.setProps({ passiveType, modelValue })
        const switchElement = wrapper.find('.check')
        expect(switchElement.classes()).toContain('is-danger-passive')
    })

    it('does not have a label at left by default', async () => {
        const modelValue = false
        wrapper.setProps({ modelValue })
        expect(wrapper.classes()).not.toContain('has-left-label')
    })

    it('has label at left is left-label prop has been sent', async () => {
        const leftLabel = true
        const modelValue = false
        await wrapper.setProps({ leftLabel, modelValue })
        expect(wrapper.classes()).toContain('has-left-label')
    })
})
