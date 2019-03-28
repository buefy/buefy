import { shallow } from '@vue/test-utils'
import BClockpickerFace from '@components/clockpicker/ClockpickerFace'

describe('BClockpickerFace', () => {
    it('is called', () => {
        const wrapper = shallow(BClockpickerFace)

        expect(wrapper.name()).toBe('BClockpickerFace')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
