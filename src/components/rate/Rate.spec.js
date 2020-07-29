import { shallowMount } from '@vue/test-utils'
import BRate from '@components/rate/Rate'

let wrapper

describe('BRate', () => {
    beforeEach(() => {
        wrapper = shallowMount(BRate)
    })

    it('is vue instance', () => {
        expect(wrapper.name()).toBe('BRate')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('renders props.customText', () => {
        wrapper.setProps({ customText: 'Points' })
        expect(wrapper.text()).toMatch('Points')
    })

    it('reacts when value changes', () => {
        const value = 5.5
        const percent = 50
        wrapper.setProps({ value })
        expect(wrapper.vm.newValue).toBe(value)
        expect(wrapper.vm.valueDecimal).toBe(percent)
        expect(wrapper.vm.halfStyle).toBe(`width:${percent}%`)

        wrapper.setProps({ disabled: true })
        expect(wrapper.vm.checkHalf(value + 0.5)).toBeTruthy()
        expect(wrapper.vm.rateClass(value + 0.5)).toBe('set-half')
    })

    it('is displaying correctly', () => {
        const texts = ['foo', 'bar']
        let value = 1

        wrapper.setProps({ value, texts, showText: true })
        expect(wrapper.vm.showMe).toBe(texts[value - 1])

        wrapper.setProps({ showScore: true })
        expect(wrapper.vm.showMe).toBe(`${value}`)

        wrapper.setProps({ disabled: true })
        expect(wrapper.vm.showMe).toBe(`${value}`)

        value = 0
        wrapper.setProps({ value, showScore: true })
        expect(wrapper.vm.showMe).toBe('')
    })

    it('manage methods correctly', () => {
        const event = {
            stopPropagation: jest.fn()
        }
        let value = 0

        wrapper.setProps({ value, disabled: true })
        wrapper.vm.previewRate(value + 1, event)
        expect(wrapper.vm.hoverValue).toBe(value)

        value = 1
        wrapper.setProps({ disabled: false })
        wrapper.vm.previewRate(value, event)
        expect(wrapper.vm.hoverValue).toBe(value)

        expect(event.stopPropagation).toHaveBeenCalledTimes(1)

        wrapper.setProps({ disabled: true })
        wrapper.vm.resetNewValue()
        expect(wrapper.vm.hoverValue).toBe(value)

        value = 0
        wrapper.setProps({ disabled: false })
        wrapper.vm.resetNewValue()
        expect(wrapper.vm.hoverValue).toBe(value)

        value = 0
        wrapper.setProps({ disabled: true })
        wrapper.vm.confirmValue(value + 1)
        expect(wrapper.vm.newValue).toBe(value)

        value = 1
        wrapper.setProps({ disabled: false })
        wrapper.vm.confirmValue(value)
        expect(wrapper.vm.newValue).toBe(value)
    })
})
