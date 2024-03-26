import { shallowMount } from '@vue/test-utils'
import BDatepicker from '@components/datepicker/Datepicker'

import config, { setOptions } from '@utils/config'

let wrapper, defaultProps

const newDate = (y, m, d) => {
    const date = new Date(Date.UTC(y, m, d))
    date.getDate = jest.fn(() => date.getUTCDate())
    date.getMonth = jest.fn(() => date.getUTCMonth())
    return date
}

const defaultMonthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
]
const defaultDayNames = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'S']
const defaultFirstDayOfWeek = 0

describe('BDatepicker', () => {
    describe('with invalid value from config config', () => {
        beforeEach(() => {
            setOptions(Object.assign(config, {
                defaultMonthNames: 'A string!',
                defaultDayNames: 'A string!',
                defaultFirstDayOfWeek: 'A string!',
                focusedDate: newDate(2018, 7, 1)
            }))

            wrapper = shallowMount(BDatepicker, {
                global: {
                    stubs: {
                        transition: true
                    }
                }
            })
        })

        it('should have valid default values', () => {
            expect(wrapper.vm.firstDayOfWeek).toBe(0)
            expect(wrapper.vm.newMonthNames.length).toBe(defaultMonthNames.length)
            expect(wrapper.vm.newDayNames.length).toBe(defaultDayNames.length)
        })

        it('manage props validator', () => {
            const type = wrapper.vm.$options.props.type

            expect(type.type).toBe(String)
            expect(type.validator && type.validator('day')).toBeFalsy()
            expect(type.validator && type.validator('month')).toBeTruthy()
        })
    })

    beforeEach(() => {
        setOptions(Object.assign(config, {
            defaultMonthNames,
            defaultDayNames,
            defaultFirstDayOfWeek,
            focusedDate: newDate(2018, 7, 15)
        }))

        defaultProps = {
            dayNames: config.defaultDayNames,
            monthNames: config.defaultMonthNames,
            focusedDate: config.focusedDate
        }

        wrapper = shallowMount(BDatepicker, {
            props: {
                ...defaultProps
            },
            global: {
                stubs: {
                    transition: true
                }
            }
        })

        wrapper.vm.updateInternalState = jest.fn(() => wrapper.vm.updateInternalState)
        wrapper.vm.togglePicker = jest.fn(() => wrapper.vm.togglePicker)
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BDatepicker')
    })

    it('render correctly', () => {
        wrapper = shallowMount(BDatepicker, {
            props: {
                ...defaultProps
            },
            global: {
                stubs: {
                    transition: true,
                    // reproduces a snapshot closer to the legacy one that
                    // depends on default slots rendered even if stubbed
                    bDropdown: false,
                    bDropdownItem: false,
                    bField: false,
                    bSelect: false
                }
            }
        })
        wrapper.setProps({ dateCreator: () => {} })
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('should have valid default values', () => {
        expect(wrapper.vm.firstDayOfWeek).toBe(0)
        expect(wrapper.vm.monthNames).toEqual(defaultMonthNames)
        expect(wrapper.vm.dayNames).toEqual(defaultDayNames)
    })

    it('react accordingly when setting computedValue', () => {
        const date = new Date()
        wrapper.vm.computedValue = date
        expect(wrapper.vm.updateInternalState).toHaveBeenCalledWith(date)
        expect(wrapper.vm.togglePicker).toHaveBeenCalled()
        expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    })

    it('react accordingly when handling native picker', () => {
        const date = new Date(2020, 0, 1)
        wrapper.vm.onChangeNativePicker({ target: { value: '2020-01-01' } })
        expect(wrapper.vm.updateInternalState).toHaveBeenCalledWith(date)
        expect(wrapper.vm.togglePicker).toHaveBeenCalled()
        expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    })

    it('react accordingly when handling native picker clear', () => {
        wrapper.vm.onChangeNativePicker({ target: { value: '' } })
        expect(wrapper.vm.updateInternalState).toHaveBeenCalledWith(null)
        expect(wrapper.vm.togglePicker).toHaveBeenCalled()
        expect(wrapper.emitted()['update:modelValue']).toEqual([[null]])
    })

    it('react accordingly when changing v-model', async () => {
        const date = new Date()
        await wrapper.setProps({
            modelValue: date
        })
        expect(wrapper.vm.updateInternalState).toHaveBeenCalledWith(date)
        expect(wrapper.vm.togglePicker).toHaveBeenCalled()
    })

    it('set focusedDateData when changing focused date', async () => {
        const date = newDate(2019, 8, 26)
        await wrapper.setProps({
            focusedDate: date
        })
        expect(wrapper.vm.focusedDateData).toEqual({
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear()
        })
    })

    it('react accordingly when calling onChange', async () => {
        const date = new Date()
        await wrapper.setProps({ dateParser: jest.fn() })
        wrapper.vm.onChange(date)
        expect(wrapper.vm.dateParser).toHaveBeenCalled()
    })

    it('react accordingly when calling prev', async () => {
        let date = newDate(2019, 8, 26)
        await wrapper.setProps({
            focusedDate: date
        })
        wrapper.vm.prev()
        expect(wrapper.vm.focusedDateData.month).toBe(7)

        date = newDate(2019, 0, 26)
        await wrapper.setProps({
            focusedDate: date
        })
        wrapper.vm.prev()
        expect(wrapper.vm.focusedDateData.year).toBe(2018)
        expect(wrapper.vm.focusedDateData.month).toBe(11)

        date = newDate(2021, 1, 1)
        await wrapper.setProps({
            focusedDate: date,
            type: 'month'
        })
        wrapper.vm.prev()
        expect(wrapper.vm.focusedDateData.year).toBe(2020)

        date = newDate(2021, 1, 1)
        await wrapper.setProps({
            focusedDate: date,
            type: 'month',
            disabled: true
        })
        wrapper.vm.prev()
        expect(wrapper.vm.focusedDateData.year).toBe(2021)
    })

    it('react accordingly when calling next', async () => {
        let date = newDate(2019, 8, 26)
        await wrapper.setProps({
            focusedDate: date
        })
        wrapper.vm.next()
        expect(wrapper.vm.focusedDateData.month).toBe(9)

        date = newDate(2019, 11, 26)
        await wrapper.setProps({
            focusedDate: date
        })
        wrapper.vm.next()
        expect(wrapper.vm.focusedDateData.year).toBe(2020)
        expect(wrapper.vm.focusedDateData.month).toBe(0)

        date = newDate(2021, 1, 1)
        await wrapper.setProps({
            focusedDate: date,
            type: 'month'
        })
        wrapper.vm.next()
        expect(wrapper.vm.focusedDateData.year).toBe(2022)

        date = newDate(2021, 1, 1)
        await wrapper.setProps({
            focusedDate: date,
            type: 'month',
            disabled: true
        })
        wrapper.vm.next()
        expect(wrapper.vm.focusedDateData.year).toBe(2021)
    })

    it('handles accordingly the list of months', async () => {
        await wrapper.setProps({
            focusedDate: newDate(2021, 10, 16),
            minDate: newDate(2021, 10, 15),
            maxDate: null
        })
        expect(wrapper.vm.listOfMonths.filter((month) => !month.disabled).map((month) => month.name)).toEqual(['November', 'December'])

        await wrapper.setProps({
            focusedDate: newDate(2021, 2, 1),
            minDate: null,
            maxDate: newDate(2021, 2, 15)
        })
        expect(wrapper.vm.listOfMonths.filter((month) => !month.disabled).map((month) => month.name)).toEqual(['January', 'February', 'March'])
    })

    it('handles accordingly the list of years', async () => {
        await wrapper.setProps({
            minDate: newDate(2017, 1, 1),
            maxDate: null
        })
        const y = [2017]
        for (let i = 1; i <= 11; i++) y.push(y[i - 1] + 1)
        expect(wrapper.vm.listOfYears).toEqual(y.reverse())

        await wrapper.setProps({
            maxDate: newDate(2020, 1, 1)
        })
        expect(wrapper.vm.listOfYears.sort()).toEqual([2020, 2019, 2018, 2017].sort())
    })

    it('handles accordingly focus', async () => {
        await wrapper.setProps({
            openOnFocus: false
        })
        wrapper.vm.onFocus = jest.fn()
        wrapper.vm.togglePicker = jest.fn()

        wrapper.vm.handleOnFocus()
        expect(wrapper.vm.onFocus).toHaveBeenCalled()
        expect(wrapper.vm.togglePicker).toHaveBeenCalledTimes(0)

        await wrapper.setProps({
            openOnFocus: true
        })
        wrapper.vm.handleOnFocus()
        expect(wrapper.vm.onFocus).toHaveBeenCalled()
        expect(wrapper.vm.togglePicker).toHaveBeenCalledTimes(1)
    })

    describe('#dateFormatter', () => {
        beforeEach(() => {
            // uses en-US locale to make outputs predictable
            wrapper.setProps({
                locale: 'en-US'
            })
        })

        it('should add one to month since month in dates starts from 0', () => {
            const dateToFormat = new Date(2019, 3, 1)
            const formattedDate = wrapper.vm.dateFormatter(dateToFormat, wrapper.vm)
            expect(formattedDate).toEqual('4/1/2019')
        })

        it('should format based on 2-digit numeric locale date with type === month', async () => {
            await wrapper.setProps({
                type: 'month'
            })
            const dateToFormat = new Date(2019, 3, 15)
            const formattedDate = wrapper.vm.dateFormatter(dateToFormat, wrapper.vm)
            expect(formattedDate).toEqual('4/2019')
        })

        it('should format a range of dates passed via array', () => {
            const dateToFormat = [
                new Date(2019, 3, 1),
                new Date(2019, 3, 3)
            ]
            const formattedDate = wrapper.vm.dateFormatter(dateToFormat, wrapper.vm)
            expect(formattedDate).toEqual('4/1/2019 - 4/3/2019')
        })

        describe('multiple', () => {
            beforeEach(() => {
                wrapper.setProps({
                    inline: true,
                    multiple: true
                })
                wrapper.vm.updateInternalState = jest.fn(() => wrapper.vm.updateInternalState)
                wrapper.vm.togglePicker = jest.fn(() => wrapper.vm.togglePicker)
            })

            it('should format multiple dates passed via array', () => {
                const dateToFormat = [
                    new Date(2019, 3, 1),
                    new Date(2019, 3, 13),
                    new Date(2019, 3, 3)
                ]
                const formattedDate = wrapper.vm.dateFormatter(dateToFormat, wrapper.vm)
                expect(formattedDate).toEqual('4/1/2019, 4/13/2019, 4/3/2019')
            })

            it('react accordingly when setting computedValue', () => {
                const date = new Date()
                wrapper.vm.computedValue = date
                expect(wrapper.vm.updateInternalState).toHaveBeenCalledWith(date)
                expect(wrapper.vm.togglePicker).toHaveBeenCalledTimes(0)
                expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
            })

            it('react accordingly when changing v-model', async () => {
                const date = new Date()
                await wrapper.setProps({
                    modelValue: date
                })
                expect(wrapper.vm.updateInternalState).toHaveBeenCalledWith(date)
                expect(wrapper.vm.togglePicker).toHaveBeenCalledTimes(0)
            })
        })
    })

    describe('#formatValue', () => {
        it('should call dateFormatter, passing the date', async () => {
            const mockDateFormatter = jest.fn()
            await wrapper.setProps({
                dateFormatter: mockDateFormatter,
                closeOnClick: false
            })
            const date = new Date()
            wrapper.vm.formatValue(date)
            expect(mockDateFormatter.mock.calls[0][0]).toEqual(date)
        })

        it('should not call dateFormatter when value is undefined or NaN', async () => {
            const mockDateFormatter = jest.fn()
            await wrapper.setProps({
                dateFormatter: mockDateFormatter
            })
            wrapper.vm.formatValue(undefined)
            expect(mockDateFormatter.mock.calls.length).toEqual(0)
            wrapper.vm.formatValue('buefy')
            expect(mockDateFormatter.mock.calls.length).toEqual(0)
        })

        it('should not call dateFormatter when value is an array with undefined or NaN elements', async () => {
            const mockDateFormatter = jest.fn()
            await wrapper.setProps({
                dateFormatter: mockDateFormatter
            })
            wrapper.vm.formatValue([new Date(), undefined])
            expect(mockDateFormatter.mock.calls.length).toEqual(0)
            wrapper.vm.formatValue([new Date(), 'buefy'])
            expect(mockDateFormatter.mock.calls.length).toEqual(0)
        })
    })

    describe('when horizontalTimePicker is true', () => {
        beforeEach(() => {
            wrapper = shallowMount(BDatepicker, {
                global: {
                    stubs: {
                        transition: true,
                        // tests depend on slots under BDropdown
                        bDropdown: false,
                        bDropdownItem: false
                    }
                },
                slots: {
                    default: ['<div>Custom footer</div>']
                },
                props: {
                    horizontalTimePicker: true
                }
            })
        })

        it('renders a component with .dropdown-horizontal-timepicker class', () => {
            const subject = wrapper.find('.dropdown-horizontal-timepicker')
            expect(subject.exists()).toBeTruthy()
        })

        it('renders a component with .content-horizontal-timepicker class', () => {
            const subject = wrapper.find('.content-horizontal-timepicker')
            expect(subject.exists()).toBeTruthy()
        })

        it('renders a component with .footer-horizontal-timepicker class', () => {
            const subject = wrapper.find('.footer-horizontal-timepicker')
            expect(subject.exists()).toBeTruthy()
        })
    })

    describe('with fallthrough attributes', () => {
        const attrs = {
            class: 'fallthrough-class',
            style: 'font-size: 2rem;',
            id: 'fallthrough-id'
        }

        it('should apply class, style, and id to the root div element, if compatFallthrough is true (default)', () => {
            const wrapper = shallowMount(BDatepicker, {
                attrs,
                global: {
                    stubs: {
                        // b-dropdown must be rendered to access ref=input
                        'b-dropdown': false
                    }
                }
            })

            const root = wrapper.find('div.datepicker')
            expect(root.classes(attrs.class)).toBe(true)
            expect(root.attributes('style')).toBe(attrs.style)
            expect(root.attributes('id')).toBe(attrs.id)

            const input = wrapper.findComponent({ ref: 'input' })
            expect(input.classes(attrs.class)).toBe(false)
            expect(input.attributes('style')).toBeUndefined()
            expect(input.attributes('id')).toBeUndefined()
        })

        it('should apply class, style, and id to the underlying input, if compatFallthrough is false', () => {
            const wrapper = shallowMount(BDatepicker, {
                attrs,
                props: {
                    compatFallthrough: false
                },
                global: {
                    stubs: {
                        // b-dropdown must be rendered to access ref=input
                        'b-dropdown': false
                    }
                }
            })

            const root = wrapper.find('div.datepicker')
            expect(root.classes(attrs.class)).toBe(false)
            expect(root.attributes('style')).toBeUndefined()
            expect(root.attributes('id')).toBeUndefined()

            const input = wrapper.findComponent({ ref: 'input' })
            expect(input.classes(attrs.class)).toBe(true)
            expect(input.attributes('style')).toBe(attrs.style)
            expect(input.attributes('id')).toBe(attrs.id)
        })
    })
})
