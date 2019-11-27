import { shallowMount } from '@vue/test-utils'
import BTimepicker from '@components/timepicker/Timepicker'

let wrapper

describe('BTimepicker', () => {
    beforeEach(() => {
        wrapper = shallowMount(BTimepicker)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BTimepicker')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('returns "1" for nativeStep is enableSeconds is true', () => {
        expect(wrapper.vm.nativeStep).toBeUndefined()
        wrapper.setProps({ enableSeconds: true })
        expect(wrapper.vm.nativeStep).toBe('1')
    })

    it('disables hour if no selectable minutes available', () => {
        wrapper.setProps({
            'minTime': new Date(2019, 8, 22, 11, 55),
            'incrementMinutes': 10
        })
        expect(wrapper.find('option[value="11"]').attributes()['disabled']).toBe('disabled')
        expect(wrapper.find('option[value="12"]').attributes()['disabled']).not.toBe('disabled')
    })
})
