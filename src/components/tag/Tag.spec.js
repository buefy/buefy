import { shallow } from '@vue/test-utils'
import BTag from '@components/tag/Tag'

describe('BTag', () => {
    it('is called', () => {
        const wrapper = shallow(BTag)

        expect(wrapper.name()).toBe('BTag')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
