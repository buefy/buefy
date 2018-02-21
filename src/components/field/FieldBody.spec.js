import { shallow } from '@vue/test-utils'
import BFieldBody from '@components/field/FieldBody'

describe('BFieldBody', () => {
    it('is called', () => {
        const wrapper = shallow(BFieldBody, {
            slots: {
                default: 'content'
            }
        })
        expect(wrapper.name()).toBe('BFieldBody')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
