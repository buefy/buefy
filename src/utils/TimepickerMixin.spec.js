import { shallowMount } from '@vue/test-utils'
import TimepickerMixin from '@utils/TimepickerMixin'

const AM = 'AM'
const PM = 'PM'
let wrapper

describe('TimepickerMixin', () => {
    HTMLElement.prototype.insertAdjacentElement = jest.fn()
    beforeEach(() => {
        const component = {
            template: '<div class="b-component"></div>',
            mixins: [TimepickerMixin]
        }
        wrapper = shallowMount(component, {
            attachTo: document.body
        })
    })

    it('should set dateSelected and emit input event when setting computedValue', async () => {
        const date = new Date()
        wrapper.vm.computedValue = date
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.dateSelected).toEqual(date)
        expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    })

    it('should return correct value for meridiens', () => {
        expect(wrapper.vm.meridiens).toEqual([AM, PM])
    })

    it('should call updateDateSelected on onSecondsChange', async () => {
        wrapper.vm.updateDateSelected = jest.fn()
        wrapper.vm.onSecondsChange()
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.updateDateSelected).toHaveBeenCalledTimes(1)
    })

    it('should update internal state with passed value on updateInternalState', async () => {
        const date = new Date()
        wrapper.vm.updateInternalState(date)
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.hoursSelected).toEqual(date.getHours())
        expect(wrapper.vm.minutesSelected).toEqual(date.getMinutes())
        expect(wrapper.vm.secondsSelected).toEqual(date.getSeconds())
    })

    it('should update internal state on updateInternalState', async () => {
        wrapper.vm.updateInternalState()
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.hoursSelected).toBeNull()
        expect(wrapper.vm.minutesSelected).toBeNull()
        expect(wrapper.vm.secondsSelected).toBeNull()
        expect(wrapper.vm.meridienSelected).toEqual(AM)
    })

    it('should call onFocus on handleOnFocus', async () => {
        wrapper.vm.onFocus = jest.fn()
        wrapper.vm.handleOnFocus()
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.onFocus).toHaveBeenCalledTimes(1)
    })

    it('should call toggle on close', async () => {
        wrapper.vm.toggle = jest.fn()
        wrapper.vm.close()
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.toggle).toHaveBeenCalledTimes(1)
    })
})
