import { shallowMount } from '@vue/test-utils'
import BClockpicker from '@components/clockpicker/Clockpicker'

let wrapper

describe('BClockpicker', () => {
    beforeEach(() => {
        wrapper = shallowMount(BClockpicker, {
            propsData: {
                locale: 'en-US'
            }
        })
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BClockpicker')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('displays hours accordingly', () => {
        expect(wrapper.vm.hoursDisplay).toBe('--')

        wrapper.setProps({hourFormat: '24'})
        wrapper.vm.hoursSelected = 5
        expect(wrapper.vm.hoursDisplay).toBe('05')
        wrapper.vm.hoursSelected = 10
        expect(wrapper.vm.hoursDisplay).toBe('10')
        wrapper.vm.hoursSelected = 15
        expect(wrapper.vm.hoursDisplay).toBe('15')

        wrapper.setProps({hourFormat: '12'})
        wrapper.vm.meridienSelected = wrapper.vm.AM
        wrapper.vm.hoursSelected = 5
        expect(wrapper.vm.hoursDisplay).toBe(5)
        wrapper.vm.hoursSelected = 10
        expect(wrapper.vm.hoursDisplay).toBe(10)
        wrapper.vm.meridienSelected = wrapper.vm.PM
        wrapper.vm.hoursSelected = 12
        expect(wrapper.vm.hoursDisplay).toBe(12)
        wrapper.vm.hoursSelected = 15
        expect(wrapper.vm.hoursDisplay).toBe(3)
    })

    it('displays minutes accordingly', () => {
        expect(wrapper.vm.minutesDisplay).toBe('--')

        wrapper.vm.minutesSelected = 5
        expect(wrapper.vm.minutesDisplay).toBe('05')

        wrapper.vm.minutesSelected = 10
        expect(wrapper.vm.minutesDisplay).toBe('10')
    })

    it('return if face is disabled accordingly', () => {
        wrapper.vm.isSelectingHour = true
        expect(wrapper.vm.faceDisabledValues).toBe(wrapper.vm.isHourDisabled)

        wrapper.vm.isSelectingHour = false
        expect(wrapper.vm.faceDisabledValues).toBe(wrapper.vm.isMinuteDisabled)
    })

    it('react accordingly when a value is selected', () => {
        const value = 5

        wrapper.vm.isSelectingHour = true
        wrapper.vm.onHoursChange = jest.fn()
        wrapper.vm.onClockInput(value)
        expect(wrapper.vm.hoursSelected).toBe(value)
        expect(wrapper.vm.onHoursChange).toHaveBeenCalledWith(value)

        wrapper.vm.isSelectingHour = false
        wrapper.vm.onMinutesChange = jest.fn()
        wrapper.vm.onClockInput(value)
        expect(wrapper.vm.minutesSelected).toBe(value)
        expect(wrapper.vm.onMinutesChange).toHaveBeenCalledWith(value)
    })

    it('react accordingly when changing clock', () => {
        wrapper.vm.isSelectingHour = false
        wrapper.vm.onClockChange()
        wrapper.vm.isSelectingHour = true
        wrapper.vm.onClockChange()
        expect(wrapper.vm.isSelectingHour).toBeFalsy()
    })
    it('react accordingly when changing meridien', () => {
        wrapper.vm.onMeridienChange = jest.fn()
        wrapper.vm.meridienSelected = wrapper.vm.PM
        wrapper.vm.onMeridienClick(wrapper.vm.PM)
        wrapper.vm.onMeridienClick(wrapper.vm.AM)
        expect(wrapper.vm.meridienSelected).toBe(wrapper.vm.AM)
        expect(wrapper.vm.onMeridienChange).toHaveBeenCalledWith(wrapper.vm.AM)
    })
})
