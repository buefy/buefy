import { shallow } from '@vue/test-utils'
import BField from '@components/field/Field'

describe('BField', () => {
    it('is called', () => {
        const wrapper = shallow(BField)
        expect(wrapper.name()).toBe('BField')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
