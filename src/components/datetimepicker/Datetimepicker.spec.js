import { shallowMount, mount } from '@vue/test-utils'
import Datetimepicker from '@components/datetimepicker/Datetimepicker'

let wrapper

describe('Datetimepicker', () => {
    beforeEach(() => {
        wrapper = shallowMount(Datetimepicker, {
            propsData: {
                locale: 'en-US'
            }
        })
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BDatetimepicker')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('react accordingly when setting a new value', async () => {
        const date = new Date()
        wrapper.setProps({ value: date })
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.newValue).toEqual(date)
    })

    it('react accordingly when setting computedValue', async () => {
        const date = new Date()
        wrapper.vm.computedValue = date
        const valueEmitted = wrapper.emitted()['input'][0]
        expect(valueEmitted).toContainEqual(date)
    })

    it('react accordingly when handling native picker', () => {
        const date = new Date(2020, 0, 1, 12, 30, 0)
        wrapper.vm.onChangeNativePicker({ target: { value: '2020-01-01T12:30' } })
        expect(wrapper.emitted()['input']).toEqual([[date]])
    })

    it('react accordingly when handling native picker clear', () => {
        wrapper.vm.onChangeNativePicker({ target: { value: '' } })
        expect(wrapper.emitted()['input']).toEqual([[null]])
    })

    it('react accordingly when setting minDateTime prop and computedValue', () => {
        const min = new Date(2019, 9, 20, 8, 0, 0, 0)
        const date = new Date(2019, 9, 18, 0, 0, 0, 0)
        wrapper.setProps({
            minDatetime: min
        })
        wrapper.vm.computedValue = date
        const valueEmitted = wrapper.emitted()['input'][0]
        expect(valueEmitted).toContainEqual(min)
    })

    it('react accordingly when setting maxDateTime prop and computedValue', () => {
        const max = new Date(2019, 9, 18, 0, 0, 0, 0)
        const date = new Date(2019, 9, 20, 8, 0, 0, 0)
        wrapper.setProps({
            maxDatetime: max
        })
        wrapper.vm.computedValue = date
        const valueEmitted = wrapper.emitted()['input'][0]
        expect(valueEmitted).toContainEqual(max)
    })

    it('should format date time', () => {
        const datetimeToFormat = new Date(2019, 9, 1, 8, 30, 0, 0)
        wrapper = mount(Datetimepicker, {
            propsData: {
                value: datetimeToFormat
            },
            stubs: {
                transition: false
            }
        })
        const datepicker = wrapper.find({ ref: 'datepicker' })

        expect(datepicker.vm.formattedValue).toEqual('2019-10-1 08:30')

        wrapper.setProps({
            datetimeFormatter: (date) => `${date.getFullYear()}`
        })
        expect(datepicker.vm.formattedValue).toEqual('2019')
    })

    it('should format date time with seconds', () => {
        wrapper = mount(Datetimepicker, {
            propsData: {
                timepicker: {
                    enableSeconds: true
                }
            },
            stubs: {
                transition: false
            }
        })
        const datetimeToFormat = new Date(2019, 9, 1, 8, 30, 0, 0)
        const formattedDatetime = wrapper.vm.defaultDatetimeFormatter(datetimeToFormat)
        expect(formattedDatetime).toEqual('2019-10-1 08:30:00')
    })

    it('should format date time according init value', async () => {
        const date = new Date(2019, 9, 1, 8, 30, 0, 0)
        wrapper = mount(Datetimepicker, {
            propsData: {
                value: date
            },
            stubs: {
                transition: false
            },
            sync: false
        })
        await wrapper.vm.$nextTick()
        expect(wrapper.find('input').element.value).toEqual('2019-10-1 08:30')
    })

    it('should parse date time', async () => {
        wrapper = mount(Datetimepicker, {
            stubs: {
                transition: false
            }
        })
        const datepicker = wrapper.find({ ref: 'datepicker' })

        let expectedDatetime = new Date(2019, 9, 1, 9, 30, 0, 0)
        datepicker.vm.onChange('2019-10-1 09:30')
        expect(wrapper.vm.computedValue).toEqual(expectedDatetime)

        expectedDatetime = new Date(2019, 9, 1, 9, 30, 0, 0)
        wrapper.setProps({
            datetimeParser: () => expectedDatetime
        })
        datepicker.vm.onChange('Whatever!')
        expect(datepicker.vm.computedValue).toEqual(expectedDatetime)
    })
})
