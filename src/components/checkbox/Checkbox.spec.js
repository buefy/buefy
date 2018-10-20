import { shallowMount } from '@vue/test-utils'
import BCheckbox from '@components/checkbox/Checkbox'

let wrapper

describe('BCheckbox', () => {
    beforeEach(() => {
        wrapper = shallowMount(BCheckbox)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BCheckbox')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('has an input checkbox', () => {
        expect(wrapper.contains('label input[type=checkbox]')).toBeTruthy()
    })

    it('emit input event with value when value change', () => {
        const NEW_VALUE = true

        wrapper.setProps({ value: NEW_VALUE })

        expect(wrapper.vm.newValue).toBeTruthy()
        const valueEmitted = wrapper.emitted()['input'][0]
        expect(valueEmitted).toContainEqual(NEW_VALUE)
    })
})
