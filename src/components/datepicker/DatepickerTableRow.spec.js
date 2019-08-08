import { shallowMount } from '@vue/test-utils'
import BDatepickerTableRow from '@components/datepicker/DatepickerTableRow'

const newDate = (y, m, d) => {
    const date = new Date(Date.UTC(y, m, d))
    date.getDate = jest.fn(() => date.getUTCDate())
    return date
}
const propsData = {
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

    it('render correctly', () => {
        const wrapper = shallowMount(BDatepickerTableRow, { propsData })
        expect(wrapper.html()).toMatchSnapshot()
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
