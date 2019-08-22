import { shallowMount } from '@vue/test-utils'
import BTimepicker from '@components/timepicker/Timepicker'

describe('BTimepicker', () => {
    it('is called', () => {
        const wrapper = shallowMount(BTimepicker)
        expect(wrapper.name()).toBe('BTimepicker')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        const wrapper = shallowMount(BTimepicker)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('returns "1" for nativeStep is enableSeconds is true', () => {
        const wrapper = shallowMount(BTimepicker, {
            propsData: {
                enableSeconds: true
            }
        })

        expect(wrapper.vm.nativeStep).toBe('1')
    })

    it('disables hour if no selectable minutes available', () => {
        const wrapper = shallowMount(BTimepicker, {
            propsData: {
                'min-time': new Date(2019, 8, 22, 11, 55),
                'increment-minutes': 10
            }
        })
        expect(wrapper.find('option[value="11"]').attributes()['disabled']).toBe('disabled')
        expect(wrapper.find('option[value="12"]').attributes()['disabled']).not.toBe('disabled')
    })
})
