import { shallow } from '@vue/test-utils'
import BProgress from '@components/progress/Progress'

describe('BProgress', () => {
    it('is called', () => {
        const wrapper = shallow(BProgress)
        expect(wrapper.name()).toBe('BProgress')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
