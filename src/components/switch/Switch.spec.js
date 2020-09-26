import { shallowMount } from '@vue/test-utils'
import BSwitch from '@components/switch/Switch'

let wrapper

describe('BSwitch', () => {
    beforeEach(() => {
        wrapper = shallowMount(BSwitch)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BSwitch')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('renders input element by default', () => {
        expect(wrapper.contains('input')).toBeTruthy()
        expect(wrapper.classes()).toContain('switch')
    })

    it('updates internal value when v-model is changed', () => {
        const newValue = 'switch value'
        wrapper.setProps({ value: newValue })
        expect(wrapper.vm.newValue).toBe(newValue)
    })

    it('emit input event when computedValue is set', () => {
        const newValue = 'switch value'
        wrapper.vm.computedValue = newValue
        const valueEmitted = wrapper.emitted()['input'][0]
        expect(wrapper.vm.newValue).toBe(newValue)
        expect(valueEmitted).toContainEqual(newValue)
    })

    it('method focus() gives focus to the input element', (done) => {
        wrapper.vm.$refs.input.focus = jest.fn()
        wrapper.vm.focus()
        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.$refs.input.focus).toHaveBeenCalled()
            done()
        })
    })

    it('applies passiveType prop properly', () => {
        const passiveType = 'is-danger'
        const value = false
        wrapper.setProps({ passiveType, value })
        const switchElement = wrapper.find('.check')
        expect(switchElement.classes()).toContain('is-danger-passive')
    })

    it('does not have a label at left by default', () => {
        const value = false
        wrapper.setProps({ value })
        expect(wrapper.classes()).not.toContain('has-left-label')
    })

    it('has label at left is left-label prop has been sent', () => {
        const leftLabel = true
        const value = false
        wrapper.setProps({ leftLabel, value })
        expect(wrapper.classes()).toContain('has-left-label')
    })
})
