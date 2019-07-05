import { shallowMount } from '@vue/test-utils'
import BMenuItem from '@components/menu/MenuItem'

describe('BMenuItem', () => {
    it('is called', () => {
        const wrapper = shallowMount(BMenuItem)
        expect(wrapper.name()).toBe('BMenuItem')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
