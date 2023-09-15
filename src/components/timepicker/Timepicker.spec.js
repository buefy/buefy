import { shallowMount } from '@vue/test-utils'
import BTimepicker from '@components/timepicker/Timepicker'

let wrapper

describe('BTimepicker', () => {
    beforeEach(() => {
        wrapper = shallowMount(BTimepicker, {
            global: {
                stubs: {
                    // these components must not be stubs
                    // to reproduce a snapshot closer to the legacy one
                    //
                    // "disables hour if no selectable minutes available"
                    // test case also depends on slots in <b-select>
                    'b-dropdown': false,
                    'b-dropdown-item': false,
                    'b-field': false,
                    'b-select': false
                }
            }
        })
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BTimepicker')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('returns "1" for nativeStep is enableSeconds is true', async () => {
        expect(wrapper.vm.nativeStep).toBeUndefined()
        await wrapper.setProps({ enableSeconds: true })
        expect(wrapper.vm.nativeStep).toBe('1')
    })

    it('disables hour if no selectable minutes available', async () => {
        await wrapper.setProps({
            minTime: new Date(2019, 8, 22, 11, 55),
            incrementMinutes: 10
        })
        expect(wrapper.find('option[value="11"]').attributes().disabled).toBe('')
        expect(wrapper.find('option[value="12"]').attributes().disabled).toBeUndefined()
    })
})
