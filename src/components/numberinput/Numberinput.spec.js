import { shallowMount, mount } from '@vue/test-utils'
import BNumberinput from '@components/numberinput/Numberinput'

let wrapper

describe('BNumberinput', () => {
    describe('Rendered', () => {
        beforeEach(() => {
            wrapper = mount(BNumberinput)
        })

        it('is called', () => {
            expect(wrapper.name()).toBe('BNumberinput')
            expect(wrapper.isVueInstance()).toBeTruthy()
        })

        it('renders by default', () => {
            expect(wrapper.contains('input')).toBeTruthy()
            expect(wrapper.contains('button')).toBeTruthy()
            expect(wrapper.classes()).toContain('is-grouped')
        })

        it('set controls position', () => {
            wrapper.setProps({
                controlsPosition: 'compact'
            })

            expect(wrapper.contains('input')).toBeTruthy()
            expect(wrapper.contains('button')).toBeTruthy()
            expect(wrapper.classes()).toContain('has-addons')
        })
    })

    describe('Rendered (shallow)', () => {
        beforeEach(() => {
            wrapper = shallowMount(BNumberinput)
        })

        it('manage prop types (number / string)', () => {
            const min = 5
            const max = 15
            const step = 5
            const stepDec = 1.5

            wrapper.setProps({ min })
            expect(wrapper.vm.minNumber).toBe(min)
            wrapper.setProps({ min: `${min}` })
            expect(wrapper.vm.minNumber).toBe(min)

            wrapper.setProps({ max })
            expect(wrapper.vm.maxNumber).toBe(max)
            wrapper.setProps({ max: `${max}` })
            expect(wrapper.vm.maxNumber).toBe(max)

            wrapper.vm.newStep = step
            expect(wrapper.vm.stepNumber).toBe(step)
            wrapper.vm.newStep = `${step}`
            expect(wrapper.vm.stepNumber).toBe(step)

            wrapper.vm.newStep = step
            expect(wrapper.vm.stepDecimals).toBe(0)
            wrapper.vm.newStep = stepDec
            expect(wrapper.vm.stepDecimals).toBe(1)
        })

        it('manage prop value', () => {
            const value = 5

            wrapper.setProps({ value })
            expect(wrapper.vm.newValue).toBe(value)
        })

        it('allows a placeholder', () => {
            const placeholder = 90
            const value = 10

            wrapper.setProps({ placeholder })
            expect(wrapper.vm.placeholder).toBe(placeholder)

            // Only user input should set value, i.e. placeholder shouldn't set value
            wrapper.setProps({ value })
            expect(wrapper.vm.newValue).toBe(value)
        })

        it('expects placeholder to not override v-model value', () => {
            const placeholder = 90
            const value = 10
            const newValue = 20

            wrapper.setProps({ placeholder, value })
            expect(wrapper.vm.placeholder).toBe(placeholder)
            wrapper.setProps({ value: newValue })

            // Only user input should set value, i.e. placeholder shouldn't set value
            expect(wrapper.vm.newValue).toBe(newValue)
        })

        it('allows a string placeholder value', () => {
            const placeholder = '90'
            const newValue = 20

            wrapper.setProps({ placeholder })
            expect(wrapper.vm.placeholder).toBe(placeholder)
            wrapper.setProps({ value: newValue })
            expect(wrapper.vm.value).toBe(20)
            expect(wrapper.vm.computedValue).toBe(20)
            wrapper.vm.increment()
            expect(wrapper.vm.computedValue).toBe(21)
        })

        it('can increment / decrement', () => {
            const min = 5
            const max = 6
            wrapper.vm.computedValue = max

            wrapper.setProps({ min })
            wrapper.vm.decrement()
            expect(wrapper.vm.computedValue).toBe(min)
            wrapper.vm.decrement()
            expect(wrapper.vm.computedValue).toBe(min)

            wrapper.setProps({ max })
            wrapper.vm.increment()
            expect(wrapper.vm.computedValue).toBe(max)
            wrapper.vm.increment()
            expect(wrapper.vm.computedValue).toBe(max)
        })

        it('can increment / decrement with a step', () => {
            const start = 5
            const step = 3.5
            const min = -5
            wrapper.vm.computedValue = start
            wrapper.setProps({ step, min })
            wrapper.vm.decrement()
            expect(wrapper.vm.computedValue).toBe(start - step)
            wrapper.vm.decrement()
            expect(wrapper.vm.computedValue).toBe(start - (step * 2))
        })

        it('manages empty value', () => {
            wrapper.vm.computedValue = ''
            expect(wrapper.vm.computedValue).toBeNull()

            const min = 5
            wrapper.setProps({ min })
            wrapper.vm.computedValue = ''
            expect(wrapper.vm.computedValue).toBe(min)
        })
    })
})
