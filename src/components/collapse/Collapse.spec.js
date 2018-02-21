import { shallow } from '@vue/test-utils'
import BCollapse from '@components/collapse/Collapse'

describe('BCollapse', () => {
    it('is called', () => {
        const wrapper = shallow(BCollapse)
        expect(wrapper.name()).toBe('BCollapse')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
