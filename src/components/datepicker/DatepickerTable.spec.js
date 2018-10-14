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
            defaultDayNames: ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'S']
        }))
    })

    it('is called', () => {
        const wrapper = shallowMount(BDatepickerTable, {
            propsData: {
                dayNames: config.defaultMonthNames,
                monthNames: config.defaultMonthNames,
                focused: {
                    month: new Date(),
                    year: new Date()
                }
            }
        })
        expect(wrapper.name()).toBe('BDatepickerTable')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
