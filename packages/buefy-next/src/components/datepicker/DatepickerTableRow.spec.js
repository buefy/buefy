import { shallowMount } from '@vue/test-utils'
import BDatepickerTableRow from '@components/datepicker/DatepickerTableRow'

const newDate = (y, m, d) => {
    // it used to create a date in UTC. but it is unnecessary,
    // because DatepickerTableRow entirely works in the local time zone
    return new Date(y, m, d)
}
const props = {
    firstDayOfWeek: 0,
    week: [
        newDate(2017, 12, 31),
        newDate(2018, 1, 1),
        newDate(2018, 1, 2),
        newDate(2018, 1, 3),
        newDate(2018, 1, 4),
        newDate(2018, 1, 5),
        newDate(2018, 1, 6)
    ],
    month: 12,
    dateCreator: () => newDate()
}

let wrapper

describe('BDatepickerTableRow', () => {
    beforeEach(() => {
        wrapper = shallowMount(BDatepickerTableRow, { props })
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BDatepickerTableRow')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    describe('classObject', function () {
        beforeEach(() => {
            wrapper.setProps({
                selectedDate: [props.week[1], props.week[5]],
                nearbySelectableMonthDays: true
            })
        })

        it('should have is-selected class for all range of dates selected', function () {
            expect(wrapper.findAll('.is-selected').length).toBe(5)
        })

        it('should have is-first-selected class for the first date selected within the range', function () {
            const [firstSelectedCell] = wrapper.findAll('.is-selected')
            expect(firstSelectedCell.classes()).toContain('is-first-selected')
        })

        it('should have is-within-selected class for the dates selected within the range', function () {
            const withinSelectedRangeCells = wrapper.findAll('.is-selected.is-within-selected')
            expect(withinSelectedRangeCells.length).toBe(3)
        })

        it('should have is-last-selected class for the last date selected within the range', function () {
            // wrappers should return 5 elements. Destructure to get the last one
            const [, , , , lastSelectedCell] = wrapper.findAll('.is-selected')
            expect(lastSelectedCell.classes()).toContain('is-last-selected')
        })

        it('should has is-selected class for all range of dates selected', function () {
            expect(wrapper.findAll('.is-selected').length).toBe(5)
        })

        describe('hovered', function () {
            beforeEach(() => {
                wrapper.setProps({
                    hoveredDateRange: [props.week[1], props.week[5]]
                })
            })

            it('should have is-within-hovered-range class for all range of dates hovered', function () {
                expect(wrapper.findAll('.is-selected').length).toBe(5)
            })

            it('should have is-first-hovered class for the first date hovered within the range', function () {
                const [firstHoveredCell] = wrapper.findAll('.is-within-hovered-range')
                expect(firstHoveredCell.classes()).toContain('is-first-hovered')
            })

            it('should have is-within-hovered class for the dates hovered within the range', function () {
                const withinHoveredRangeCells = wrapper.findAll('.is-within-hovered-range.is-within-hovered')
                expect(withinHoveredRangeCells.length).toBe(3)
            })

            it('should have is-last-hovered class for the last date hovered within the range', function () {
                // wrappers should return 5 elements. Destructure to get the last one
                const [, , , , lastHoveredCell] = wrapper.findAll('.is-within-hovered-range')
                expect(lastHoveredCell.classes()).toContain('is-last-hovered')
            })

            it('should has is-within-hovered-range class for all range of dates hovered', function () {
                expect(wrapper.findAll('.is-within-hovered-range').length).toBe(5)
            })
        })
    })

    describe('classObject with multiple dates', function () {
        beforeEach(() => {
            wrapper.setProps({
                selectedDate: [props.week[1], props.week[5], props.week[3]],
                multiple: true
            })
        })

        it('should have is-selected class for all dates selected', function () {
            expect(wrapper.findAll('.is-selected').length).toBe(3)
        })

        it('should not have is-first-selected class for the first date selected within the range', function () {
            const [firstSelectedCell] = wrapper.findAll('.is-selected')
            expect(firstSelectedCell.classes()).not.toContain('is-first-selected')
        })

        it('should not have is-within-selected class for the dates selected within the range', function () {
            const withinSelectedRangeCells = wrapper.findAll('.is-selected.is-within-selected')
            expect(withinSelectedRangeCells.length).toBe(0)
        })

        it('should not have is-last-selected class for the last date selected within the range', function () {
            // wrappers should return 3 elements. Destructure to get the last one
            const [, , lastSelectedCell] = wrapper.findAll('.is-selected')
            expect(lastSelectedCell.classes()).not.toContain('is-last-selected')
        })
    })

    it('manage accordingly leap years', () => {
        expect(wrapper.vm.isLeapYear(2020)).toBeTruthy()
        expect(wrapper.vm.daysInYear(2020)).toBe(366)
        expect(wrapper.vm.isLeapYear(2021)).toBeFalsy()
        expect(wrapper.vm.daysInYear(2021)).toBe(365)
    })

    it('emit chosen date', () => {
        wrapper.vm.selectableDate = jest.fn(() => false)
        wrapper.vm.emitChosenDate(5)
        expect(wrapper.vm.selectableDate).toHaveBeenCalled()
        expect(wrapper.emitted().select).toBeFalsy()

        wrapper.vm.selectableDate = jest.fn(() => true)
        wrapper.vm.emitChosenDate(5)
        expect(wrapper.vm.selectableDate).toHaveBeenCalled()
        expect(wrapper.emitted().select).toBeTruthy()
    })

    it('emit clicked week and year', async () => {
        const wrapper = shallowMount(BDatepickerTableRow, {
            props: {
                ...Object.assign(props, {
                    showWeekNumber: true,
                    rulesForFirstWeek: 1,
                    weekNumberClickable: true
                })
            },
            global: {
                provide: {
                    $datepicker: {
                        $emit(event) {
                            // Vue warns because BDatepickerTableRow is not
                            // supposed to emit "week-number-click"
                            wrapper.vm.$emit(event, arguments[1], arguments[2])
                        }
                    }
                }
            }
        })
        const weekDate = props.week[6]
        const $weekButton = wrapper.find('.is-week-number')
        await $weekButton.trigger('click')

        expect(wrapper.emitted()['week-number-click']).toBeTruthy()
        expect(wrapper.emitted()['week-number-click'][0].sort()).toEqual([weekDate.getDate(), weekDate.getFullYear()].sort())
    })

    it('emit focused date', async () => {
        const [y, m, d] = [2019, 4, 4]
        const day = newDate(y, m, d)

        const inc = 1
        wrapper.vm.changeFocus(day, inc)
        await wrapper.vm.$nextTick()
        const valueEmitted = wrapper.emitted()['change-focus'][0]
        expect(valueEmitted[0].getDate()).toEqual(d + inc)
    })

    it('match event days accordingly', async () => {
        const thisMonth = newDate(2019, 4, 4).getMonth()
        const day = newDate(2019, thisMonth, 6)
        const todayEvent = {
            date: day,
            type: 'is-warning'
        }
        const events = [
            {
                date: newDate(2019, thisMonth, 2),
                type: 'is-warning'
            },
            todayEvent
        ]
        await wrapper.setProps({ events })
        expect(wrapper.vm.eventsDateMatch(day)).toEqual([todayEvent])
    })

    it('emit rangeHoverEndDate', async () => {
        await wrapper.setProps({ range: true })
        const thisMonth = new Date().getMonth()
        const day = newDate(2019, thisMonth, 6)
        wrapper.vm.setRangeHoverEndDate(day)
        expect(wrapper.emitted().rangeHoverEndDate).toBeTruthy()
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

    describe('focus', () => {
        let wrapper
        let cellToFocus

        beforeEach(() => {
            wrapper = shallowMount(BDatepickerTableRow, {
                props: {
                    ...props,
                    month: 1,
                    day: 1
                }
            })
            const refName = 'day-1-2'
            if (Array.isArray(wrapper.vm.$refs[refName])) {
                cellToFocus = wrapper.vm.$refs[refName][0]
            } else {
                cellToFocus = wrapper.vm.$refs[refName]
            }
            jest.spyOn(cellToFocus, 'focus')
        })

        it('changing day should call focus on the corresponding cell', async () => {
            await wrapper.setProps({ day: 2 })
            await wrapper.vm.$nextTick()
            expect(cellToFocus.focus).toHaveBeenCalled()
        })
    })
})
