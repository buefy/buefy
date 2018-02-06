import { shallow } from '@vue/test-utils'
import BUpload from '@components/upload/Upload'

describe('BUpload', () => {
    it('is called', () => {
        const wrapper = shallow(BUpload)

        expect(wrapper.name()).toBe('BUpload')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
