import { shallowMount } from '@vue/test-utils'
import BFieldBody from '@components/field/FieldBody'

describe('BFieldBody', () => {
    it('is called', () => {
        const wrapper = shallowMount(BFieldBody, {
            slots: {
                default: 'content'
            }
        })
        expect(wrapper.name()).toBe('BFieldBody')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
