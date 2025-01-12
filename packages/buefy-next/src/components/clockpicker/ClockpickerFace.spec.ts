import { beforeEach, describe, expect, it, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import BClockpickerFace from '@components/clockpicker/ClockpickerFace.vue'

let wrapper: VueWrapper<InstanceType<typeof BClockpickerFace>>
const indicatorSize = 40
const paddingInner = 5
const pickerSize = 500

describe('BClockpickerFace', () => {
    beforeEach(() => {
        wrapper = shallowMount(BClockpickerFace, {
            props: {
                pickerSize,
                min: 0,
                max: 23
            }
        })
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BClockpickerFace')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('returns countPerRing correctly', async () => {
        const count = wrapper.vm.max! - wrapper.vm.min! + 1
        expect(wrapper.vm.countPerRing).toEqual(count)

        await wrapper.setProps({ double: true })
        expect(wrapper.vm.countPerRing).toEqual(count / 2)
    })

    it('returns radius correctly', () => {
        expect(wrapper.vm.radius).toEqual(pickerSize / 2)
    })

    it('returns outerRadius correctly', () => {
        expect(wrapper.vm.outerRadius).toEqual((pickerSize / 2) -
            paddingInner -
            indicatorSize / 2)
    })

    it('returns innerRadius correctly', () => {
        expect(wrapper.vm.innerRadius).toEqual(Math.max(wrapper.vm.outerRadius * 0.6,
            wrapper.vm.outerRadius - paddingInner - indicatorSize))
    })

    it('returns degrees correctly', () => {
        expect(wrapper.vm.degrees).toEqual(wrapper.vm.degreesPerUnit * Math.PI / 180)
    })

    it('set inputValue when value changed', async () => {
        await wrapper.setData({ inputValue: 2 })
        await wrapper.setProps({ value: 2 })
        expect(wrapper.vm.inputValue).toEqual(2)

        await wrapper.setProps({ value: 3 })
        expect(wrapper.vm.inputValue).toEqual(3)
    })

    it('calls disabledValues function when isDisabled is called', async () => {
        await wrapper.setProps({ disabledValues: vi.fn() })
        wrapper.vm.isDisabled(2)
        expect(wrapper.vm.disabledValues).toHaveBeenCalled()
    })

    it('manage onMouseDown', () => {
        const e = {
            preventDefault: vi.fn()
        }
        wrapper.vm.onDragMove = vi.fn()
        wrapper.vm.onMouseDown(e as unknown as MouseEvent)
        expect(e.preventDefault).toHaveBeenCalled()
        expect(wrapper.vm.isDragging).toBeTruthy()
        expect(wrapper.vm.onDragMove).toHaveBeenCalled()
    })

    it('manage onMouseUp', () => {
        wrapper.vm.onMouseUp()
        expect(wrapper.vm.isDragging).toBeFalsy()
    })

    it('manage onDragMove', async () => {
        const e = {
            preventDefault: vi.fn()
        }
        await wrapper.setData({ isDragging: true })
        wrapper.vm.update = vi.fn()
        wrapper.vm.onDragMove(e as unknown as MouseEvent)
        expect(e.preventDefault).toHaveBeenCalled()
        expect(wrapper.vm.update).toHaveBeenCalled()
    })
})
