import { shallow } from '@vue/test-utils'
import BTimepicker from '@components/timepicker/Timepicker'

describe('BTimepicker', () => {
    it('is called', () => {
        const wrapper = shallow(BTimepicker)

        expect(wrapper.name()).toBe('BTimepicker')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
