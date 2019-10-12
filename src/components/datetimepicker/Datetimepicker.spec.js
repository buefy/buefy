import { shallowMount } from '@vue/test-utils'
import Datetimepicker from '@components/datetimepicker/Datetimepicker'

let wrapper

describe('Datetimepicker', () => {
    beforeEach(() => {
        wrapper = shallowMount(Datetimepicker)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BDatetimepicker')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
