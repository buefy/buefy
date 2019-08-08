import { shallowMount } from '@vue/test-utils'
import BClockpicker from '@components/clockpicker/Clockpicker'

let wrapper

describe('BClockpicker', () => {
    beforeEach(() => {
        wrapper = shallowMount(BClockpicker)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BClockpicker')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
