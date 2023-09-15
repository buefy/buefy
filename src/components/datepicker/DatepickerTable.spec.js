import { shallowMount } from '@vue/test-utils'
import BDatepickerTable from '@components/datepicker/DatepickerTable'
import config, { setOptions } from '@utils/config'

let defaultProps

const newDate = (y, m, d) => {
    // it used to create a date in UTC. but it is unnecessary,
    // because DatepickerTable entirely works in the local time zone.
    return new Date(y, m, d)
}

describe('BDatepickerTable', () => {
    beforeEach(() => {
        setOptions(Object.assign(config, {
            defaultFirstDayOfWeek: 0,
            defaultMonthNames: [
                'January', 'February', 'March', 'April', 'May', 'June', 'July',
                'August', 'September', 'October', 'November', 'December'
            ],
            defaultDayNames: ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'S'],
            focusedDate: newDate(2018, 7, 10),
            defaultUnselectableDaysOfWeek: []
        }))

        defaultProps = () => ({
            modelValue: newDate(2018, 6, 21),
            dayNames: config.defaultDayNames,
            monthNames: config.defaultMonthNames,
            focused: {
                month: config.focusedDate.getMonth(),
                year: config.focusedDate.getFullYear()
            },
            firstDayOfWeek: config.defaultFirstDayOfWeek,
            unselectableDaysOfWeek: config.defaultUnselectableDaysOfWeek,
            events: []
        })
    })

    it('is called', () => {
        const wrapper = shallowMount(BDatepickerTable, {
            props: {
                ...defaultProps()
            }
        })
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BDatepickerTable')
    })

    it('render correctly', () => {
        // replaces weeksInThisMonth to suppress locale dependent outputs
        jest.spyOn(BDatepickerTable.computed, 'weeksInThisMonth').mockReturnValue([])
        const wrapper = shallowMount(BDatepickerTable, {
            props: {
                ...defaultProps()
            }
        })
        expect(wrapper.html()).toMatchSnapshot()
        BDatepickerTable.computed.weeksInThisMonth.mockRestore()
    })

    it('assign events to weeks even if the event has a time', () => {
        const wrapper = shallowMount(BDatepickerTable, {
            props: {
                dayNames: config.defaultDayNames,
                monthNames: config.defaultMonthNames,
                events: [new Date('July 22, 2018 07:22:13'), new Date('July 23, 2018 00:00:00')],
                focused: {
                    month: 6,
                    year: 2018
                },
                showWeekNumber: true
            }
        })
        expect(wrapper.vm.eventsInThisWeek(wrapper.vm.weeksInThisMonth[3]).length).toEqual(2)
    })

    it('manage events as expected', () => {
        const monthEvent = {
            date: newDate(config.focusedDate.getFullYear(), config.focusedDate.getMonth(), 13),
            type: 'is-primary'
        }
        const events = [
            newDate(2020, 3, 3),
            monthEvent
        ]
        const wrapper = shallowMount(BDatepickerTable, {
            props: {
                ...defaultProps(),
                events
            }
        })
        expect(wrapper.vm.eventsInThisMonth).toEqual([monthEvent])
    })

    it('emit input event with selected date as payload when updateSelectedDate is called', () => {
        const wrapper = shallowMount(BDatepickerTable, {
            props: {
                ...defaultProps()
            }
        })
        const newDate = new Date()
        wrapper.vm.updateSelectedDate(newDate)
        const valueEmitted = wrapper.emitted()['update:modelValue'][0]
        expect(valueEmitted).toContainEqual(newDate)
    })

    it('manage selectable dates as expected', async () => {
        const day = newDate(2019, 7, 7)
        const wrapper = shallowMount(BDatepickerTable, {
            props: {
                ...defaultProps()
            }
        })

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
            selectableDates: [newDate(2019, 7, 1), newDate(2019, 7, 2)]
        })
        expect(wrapper.vm.selectableDate(day)).toBeFalsy()
        await wrapper.setProps({
            selectableDates: [newDate(2019, 7, 1), newDate(2019, 7, 2), day]
        })
        expect(wrapper.vm.selectableDate(day)).toBeTruthy()

        await wrapper.setProps({
            minDate: null,
            maxDate: null,
            selectableDates: null,
            unselectableDates: [newDate(2019, 7, 1), newDate(2019, 7, 2)]
        })
        expect(wrapper.vm.selectableDate(day)).toBeTruthy()
        await wrapper.setProps({
            unselectableDates: [day]
        })
        expect(wrapper.vm.selectableDate(day)).toBeFalsy()

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
        const wrapper = shallowMount(BDatepickerTable, {
            props: {
                ...defaultProps()
            }
        })

        const [y, m, d] = [2019, 4, 4]
        const day = newDate(y, m, d)
        const expected = {
            day: day.getDate(),
            month: day.getMonth(),
            year: day.getFullYear()
        }

        wrapper.vm.changeFocus(day)
        const valueEmitted = wrapper.emitted()['update:focused'][0]
        expect(valueEmitted).toContainEqual(expected)
    })

    describe('#hoveredDateRange', () => {
        const selectedBeginDate = new Date(2019, 3, 10)
        const threeDaysAfterBeginDate = new Date(2019, 3, 13)
        const threeDaysBeforeBeginDate = new Date(2019, 3, 7)

        it('should return an empty array when props range is false', () => {
            const wrapper = shallowMount(BDatepickerTable, {
                props: {
                    ...defaultProps(),
                    range: false
                }
            })
            expect(wrapper.vm.hoveredDateRange).toEqual([])
        })

        it('should return an empty array when selectedEndDate exists', async () => {
            const wrapper = shallowMount(BDatepickerTable, {
                props: {
                    ...defaultProps(),
                    range: true
                }
            })
            await wrapper.setData({
                selectedBeginDate,
                selectedEndDate: threeDaysAfterBeginDate
            })
            expect(wrapper.vm.hoveredDateRange).toEqual([])
        })

        it('should return an array of two dates', async () => {
            const wrapper = shallowMount(BDatepickerTable, {
                props: {
                    ...defaultProps(),
                    range: true
                }
            })
            await wrapper.setData({
                selectedBeginDate,
                hoveredEndDate: threeDaysAfterBeginDate
            })
            expect(wrapper.vm.hoveredDateRange).toEqual([
                selectedBeginDate,
                threeDaysAfterBeginDate
            ])
        })

        it('should return the earlier date as the first element', async () => {
            const wrapper = shallowMount(BDatepickerTable, {
                props: {
                    ...defaultProps(),
                    range: true
                }
            })
            await wrapper.setData({
                selectedBeginDate,
                hoveredEndDate: threeDaysBeforeBeginDate
            })
            expect(wrapper.vm.hoveredDateRange).toEqual([
                threeDaysBeforeBeginDate,
                selectedBeginDate
            ])
        })

        it('should filter only defined values', async () => {
            const wrapper = shallowMount(BDatepickerTable, {
                props: {
                    ...defaultProps(),
                    range: true
                }
            })
            await wrapper.setData({
                selectedBeginDate,
                hoveredEndDate: undefined
            })
            expect(wrapper.vm.hoveredDateRange).toEqual([
                selectedBeginDate
            ])
        })

        it('should mange date range update as expected', async () => {
            let begin = newDate(2020, 3, 10)
            let end = newDate(2020, 3, 15)
            const wrapper = shallowMount(BDatepickerTable, {
                props: {
                    ...defaultProps(),
                    range: true
                }
            })

            wrapper.vm.updateSelectedDate(begin)
            expect(wrapper.vm.selectedBeginDate).toBe(begin)
            expect(wrapper.emitted()['range-start'][0]).toContainEqual(begin)

            wrapper.vm.updateSelectedDate(end)
            expect(wrapper.vm.selectedEndDate).toBe(end)
            expect(wrapper.emitted()['range-end'][0]).toContainEqual(end)
            expect(wrapper.emitted()['update:modelValue'][0]).toContainEqual([begin, end])

            end = begin
            begin = newDate(2020, 3, 5)
            await wrapper.setData({ selectedEndDate: undefined })
            wrapper.vm.updateSelectedDate(begin)
            expect(wrapper.vm.selectedEndDate).toBe(end)
            expect(wrapper.vm.selectedBeginDate).toBe(begin)

            wrapper.vm.updateSelectedDate(begin)
            expect(wrapper.vm.selectedEndDate).toBe(undefined)
            expect(wrapper.vm.selectedBeginDate).toBe(begin)
        })
    })
})
