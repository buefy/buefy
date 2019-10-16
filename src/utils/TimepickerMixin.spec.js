import { shallowMount } from '@vue/test-utils'
import TimepickerMixin from '@utils/TimepickerMixin'

const AM = 'AM'
const PM = 'PM'
let wrapper

describe('TimepickerMixin', () => {
    HTMLElement.prototype.insertAdjacentElement = jest.fn()
    beforeEach(() => {
        const component = {
            template: '<div class="b-component"></div>'
        }
        wrapper = shallowMount(component, {
            attachToDocument: true,
            mixins: [TimepickerMixin]
        })
    })

    it('should set dateSelected and emit input event when setting computedValue', (done) => {
        const date = new Date()
        wrapper.vm.computedValue = date
        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.dateSelected).toEqual(date)
            expect(wrapper.emitted()['input']).toBeTruthy()
            done()
        })
    })

    it('should return correct value for meridiens', () => {
        expect(wrapper.vm.meridiens).toEqual([AM, PM])
    })

    it('should call updateDateSelected on onSecondsChange', (done) => {
        wrapper.vm.updateDateSelected = jest.fn()
        wrapper.vm.onSecondsChange()
        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.updateDateSelected).toHaveBeenCalledTimes(1)
            done()
        })
    })

    it('should update internal state with passed value on updateInternalState', (done) => {
        const date = new Date()
        wrapper.vm.updateInternalState(date)
        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.hoursSelected).toEqual(date.getHours())
            expect(wrapper.vm.minutesSelected).toEqual(date.getMinutes())
            expect(wrapper.vm.secondsSelected).toEqual(date.getSeconds())
            done()
        })
    })

    it('should update internal state on updateInternalState', (done) => {
        wrapper.vm.updateInternalState()
        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.hoursSelected).toBeNull()
            expect(wrapper.vm.minutesSelected).toBeNull()
            expect(wrapper.vm.secondsSelected).toBeNull()
            expect(wrapper.vm.meridienSelected).toEqual(AM)
            done()
        })
    })

    it('should call onFocus on handleOnFocus', (done) => {
        wrapper.vm.onFocus = jest.fn()
        wrapper.vm.handleOnFocus()
        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.onFocus).toHaveBeenCalledTimes(1)
            done()
        })
    })

    it('should call toggle on close', (done) => {
        wrapper.vm.toggle = jest.fn()
        wrapper.vm.close()
        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.toggle).toHaveBeenCalledTimes(1)
            done()
        })
    })
})
