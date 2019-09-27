import { shallowMount } from '@vue/test-utils'
import BTaglist from '@components/tag/Taglist'

let wrapper

describe('BTaglist', () => {
    beforeEach(() => {
        wrapper = shallowMount(BTaglist)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BTaglist')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
