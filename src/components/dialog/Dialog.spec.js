import { shallow } from '@vue/test-utils'
import BDialog from '@components/dialog/Dialog'

describe('BDialog', () => {
    it('is called', () => {
        const wrapper = shallow(BDialog, {
            attachToDocument: true
        })
        expect(wrapper.name()).toBe('BDialog')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
