import { shallowMount } from '@vue/test-utils'
import BDatepickerTable from '@components/datepicker/DatepickerTable'
import config, {setOptions} from '@utils/config'

let defaultProps

const newDate = (y, m, d) => {
    const date = new Date(Date.UTC(y, m, d))
    date.getDate = jest.fn(() => date.getUTCDate())
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
            focusedDate: newDate(2018, 7, 1),
            defaultUnselectableDaysOfWeek: []
        }))

        defaultProps = () => ({
            value: new Date('July 21, 2018 09:10:11'),
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
                weeksInThisMonth: jest.fn(() => {
                    const weeksInThisMonth = []
                    let day = 1
                    let month = 'July'
                    while (weeksInThisMonth.length < 6) {
                        const dates = []
                        while (dates.length < 7) {
                            dates.push(new Date(`${month} ${day++}, 2018 00:00:00`))
                        }
                        if (weeksInThisMonth.length === 4) {
                            month = 'August'
                            day = 5
                        }
                        weeksInThisMonth.push(dates)
                    }
                    return weeksInThisMonth
                }) // mocked for Circle CI Snapshots date management
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
                }
            }
        })
        expect(wrapper.vm.eventsInThisWeek(wrapper.vm.weeksInThisMonth[3]).length).toEqual(2)
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
    })
})
