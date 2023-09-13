import { shallowMount } from '@vue/test-utils'
import BUpload from '@components/upload/Upload'

let wrapper

describe('BUpload', () => {
    beforeEach(() => {
        wrapper = shallowMount(BUpload)
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BUpload')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
