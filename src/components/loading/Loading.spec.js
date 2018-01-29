import { shallow } from '@vue/test-utils'
import BLoading from '@components/loading/Loading'

describe('BLoading', () => {
    it('Is called', () => {
        const wrapper = shallow(BLoading)
        expect(wrapper.name()).toBe('BLoading')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
