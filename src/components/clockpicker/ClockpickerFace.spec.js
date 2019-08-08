import { shallowMount } from '@vue/test-utils'
import BClockpickerFace from '@components/clockpicker/ClockpickerFace'

let wrapper

describe('BClockpickerFace', () => {
    beforeEach(() => {
        wrapper = shallowMount(BClockpickerFace)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BClockpickerFace')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
