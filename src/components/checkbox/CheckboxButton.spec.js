import { shallowMount } from '@vue/test-utils'
import BCheckboxButton from '@components/checkbox/CheckboxButton'

let wrapper

describe('BCheckboxButton', () => {
    beforeEach(() => {
        wrapper = shallowMount(BCheckboxButton)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BCheckboxButton')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('has an input checkbox', () => {
        expect(wrapper.contains('label input[type=checkbox]')).toBeTruthy()
    })

    it('emit input event with value when value change', () => {
        const NEW_VALUE = true

        wrapper.vm.computedValue = NEW_VALUE

        expect(wrapper.vm.newValue).toBeTruthy()
        const valueEmitted = wrapper.emitted()['input'][0]
        expect(valueEmitted).toContainEqual(NEW_VALUE)
    })
})
