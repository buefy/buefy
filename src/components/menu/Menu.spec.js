import { shallowMount } from '@vue/test-utils'
import BMenu from '@components/menu/Menu'

let wrapper

describe('BMenu', () => {
    beforeEach(() => {
        wrapper = shallowMount(BMenu)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BMenu')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
