import { shallowMount } from '@vue/test-utils'
import BDatepickerTableRow from '@components/datepicker/DatepickerTableRow'

const propsData = {
    week: [
        new Date('Sun Dec 31 2017 00:00:00 GMT-0200 (-02)'),
        new Date('Mon Jan 01 2018 00:00:00 GMT-0200 (-02)'),
        new Date('Tue Jan 02 2018 00:00:00 GMT-0200 (-02)'),
        new Date('Wed Jan 03 2018 00:00:00 GMT-0200 (-02)'),
        new Date('Thu Jan 04 2018 00:00:00 GMT-0200 (-02)'),
        new Date('Fri Jan 05 2018 00:00:00 GMT-0200 (-02)'),
        new Date('Sat Jan 06 2018 00:00:00 GMT-0200 (-02)')
    ],
    month: 12,
    dateCreator: function () {
        return new Date()
    }
}

describe('BDatepickerTableRow', () => {
    it('is called', () => {
        const wrapper = shallowMount(BDatepickerTableRow, { propsData })
        expect(wrapper.name()).toBe('BDatepickerTableRow')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    describe('classObject', function () {
        it('should have is-selected class for all range of dates selected', function () {
            const wrapper = shallowMount(BDatepickerTableRow, {
                propsData: {
                    ...propsData,
                    selectedDate: [propsData.week[1], propsData.week[5]]
                }
            })
            expect(wrapper.findAll('.is-selected').length).toBe(5)
        })

        it('should have is-first-selected class for the first date selected within the range', function () {
            const wrapper = shallowMount(BDatepickerTableRow, {
                propsData: {
                    ...propsData,
                    selectedDate: [propsData.week[1], propsData.week[5]]
                }
            })
            const {wrappers: [firstSelectedCell]} = wrapper.findAll('.is-selected')
            expect(firstSelectedCell.classes()).toContain('is-first-selected')
        })

        it('should have is-within-selected class for the dates selected within the range', function () {
            const wrapper = shallowMount(BDatepickerTableRow, {
                propsData: {
                    ...propsData,
                    selectedDate: [propsData.week[1], propsData.week[5]]
                }
            })
            const withinSelectedRangeCells = wrapper.findAll('.is-selected.is-within-selected')
            expect(withinSelectedRangeCells.length).toBe(3)
        })

        it('should have is-last-selected class for the last date selected within the range', function () {
            const wrapper = shallowMount(BDatepickerTableRow, {
                propsData: {
                    ...propsData,
                    selectedDate: [propsData.week[1], propsData.week[5]]
                }
            })
            // wrappers should return 5 elements. Destructure to get the last one
            const {wrappers: [, , , , lastSelectedCell]} = wrapper.findAll('.is-selected')
            expect(lastSelectedCell.classes()).toContain('is-last-selected')
        })

        it('should has is-selected class for all range of dates selected', function () {
            const wrapper = shallowMount(BDatepickerTableRow, {
                propsData: {
                    ...propsData,
                    selectedDate: [propsData.week[1], propsData.week[5]]
                }
            })
            expect(wrapper.findAll('.is-selected').length).toBe(5)
        })

        it('should have is-within-hovered-range class for all range of dates hovered', function () {
            const wrapper = shallowMount(BDatepickerTableRow, {
                propsData: {
                    ...propsData,
                    selectedDate: [propsData.week[1], propsData.week[5]]
                }
            })
            expect(wrapper.findAll('.is-selected').length).toBe(5)
        })

        it('should have is-first-hovered class for the first date hovered within the range', function () {
            const wrapper = shallowMount(BDatepickerTableRow, {
                propsData: {
                    ...propsData,
                    hoveredDateRange: [propsData.week[1], propsData.week[2]]
                }
            })
            const {wrappers: [firstHoveredCell]} = wrapper.findAll('.is-within-hovered-range')
            expect(firstHoveredCell.classes()).toContain('is-first-hovered')
        })

        it('should have is-within-hovered class for the dates hovered within the range', function () {
            const wrapper = shallowMount(BDatepickerTableRow, {
                propsData: {
                    ...propsData,
                    hoveredDateRange: [propsData.week[1], propsData.week[5]]
                }
            })
            const withinHoveredRangeCells = wrapper.findAll('.is-within-hovered-range.is-within-hovered')
            expect(withinHoveredRangeCells.length).toBe(3)
        })

        it('should have is-last-hovered class for the last date hovered within the range', function () {
            const wrapper = shallowMount(BDatepickerTableRow, {
                propsData: {
                    ...propsData,
                    hoveredDateRange: [propsData.week[1], propsData.week[5]]
                }
            })
            // wrappers should return 5 elements. Destructure to get the last one
            const {wrappers: [, , , , lastHoveredCell]} = wrapper.findAll('.is-within-hovered-range')
            expect(lastHoveredCell.classes()).toContain('is-last-hovered')
        })

        it('should has is-within-hovered-range class for all range of dates hovered', function () {
            const wrapper = shallowMount(BDatepickerTableRow, {
                propsData: {
                    ...propsData,
                    hoveredDateRange: [propsData.week[1], propsData.week[5]]
                }
            })
            expect(wrapper.findAll('.is-within-hovered-range').length).toBe(5)
        })
    })
})
