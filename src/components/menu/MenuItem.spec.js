import { shallowMount } from '@vue/test-utils'
import BMenuItem from '@components/menu/MenuItem'

let wrapper

describe('BMenuItem', () => {
    beforeEach(() => {
        wrapper = shallowMount(BMenuItem)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BMenuItem')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
