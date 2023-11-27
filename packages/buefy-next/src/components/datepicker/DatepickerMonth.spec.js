import { shallowMount } from '@vue/test-utils'
import BDatepickerMonth from '@components/datepicker/DatepickerMonth'

import config, { setOptions } from '@utils/config'

let wrapper

// it used to create a date in UTC but should use the local timezone,
// because DatepickerMonth entirely works in the local timezone
const newDate = (y, m, d) => {
    return new Date(y, m, d)
}

const thisMonth = newDate(2020, 4, 15).getMonth()
const events = [
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
            props: {
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
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BDatepickerMonth')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('manage events accordingly', async () => {
        await wrapper.setProps({
            events
        })
        expect(wrapper.vm.hasEvents).toBeTruthy()
        expect(wrapper.vm.eventsInThisYear.length).toBe(events.length - 1)
    })

    it('emit chosen date', () => {
        wrapper.vm.selectableDate = jest.fn(() => true)
        wrapper.vm.emitChosenDate(5)
        expect(wrapper.vm.selectableDate).toHaveBeenCalled()
        expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    })

    it('emit input when updateSelectedDate is called with range props false', async () => {
        await wrapper.setProps({
            range: false
        })
        wrapper.vm.selectableDate = jest.fn(() => true)
        wrapper.vm.updateSelectedDate(5)
        expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    })

    it('manage selectable dates as expected', async () => {
        const day = newDate(2019, 7, 7)

        await wrapper.setProps({
            minDate: newDate(2019, 7, 17)
        })
        expect(wrapper.vm.selectableDate(day)).toBeFalsy()

        await wrapper.setProps({
            minDate: null,
            maxDate: newDate(2019, 7, 1)
        })
        expect(wrapper.vm.selectableDate(day)).toBeFalsy()

        await wrapper.setProps({
            minDate: null,
            maxDate: null,
            selectableDates: [newDate(2019, 5, 1), newDate(2019, 5, 2)]
        })
        expect(wrapper.vm.selectableDate(day)).toBeFalsy()
        await wrapper.setProps({
            selectableDates: [
                newDate(config.focusedDate.getFullYear(), config.focusedDate.getMonth(), 1),
                newDate(config.focusedDate.getFullYear(), config.focusedDate.getMonth(), 2),
                day
            ]
        })
        expect(wrapper.vm.selectableDate(day)).toBeTruthy()

        await wrapper.setProps({
            selectableDates: (d) => d.getMonth() === 7
        })
        expect(wrapper.vm.selectableDate(day)).toBeTruthy()
        expect(wrapper.vm.selectableDate(new Date(2019, 6, 7))).toBeFalsy()
        expect(wrapper.vm.selectableDate(new Date(2019, 8, 7))).toBeFalsy()

        await wrapper.setProps({
            minDate: null,
            maxDate: null,
            selectableDates: null,
            unselectableDates: [newDate(2019, 5, 1), newDate(2019, 5, 2)]
        })
        expect(wrapper.vm.selectableDate(day)).toBeTruthy()
        await wrapper.setProps({
            unselectableDates: [day]
        })
        expect(wrapper.vm.selectableDate(day)).toBeFalsy()

        await wrapper.setProps({
            unselectableDates: (d) => d.getMonth() === 7
        })
        expect(wrapper.vm.selectableDate(day)).toBeFalsy()
        expect(wrapper.vm.selectableDate(new Date(2019, 6, 7))).toBeTruthy()
        expect(wrapper.vm.selectableDate(new Date(2019, 8, 7))).toBeTruthy()

        await wrapper.setProps({
            selectableDates: (d) => d.getMonth() === 7,
            unselectableDates: (d) => true
        })
        expect(wrapper.vm.selectableDate(day)).toBeTruthy()

        await wrapper.setProps({
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
            wrapper.setProps({ multiple: true })
        })

        it('should manage multiple dates update as expected', () => {
            const date1 = newDate(2020, 3, 10)
            const date2 = newDate(2020, 3, 15)
            const date3 = newDate(2020, 3, 20)

            wrapper.vm.emitChosenDate(date1)
            expect(wrapper.vm.multipleSelectedDates).toContainEqual(date1)
            expect(wrapper.emitted()['update:modelValue'][0]).toContainEqual([date1])

            wrapper.vm.emitChosenDate(date2)
            expect(wrapper.vm.multipleSelectedDates).toContainEqual(date2)
            expect(wrapper.emitted()['update:modelValue'][0]).toContainEqual([date1, date2])

            wrapper.vm.emitChosenDate(date3)
            expect(wrapper.vm.multipleSelectedDates).toContainEqual(date3)
            expect(wrapper.emitted()['update:modelValue'][0]).toContainEqual([date1, date2, date3])

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
                modelValue: [newDate(2020, 1, 1), newDate(2020, 5, 1)]
            })
        })

        it('should have is-selected class for all range of dates selected', () => {
            expect(wrapper.findAll('section > div > div > .is-selected').length).toBe(5)
        })

        it('should have is-first-selected class for the first date selected within the range', () => {
            expect(wrapper.findAll('section > div > div > .is-selected')[0].classes()).toContain('is-first-selected')
        })

        it('should have is-within-selected class for the dates selected within the range', () => {
            expect(wrapper.findAll('section > div > div > .is-selected.is-within-selected').length).toBe(3)
        })

        it('should have is-last-selected class for the last date selected within the range', () => {
            expect(wrapper.findAll('section > div > div > .is-selected')[4].classes()).toContain('is-last-selected')
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
                expect(wrapper.findAll('section > div > div > .is-first-hovered')[0].classes()).toContain('is-first-hovered')
            })

            it('should have is-within-hovered class for the dates hovered within the range', () => {
                expect(wrapper.findAll('section > div > div > .is-within-hovered-range.is-within-hovered').length).toBe(2)
            })

            it('should have is-last-hovered class for the last date hovered within the range', () => {
                expect(wrapper.findAll('section > div > div > .is-within-hovered-range')[3].classes()).toContain('is-last-hovered')
            })
        })
    })

    describe('focus', () => {
        let wrapper
        const nextMonth = thisMonth + 1
        let cellToFocus

        beforeEach(() => {
            wrapper = shallowMount(BDatepickerMonth, {
                props: {
                    monthNames: config.defaultMonthNames,
                    focused: {
                        month: config.focusedDate.getMonth(),
                        year: config.focusedDate.getFullYear()
                    },
                    dateCreator
                }
            })
            const refName = `month-${nextMonth}`
            if (Array.isArray(wrapper.vm.$refs[refName])) {
                cellToFocus = wrapper.vm.$refs[refName][0]
            } else {
                cellToFocus = wrapper.vm.$refs[refName]
            }
            jest.spyOn(cellToFocus, 'focus')
        })

        it('changing month should call focus on the corresponding cell', async () => {
            await wrapper.setProps({
                focused: {
                    month: nextMonth,
                    year: config.focusedDate.getFullYear()
                }
            })
            await wrapper.vm.$nextTick()
            expect(cellToFocus.focus).toHaveBeenCalled()
        })
    })
})
