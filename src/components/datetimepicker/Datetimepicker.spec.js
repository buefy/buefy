import { shallowMount, mount } from '@vue/test-utils'
import Datetimepicker from '@components/datetimepicker/Datetimepicker'

let wrapper

describe('Datetimepicker', () => {
    beforeEach(() => {
        wrapper = shallowMount(Datetimepicker)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BDatetimepicker')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('react accordingly when setting computedValue', () => {
        const date = new Date()
        wrapper.vm.computedValue = date
        const valueEmitted = wrapper.emitted()['input'][0]
        expect(valueEmitted).toContainEqual(date)
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
        wrapper = mount(Datetimepicker, {
            stubs: {
                transition: false
            }
        })
        const datetimeToFormat = new Date(2019, 9, 1, 8, 30, 0, 0)
        const formattedDatetime = wrapper.vm.defaultDatetimeFormatter(datetimeToFormat)
        expect(formattedDatetime).toEqual('2019-10-1 08:30')
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
                value: date,
                timepicker: {
                    enableSeconds: true
                }
            },
            stubs: {
                transition: false
            },
            sync: false
        })
        await wrapper.vm.$nextTick()
        expect(wrapper.find('input').element.value).toEqual('2019-10-1 08:30:00')
    })
})
