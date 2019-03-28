import { shallow } from '@vue/test-utils'
import BClockpicker from '@components/clockpicker/Clockpicker'

describe('BClockpicker', () => {
    it('is called', () => {
        const wrapper = shallow(BClockpicker)

        expect(wrapper.name()).toBe('BClockpicker')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
