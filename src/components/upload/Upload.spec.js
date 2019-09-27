import { shallowMount } from '@vue/test-utils'
import BUpload from '@components/upload/Upload'

let wrapper

describe('BUpload', () => {
    beforeEach(() => {
        wrapper = shallowMount(BUpload)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BUpload')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
