import { shallow } from '@vue/test-utils'
import BDatepicker from '@components/datepicker/Datepicker'

describe('BDatepicker', () => {
    it('is called', () => {
        const wrapper = shallow(BDatepicker)
        expect(wrapper.name()).toBe('BDatepicker')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
