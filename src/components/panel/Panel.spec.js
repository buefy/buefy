import { shallow } from '@vue/test-utils'
import BPanel from '@components/panel/Panel'

describe('BPanel', () => {
    it('is called', () => {
        const wrapper = shallow(BPanel)
        expect(wrapper.name()).toBe('BPanel')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
