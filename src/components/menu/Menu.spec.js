import { shallowMount } from '@vue/test-utils'
import BMenu from '@components/menu/Menu'

describe('BMenu', () => {
    it('is called', () => {
        const wrapper = shallowMount(BMenu)
        expect(wrapper.name()).toBe('BMenu')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
