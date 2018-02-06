import { shallow } from '@vue/test-utils'
import BTooltip from '@components/tooltip/Tooltip'

describe('BTooltip', () => {
    it('is called', () => {
        const wrapper = shallow(BTooltip)

        expect(wrapper.name()).toBe('BTooltip')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
