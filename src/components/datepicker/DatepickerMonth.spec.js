import { shallowMount } from '@vue/test-utils'
import BDatepickerMonth from '@components/datepicker/DatepickerMonth'

import config, {setOptions} from '@utils/config'

let wrapper

const newDate = (y, m, d) => {
    const date = new Date(Date.UTC(y, m, d))
    date.getDate = jest.fn(() => date.getUTCDate())
    date.getMonth = jest.fn(() => date.getUTCMonth())
    date.getFullYear = jest.fn(() => date.getUTCFullYear())
    return date
}

const thisMonth = newDate(2020, 4, 15).getUTCMonth()
let events = [
    newDate(2018, 10, 10),
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
            focusedDate: newDate(2019, thisMonth, 11)
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
        expect(wrapper.vm.eventsInThisYear.length).toBe(events.length - 1)
    })

    it('emit chosen date', () => {
        wrapper.vm.selectableDate = jest.fn(() => true)
        wrapper.vm.emitChosenDate(5)
        expect(wrapper.vm.selectableDate).toHaveBeenCalled()
        expect(wrapper.emitted()['input']).toBeTruthy()
    })

    it('emit input when updateSelectedDate is called with range props false', () => {
        wrapper.setProps({
            range: false
        })
        wrapper.vm.selectableDate = jest.fn(() => true)
        wrapper.vm.updateSelectedDate(5)
        expect(wrapper.emitted()['input']).toBeTruthy()
    })

    it('manage selectable dates as expected', () => {
        const day = newDate(2019, 7, 7)

        wrapper.setProps({
            minDate: newDate(2019, 7, 17)
        })
        expect(wrapper.vm.selectableDate(day)).toBeFalsy()

        wrapper.setProps({
            minDate: null,
            maxDate: newDate(2019, 7, 1)
        })
        expect(wrapper.vm.selectableDate(day)).toBeFalsy()

        wrapper.setProps({
            minDate: null,
            maxDate: null,
            selectableDates: [newDate(2019, 5, 1), newDate(2019, 5, 2)]
        })
        expect(wrapper.vm.selectableDate(day)).toBeFalsy()
        wrapper.setProps({
            selectableDates: [
                newDate(config.focusedDate.getFullYear(), config.focusedDate.getMonth(), 1),
                newDate(config.focusedDate.getFullYear(), config.focusedDate.getMonth(), 2),
                day
            ]
        })
        expect(wrapper.vm.selectableDate(day)).toBeTruthy()

        wrapper.setProps({
            selectableDates: (d) => d.getMonth() === 7
        })
        expect(wrapper.vm.selectableDate(day)).toBeTruthy()
        expect(wrapper.vm.selectableDate(new Date(2019, 6, 7))).toBeFalsy()
        expect(wrapper.vm.selectableDate(new Date(2019, 8, 7))).toBeFalsy()

        wrapper.setProps({
            minDate: null,
            maxDate: null,
            selectableDates: null,
            unselectableDates: [newDate(2019, 5, 1), newDate(2019, 5, 2)]
        })
        expect(wrapper.vm.selectableDate(day)).toBeTruthy()
        wrapper.setProps({
            unselectableDates: [day]
        })
        expect(wrapper.vm.selectableDate(day)).toBeFalsy()

        wrapper.setProps({
            unselectableDates: (d) => d.getMonth() === 7
        })
        expect(wrapper.vm.selectableDate(day)).toBeFalsy()
        expect(wrapper.vm.selectableDate(new Date(2019, 6, 7))).toBeTruthy()
        expect(wrapper.vm.selectableDate(new Date(2019, 8, 7))).toBeTruthy()

        wrapper.setProps({
            selectableDates: (d) => d.getMonth() === 7,
            unselectableDates: (d) => true
        })
        expect(wrapper.vm.selectableDate(day)).toBeTruthy()

        wrapper.setProps({
            minDate: null,
            maxDate: null,
            selectableDates: null,
            unselectableDates: null,
            unselectableDaysOfWeek: [0, 1]
        })
        expect(wrapper.vm.selectableDate(day)).toBeTruthy()
    })

    it('emit focused date', () => {
        const [y, m, d] = [2019, 4, 4]
        const day = newDate(y, m, d)

        let inc = 1
        let expected = day
        expected.setMonth(day.getMonth() + inc)
        wrapper.vm.changeFocus(day, inc)
        let valueEmitted = wrapper.emitted()['change-focus'][0]
        expect(valueEmitted).toContainEqual(expected)

        inc = -1
        expected = day
        expected.setMonth(day.getMonth() + inc)
        wrapper.vm.changeFocus(day, inc)
        valueEmitted = wrapper.emitted()['change-focus'][0]
        expect(valueEmitted).toContainEqual(expected)

        inc = 3
        expected = day
        expected.setMonth(day.getMonth() + inc)
        wrapper.vm.changeFocus(day, inc)
        valueEmitted = wrapper.emitted()['change-focus'][0]
        expect(valueEmitted).toContainEqual(expected)

        inc = -3
        expected = day
        expected.setMonth(day.getMonth() + inc)
        wrapper.vm.changeFocus(day, inc)
        valueEmitted = wrapper.emitted()['change-focus'][0]
        expect(valueEmitted).toContainEqual(expected)
    })

    describe('Multiple dates', () => {
        beforeEach(() => {
            wrapper.setProps({multiple: true})
        })

        it('should manage multiple dates update as expected', () => {
            let date1 = newDate(2020, 3, 10)
            let date2 = newDate(2020, 3, 15)
            let date3 = newDate(2020, 3, 20)

            wrapper.vm.emitChosenDate(date1)
            expect(wrapper.vm.multipleSelectedDates).toContainEqual(date1)
            expect(wrapper.emitted()['input'][0]).toContainEqual([date1])

            wrapper.vm.emitChosenDate(date2)
            expect(wrapper.vm.multipleSelectedDates).toContainEqual(date2)
            expect(wrapper.emitted()['input'][0]).toContainEqual([date1, date2])

            wrapper.vm.emitChosenDate(date3)
            expect(wrapper.vm.multipleSelectedDates).toContainEqual(date3)
            expect(wrapper.emitted()['input'][0]).toContainEqual([date1, date2, date3])

            wrapper.vm.emitChosenDate(date1)
            expect(wrapper.vm.multipleSelectedDates).toEqual([date2, date3])
        })
    })

    describe('ClassObject with range props', () => {
        beforeEach(() => {
            wrapper.setProps({
                range: true,
                focused: {
                    month: newDate(2020, 1, 1).getMonth(),
                    year: newDate(2020, 1, 1).getFullYear()
                },
                value: [newDate(2020, 1, 1), newDate(2020, 5, 1)]
            })
        })

        it('should have is-selected class for all range of dates selected', () => {
            expect(wrapper.findAll('section > div > div > .is-selected').length).toBe(5)
        })

        it('should have is-first-selected class for the first date selected within the range', () => {
            expect(wrapper.findAll('section > div > div > .is-selected').at(0).classes()).toContain('is-first-selected')
        })

        it('should have is-within-selected class for the dates selected within the range', () => {
            expect(wrapper.findAll('section > div > div > .is-selected.is-within-selected').length).toBe(3)
        })

        it('should have is-last-selected class for the last date selected within the range', () => {
            expect(wrapper.findAll('section > div > div > .is-selected').at(4).classes()).toContain('is-last-selected')
        })

        describe('hoverd class with range props', () => {
            beforeEach(() => {
                wrapper.setData({
                    selectedBeginDate: newDate(2020, 3, 1),
                    hoveredEndDate: newDate(2020, 6, 1)
                })
            })

            it('should have is-within-hovered-range class for all range of dates hovered', () => {
                expect(wrapper.findAll('section > div > div > .is-within-hovered-range').length).toBe(4)
            })

            it('should have is-first-hovered class for the first date hovered within the range', () => {
                expect(wrapper.findAll('section > div > div > .is-first-hovered').at(0).classes()).toContain('is-first-hovered')
            })

            it('should have is-within-hovered class for the dates hovered within the range', () => {
                expect(wrapper.findAll('section > div > div > .is-within-hovered-range.is-within-hovered').length).toBe(2)
            })

            it('should have is-last-hovered class for the last date hovered within the range', () => {
                expect(wrapper.findAll('section > div > div > .is-within-hovered-range').at(3).classes()).toContain('is-last-hovered')
            })
        })
    })
})
