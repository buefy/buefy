import { shallowMount } from '@vue/test-utils'
import BDatepickerMonth from '@components/datepicker/DatepickerMonth'

import config, {setOptions} from '@utils/config'

let wrapper

describe('BDatepickerMonth', () => {
    beforeEach(() => {
        setOptions(Object.assign(config, {
            defaultMonthNames: [
                'January', 'February', 'March', 'April', 'May', 'June', 'July',
                'August', 'September', 'October', 'November', 'December'
            ],
            focusedDate: new Date('2018-07')
        }))

        wrapper = shallowMount(BDatepickerMonth, {
            propsData: {
                monthNames: config.defaultMonthNames,
                focused: {
                    month: config.focusedDate.getMonth(),
                    year: config.focusedDate.getFullYear()
                },
                dateCreator
            }
        })
    })

    const dateCreator = () => new Date()

    it('is called', () => {
        expect(wrapper.name()).toBe('BDatepickerMonth')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
