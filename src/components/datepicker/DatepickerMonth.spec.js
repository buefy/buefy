import { shallowMount } from '@vue/test-utils'
import BDatepickerMonth from '@components/datepicker/DatepickerMonth'

import config, {setOptions} from '@utils/config'

let wrapper

const newDate = (y, m, d) => {
    const date = new Date(Date.UTC(y, m, d))
    date.getDate = jest.fn(() => date.getUTCDate())
    return date
}

const thisMonth = new Date().getMonth()
let events = [
    newDate(2019, thisMonth, 2),
    newDate(2019, thisMonth, 6),
    {
        date: newDate(2019, thisMonth, 6),
        type: 'is-info'
    },
    {
        date: newDate(2019, thisMonth, 8),
        type: 'is-danger'
    },
    {
        date: newDate(2019, thisMonth, 10),
        type: 'is-success'
    },
    {
        date: newDate(2019, thisMonth, 10),
        type: 'is-link'
    },
    newDate(2019, thisMonth, 12),
    {
        date: newDate(2019, thisMonth, 12),
        type: 'is-warning'
    },
    {
        date: newDate(2019, thisMonth, 16),
        type: 'is-danger'
    },
    newDate(2019, thisMonth, 20),
    {
        date: newDate(2019, thisMonth, 29),
        type: 'is-success'
    },
    {
        date: newDate(2019, thisMonth, 29),
        type: 'is-warning'
    },
    {
        date: newDate(2019, thisMonth, 29),
        type: 'is-info'
    }
]

describe('BDatepickerMonth', () => {
    beforeEach(() => {
        setOptions(Object.assign(config, {
            defaultMonthNames: [
                'January', 'February', 'March', 'April', 'May', 'June', 'July',
                'August', 'September', 'October', 'November', 'December'
            ],
            focusedDate: newDate(2018, 7, 1)
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

    const dateCreator = () => newDate()

    it('is called', () => {
        expect(wrapper.name()).toBe('BDatepickerMonth')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('manage events accordingly', () => {
        wrapper.setProps({
            events
        })
        expect(wrapper.vm.hasEvents).toBeTruthy()
    })

    it('emit chosen date', () => {
        wrapper.vm.selectableDate = jest.fn(() => true)
        wrapper.vm.emitChosenDate(5)
        expect(wrapper.vm.selectableDate).toHaveBeenCalled()
        expect(wrapper.emitted()['input']).toBeTruthy()
    })
})
