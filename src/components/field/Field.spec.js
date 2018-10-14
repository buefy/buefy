import { shallowMount } from '@vue/test-utils'
import BField from '@components/field/Field'

describe('BField', () => {
    it('is called', () => {
        const wrapper = shallowMount(BField)
        expect(wrapper.name()).toBe('BField')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
