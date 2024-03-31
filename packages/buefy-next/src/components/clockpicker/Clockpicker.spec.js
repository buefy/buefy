import { shallowMount } from '@vue/test-utils'
import BClockpicker from '@components/clockpicker/Clockpicker'

let wrapper

describe('BClockpicker', () => {
    beforeEach(() => {
        wrapper = shallowMount(BClockpicker, {
            props: {
                locale: 'en-US'
            },
            global: {
                stubs: {
                    'b-dropdown': false
                }
            }
        })
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BClockpicker')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('displays hours accordingly', async () => {
        expect(wrapper.vm.hoursDisplay).toBe('--')

        await wrapper.setProps({ hourFormat: '24' })
        await wrapper.setData({ hoursSelected: 5 })
        expect(wrapper.vm.hoursDisplay).toBe('05')
        await wrapper.setData({ hoursSelected: 10 })
        expect(wrapper.vm.hoursDisplay).toBe('10')
        await wrapper.setData({ hoursSelected: 15 })
        expect(wrapper.vm.hoursDisplay).toBe('15')

        await wrapper.setProps({ hourFormat: '12' })
        await wrapper.setData({
            meridienSelected: wrapper.vm.AM,
            hoursSelected: 5
        })
        expect(wrapper.vm.hoursDisplay).toBe(5)
        await wrapper.setData({ hoursSelected: 10 })
        expect(wrapper.vm.hoursDisplay).toBe(10)
        await wrapper.setData({
            meridienSelected: wrapper.vm.PM,
            hoursSelected: 12
        })
        expect(wrapper.vm.hoursDisplay).toBe(12)
        await wrapper.setData({ hoursSelected: 15 })
        expect(wrapper.vm.hoursDisplay).toBe(3)
    })

    it('displays minutes accordingly', async () => {
        expect(wrapper.vm.minutesDisplay).toBe('--')

        await wrapper.setData({ minutesSelected: 5 })
        expect(wrapper.vm.minutesDisplay).toBe('05')

        await wrapper.setData({ minutesSelected: 10 })
        expect(wrapper.vm.minutesDisplay).toBe('10')
    })

    it('return if face is disabled accordingly', async () => {
        await wrapper.setData({ isSelectingHour: true })
        expect(wrapper.vm.faceDisabledValues).toBe(wrapper.vm.isHourDisabled)

        await wrapper.setData({ isSelectingHour: false })
        expect(wrapper.vm.faceDisabledValues).toBe(wrapper.vm.isMinuteDisabled)
    })

    it('react accordingly when a value is selected', async () => {
        const value = 5

        await wrapper.setData({ isSelectingHour: true })
        wrapper.vm.onHoursChange = jest.fn()
        wrapper.vm.onClockInput(value)
        expect(wrapper.vm.hoursSelected).toBe(value)
        expect(wrapper.vm.onHoursChange).toHaveBeenCalledWith(value)

        await wrapper.setData({ isSelectingHour: false })
        wrapper.vm.onMinutesChange = jest.fn()
        wrapper.vm.onClockInput(value)
        expect(wrapper.vm.minutesSelected).toBe(value)
        expect(wrapper.vm.onMinutesChange).toHaveBeenCalledWith(value)
    })

    it('react accordingly when changing clock', async () => {
        await wrapper.setData({ isSelectingHour: false })
        wrapper.vm.onClockChange()
        await wrapper.setData({ isSelectingHour: true })
        wrapper.vm.onClockChange()
        expect(wrapper.vm.isSelectingHour).toBeFalsy()
    })
    it('react accordingly when changing meridien', async () => {
        wrapper.vm.onMeridienChange = jest.fn()
        await wrapper.setData({ meridienSelected: wrapper.vm.PM })
        wrapper.vm.onMeridienClick(wrapper.vm.PM)
        wrapper.vm.onMeridienClick(wrapper.vm.AM)
        expect(wrapper.vm.meridienSelected).toBe(wrapper.vm.AM)
        expect(wrapper.vm.onMeridienChange).toHaveBeenCalledWith(wrapper.vm.AM)
    })

    describe('with fallthrough behavior', () => {
        const attrs = {
            class: 'fallthrough-class',
            style: 'font-size: 2rem;',
            id: 'fallthrough-id'
        }

        it('should bind class, style, and id to the root div if compatFallthrough is true (default)', async () => {
            const wrapper = shallowMount(BClockpicker, {
                attrs,
                global: {
                    stubs: {
                        'b-dropdown': false
                    }
                }
            })

            const root = wrapper.find('div.b-clockpicker')
            expect(root.classes(attrs.class)).toBe(true)
            expect(root.attributes('style')).toBe(attrs.style)
            expect(root.attributes('id')).toBe(attrs.id)

            const input = wrapper.findComponent({ ref: 'input' })
            expect(input.classes(attrs.class)).toBe(false)
            expect(input.attributes('style')).toBeUndefined()
            expect(input.attributes('id')).toBeUndefined()
        })

        it('should bind class, style, and id to the underlying input if compatFallthrough is false', async () => {
            const wrapper = shallowMount(BClockpicker, {
                attrs,
                props: {
                    compatFallthrough: false
                },
                global: {
                    stubs: {
                        'b-dropdown': false
                    }
                }
            })

            const root = wrapper.find('div.b-clockpicker')
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
