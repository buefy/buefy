import { shallowMount } from '@vue/test-utils'
import BDatepickerMonth from '@components/datepicker/DatepickerMonth'

import config, {setOptions} from '@utils/config'

describe('BDatepickerMonth', () => {
    beforeEach(() => {
        setOptions(Object.assign(config, {
            defaultMonthNames: [
                'January', 'February', 'March', 'April', 'May', 'June', 'July',
                'August', 'September', 'October', 'November', 'December'
            ],
            focusedDate: new Date('2018-07')
        }))
    })

    const dateCreator = () => new Date()

    it('is called', () => {
        const wrapper = shallowMount(BDatepickerMonth, {
            propsData: {
                monthNames: config.defaultMonthNames,
                focused: {
                    month: config.focusedDate.getMonth(),
                    year: config.focusedDate.getFullYear()
                },
                dateCreator
            }
        })
        expect(wrapper.name()).toBe('BDatepickerMonth')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
