import { shallowMount } from '@vue/test-utils'
import BDatepickerTable from '@components/datepicker/DatepickerTable'

import config, {setOptions} from '@utils/config'

describe('BDatepickerTable', () => {
    beforeEach(() => {
        setOptions(Object.assign(config, {
            defaultMonthNames: [
                'January', 'February', 'March', 'April', 'May', 'June', 'July',
                'August', 'September', 'October', 'November', 'December'
            ],
            defaultDayNames: ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'S'],
            focusedDate: new Date('2018-07')
        }))
    })

    it('is called', () => {
        const wrapper = shallowMount(BDatepickerTable, {
            propsData: {
                dayNames: config.defaultDayNames,
                monthNames: config.defaultMonthNames,
                focused: {
                    month: config.focusedDate.getMonth(),
                    year: config.focusedDate.getFullYear()
                }
            }
        })
        expect(wrapper.name()).toBe('BDatepickerTable')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('assign events to weeks even if the event has a time', () => {
        const wrapper = shallowMount(BDatepickerTable, {
            propsData: {
                dayNames: config.defaultDayNames,
                monthNames: config.defaultMonthNames,
                events: [new Date('July 22, 2018 07:22:13'), new Date('July 23, 2018 00:00:00')],
                focused: {
                    month: config.focusedDate.getMonth(),
                    year: config.focusedDate.getFullYear()
                }
            }
        })
        expect(wrapper.vm.eventsInThisWeek(wrapper.vm.weeksInThisMonth[3]).length).toEqual(2)
    })
})
