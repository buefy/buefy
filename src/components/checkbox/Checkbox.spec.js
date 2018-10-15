import { shallowMount } from '@vue/test-utils'
import Helpers from 'mwangaben-vthelpers'
import BCheckbox from '@components/checkbox/Checkbox'

let wrapper, b

describe('BCheckbox', () => {
    beforeEach(() => {
        wrapper = shallowMount(BCheckbox)
        b = new Helpers(wrapper, expect)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BCheckbox')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('has an input checkbox', () => {
        b.domHas('label input[type=checkbox]')
    })

    it('emit input event with value when value change', () => {
        const NEW_VALUE = true

        wrapper.setProps({ value: NEW_VALUE })

        expect(wrapper.vm.newValue).toBeTruthy()
        b.emittedContains('input', NEW_VALUE)
    })
})
