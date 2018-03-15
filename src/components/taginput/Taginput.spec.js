import { shallow } from '@vue/test-utils'
import BTaginput from '@components/taginput/Taginput'

describe('BTaginput', () => {
    it('is called', () => {
        const wrapper = shallow(BTaginput)

        expect(wrapper.name()).toBe('BTaginput')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
