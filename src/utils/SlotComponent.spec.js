import { shallow } from '@vue/test-utils'
import BSlotComponent from '@utils/SlotComponent'

describe('BSlotComponent', () => {
    it('is called', () => {
        const wrapper = shallow(BSlotComponent)

        expect(wrapper.name()).toBe('BSlotComponent')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
