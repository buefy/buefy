import { shallowMount } from '@vue/test-utils'
import BRate from '@components/rate/Rate'

let wrapper

describe('BRate', () => {
    beforeEach(() => {
        wrapper = shallowMount(BRate)
    })

    it('is vue instance', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BRate')
    })

    it('renders props.customText', async () => {
        await wrapper.setProps({ customText: 'Points' })
        expect(wrapper.text()).toMatch('Points')
    })

    it('reacts when value changes', async () => {
        const value = 5.5
        const percent = 50
        await wrapper.setProps({ modelValue: value })
        expect(wrapper.vm.newValue).toBe(value)
        expect(wrapper.vm.valueDecimal).toBe(percent)
        expect(wrapper.vm.halfStyle).toBe(`width:${percent}%`)

        await wrapper.setProps({ disabled: true })
        expect(wrapper.vm.checkHalf(value + 0.5)).toBeTruthy()
        expect(wrapper.vm.rateClass(value + 0.5)).toBe('set-half')
    })

    it('is displaying correctly', async () => {
        const texts = ['foo', 'bar']
        let value = 1

        await wrapper.setProps({ modelValue: value, texts, showText: true })
        expect(wrapper.vm.showMe).toBe(texts[value - 1])

        await wrapper.setProps({ showScore: true })
        expect(wrapper.vm.showMe).toBe(`${value}`)

        await wrapper.setProps({ disabled: true })
        expect(wrapper.vm.showMe).toBe(`${value}`)

        value = 0
        await wrapper.setProps({ modelValue: value, showScore: true })
        expect(wrapper.vm.showMe).toBe('')
    })

    it('manage methods correctly', async () => {
        const event = {
            stopPropagation: jest.fn()
        }
        let value = 0

        await wrapper.setProps({ modelValue: value, disabled: true })
        wrapper.vm.previewRate(value + 1, event)
        expect(wrapper.vm.hoverValue).toBe(value)

        value = 1
        await wrapper.setProps({ disabled: false })
        wrapper.vm.previewRate(value, event)
        expect(wrapper.vm.hoverValue).toBe(value)

        expect(event.stopPropagation).toHaveBeenCalledTimes(1)

        await wrapper.setProps({ disabled: true })
        wrapper.vm.resetNewValue()
        expect(wrapper.vm.hoverValue).toBe(value)

        value = 0
        await wrapper.setProps({ disabled: false })
        wrapper.vm.resetNewValue()
        expect(wrapper.vm.hoverValue).toBe(value)

        value = 0
        await wrapper.setProps({ disabled: true })
        wrapper.vm.confirmValue(value + 1)
        expect(wrapper.vm.newValue).toBe(value)

        value = 1
        await wrapper.setProps({ disabled: false })
        wrapper.vm.confirmValue(value)
        expect(wrapper.vm.newValue).toBe(value)
    })
})
