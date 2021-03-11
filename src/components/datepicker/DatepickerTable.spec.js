import { shallowMount } from '@vue/test-utils'
import BDatepickerTable from '@components/datepicker/DatepickerTable'
import config, {setOptions} from '@utils/config'

let defaultProps

const newDate = (y, m, d) => {
    const date = new Date(Date.UTC(y, m, d))
    date.getDate = jest.fn(() => date.getUTCDate())
    date.getMonth = jest.fn(() => date.getUTCMonth())
    date.getFullYear = jest.fn(() => date.getUTCFullYear())
    return date
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
            value: newDate(2018, 6, 21),
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
            stubs: ['b-datepicker-table-row'],
            propsData: {
                ...defaultProps()
            }
        })
        expect(wrapper.name()).toBe('BDatepickerTable')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        const wrapper = shallowMount(BDatepickerTable, {
            stub: ['b-datepicker-table-row'],
            propsData: {
                ...defaultProps()
            },
            computed: {
                weeksInThisMonth: jest.fn(() => [])
            }
        })
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('assign events to weeks even if the event has a time', () => {
        const wrapper = shallowMount(BDatepickerTable, {
            propsData: {
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
            propsData: {
                ...defaultProps(),
                events
            }
        })
        expect(wrapper.vm.eventsInThisMonth).toEqual([monthEvent])
    })

    it('emit input event with selected date as payload when updateSelectedDate is called', () => {
        const wrapper = shallowMount(BDatepickerTable, {
            propsData: {
                ...defaultProps()
            }
        })
        const newDate = new Date()
        wrapper.vm.updateSelectedDate(newDate)
        const valueEmitted = wrapper.emitted()['input'][0]
        expect(valueEmitted).toContainEqual(newDate)
    })

    it('manage selectable dates as expected', () => {
        const day = newDate(2019, 7, 7)
        const wrapper = shallowMount(BDatepickerTable, {
            propsData: {
                ...defaultProps()
            }
        })

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
            selectableDates: [newDate(2019, 7, 1), newDate(2019, 7, 2)]
        })
        expect(wrapper.vm.selectableDate(day)).toBeFalsy()
        wrapper.setProps({
            selectableDates: [newDate(2019, 7, 1), newDate(2019, 7, 2), day]
        })
        expect(wrapper.vm.selectableDate(day)).toBeTruthy()

        wrapper.setProps({
            minDate: null,
            maxDate: null,
            selectableDates: null,
            unselectableDates: [newDate(2019, 7, 1), newDate(2019, 7, 2)]
        })
        expect(wrapper.vm.selectableDate(day)).toBeTruthy()
        wrapper.setProps({
            unselectableDates: [day]
        })
        expect(wrapper.vm.selectableDate(day)).toBeFalsy()

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
        const wrapper = shallowMount(BDatepickerTable, {
            propsData: {
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
        let valueEmitted = wrapper.emitted()['update:focused'][0]
        expect(valueEmitted).toContainEqual(expected)
    })

    describe('#hoveredDateRange', () => {
        const selectedBeginDate = new Date(2019, 3, 10)
        const threeDaysAfterBeginDate = new Date(2019, 3, 13)
        const threeDaysBeforeBeginDate = new Date(2019, 3, 7)

        it('should return an empty array when props range is false', () => {
            const wrapper = shallowMount(BDatepickerTable, {
                propsData: {
                    ...defaultProps(),
                    range: false
                }
            })
            expect(wrapper.vm.hoveredDateRange).toEqual([])
        })

        it('should return an empty array when selectedEndDate exists', () => {
            const wrapper = shallowMount(BDatepickerTable, {
                propsData: {
                    ...defaultProps(),
                    range: true
                }
            })
            wrapper.setData({
                selectedBeginDate,
                selectedEndDate: threeDaysAfterBeginDate
            })
            expect(wrapper.vm.hoveredDateRange).toEqual([])
        })

        it('should return an array of two dates', () => {
            const wrapper = shallowMount(BDatepickerTable, {
                propsData: {
                    ...defaultProps(),
                    range: true
                }
            })
            wrapper.setData({
                selectedBeginDate,
                hoveredEndDate: threeDaysAfterBeginDate
            })
            expect(wrapper.vm.hoveredDateRange).toEqual([
                selectedBeginDate,
                threeDaysAfterBeginDate
            ])
        })

        it('should return the earlier date as the first element', () => {
            const wrapper = shallowMount(BDatepickerTable, {
                propsData: {
                    ...defaultProps(),
                    range: true
                }
            })
            wrapper.setData({
                selectedBeginDate,
                hoveredEndDate: threeDaysBeforeBeginDate
            })
            expect(wrapper.vm.hoveredDateRange).toEqual([
                threeDaysBeforeBeginDate,
                selectedBeginDate
            ])
        })

        it('should filter only defined values', () => {
            const wrapper = shallowMount(BDatepickerTable, {
                propsData: {
                    ...defaultProps(),
                    range: true
                }
            })
            wrapper.setData({
                selectedBeginDate,
                hoveredEndDate: undefined
            })
            expect(wrapper.vm.hoveredDateRange).toEqual([
                selectedBeginDate
            ])
        })

        it('should mange date range update as expected', () => {
            let begin = newDate(2020, 3, 10)
            let end = newDate(2020, 3, 15)
            const wrapper = shallowMount(BDatepickerTable, {
                propsData: {
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
            expect(wrapper.emitted()['input'][0]).toContainEqual([begin, end])

            end = begin
            begin = newDate(2020, 3, 5)
            wrapper.vm.selectedEndDate = undefined
            wrapper.vm.updateSelectedDate(begin)
            expect(wrapper.vm.selectedEndDate).toBe(end)
            expect(wrapper.vm.selectedBeginDate).toBe(begin)

            wrapper.vm.updateSelectedDate(begin)
            expect(wrapper.vm.selectedEndDate).toBe(undefined)
            expect(wrapper.vm.selectedBeginDate).toBe(begin)
        })
    })
})
