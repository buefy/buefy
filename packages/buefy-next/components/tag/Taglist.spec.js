import { shallowMount } from '@vue/test-utils'
import BTaglist from '@components/tag/Taglist'

let wrapper

describe('BTaglist', () => {
    beforeEach(() => {
        wrapper = shallowMount(BTaglist)
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BTaglist')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
