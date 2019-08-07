import { shallowMount } from '@vue/test-utils'
import BTimepicker from '@components/timepicker/Timepicker'

describe('BTimepicker', () => {
    it('is called', () => {
        const wrapper = shallowMount(BTimepicker)

        expect(wrapper.name()).toBe('BTimepicker')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('returns "1" for nativeStep is enableSeconds is true', () => {
        const wrapper = shallowMount(BTimepicker, {
            propsData: {
                enableSeconds: true
            }
        })

        expect(wrapper.vm.nativeStep).toBe('1')
    })
})
