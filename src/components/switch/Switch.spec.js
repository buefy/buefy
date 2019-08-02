import { shallowMount } from '@vue/test-utils'
import BSwitch from '@components/switch/Switch'

describe('BSwitch', () => {
    it('is called', () => {
        const wrapper = shallowMount(BSwitch)

        expect(wrapper.name()).toBe('BSwitch')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        const wrapper = shallowMount(BSwitch)

        expect(wrapper.html()).toMatchSnapshot()
    })

    it('renders input element by default', () => {
        const wrapper = shallowMount(BSwitch)

        expect(wrapper.contains('input')).toBeTruthy()
        expect(wrapper.classes()).toContain('switch')
    })

    it('updates internal value when v-model is changed', () => {
        const wrapper = shallowMount(BSwitch)
        const newValue = 'switch value'
        wrapper.setProps({ value: newValue })
        expect(wrapper.vm.newValue).toBe(newValue)
    })

    it('emit input event when computedValue is set', () => {
        const wrapper = shallowMount(BSwitch)
        const newValue = 'switch value'
        wrapper.vm.computedValue = newValue
        const valueEmitted = wrapper.emitted()['input'][0]
        expect(wrapper.vm.newValue).toBe(newValue)
        expect(valueEmitted).toContainEqual(newValue)
    })
})
