import { shallowMount, mount } from '@vue/test-utils'
import BNumberinput from '@components/numberinput/Numberinput'

let wrapper

const wait = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
}

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

        it('default value is 0', () => {
            const input = wrapper.find('input')
            expect(input.element.value).toBe('0')
        })

        it('increments/decrements on long pressing exponentially', async () => {
            wrapper.setProps({exponential: true, value: 1, step: 1})

            wrapper.find('.control.plus button').trigger('mousedown')

            await wait(1500)

            wrapper.find('.control.plus').trigger('mouseup')
            await wrapper.vm.$nextTick()

            expect(wrapper.vm.computedValue).toBeGreaterThan(90)
            expect(wrapper.vm.computedValue).toBeLessThan(150)

            wrapper.setProps({exponential: 3, value: 0, step: 1})

            wrapper.find('.control.plus button').trigger('mousedown')

            await wait(1000)

            wrapper.find('.control.plus').trigger('mouseup')

            expect(wrapper.vm.computedValue).toBeGreaterThan(200)
            expect(wrapper.vm.computedValue).toBeLessThan(600)
        })

        it('increments/decrements on long pressing', async () => {
            jest.useFakeTimers()

            let val = 0

            // Increment
            wrapper.find('.control.plus button').trigger('mousedown')
            val++

            // await wait(2000)
            jest.runOnlyPendingTimers()
            jest.runOnlyPendingTimers()
            jest.runOnlyPendingTimers()
            val += 3

            wrapper.find('.control.plus').trigger('mouseup')
            expect(wrapper.vm.computedValue).toBe(val)

            // Decrement
            wrapper.find('.control.minus button').trigger('mousedown')
            val--

            jest.runOnlyPendingTimers()
            jest.runOnlyPendingTimers()
            val -= 2

            wrapper.find('.control.minus button').trigger('mouseup')
            // Trigger it another time to check for unexpected browser behavior
            wrapper.find('.control.minus button').trigger('mouseup')

            expect(wrapper.vm.computedValue).toBe(val)
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

        it('manages empty value', () => {
            wrapper.vm.computedValue = ''
            expect(wrapper.vm.computedValue).toBeNull()

            const min = 5
            wrapper.setProps({ min })
            wrapper.vm.computedValue = ''
            expect(wrapper.vm.computedValue).toBe(min)
        })

        it('increments/decrements on click', async () => {
            wrapper.setProps({value: 5, step: 1})

            wrapper.find('.control.plus button').trigger('click')

            await wrapper.vm.$nextTick()

            expect(wrapper.vm.computedValue).toBe(6)

            wrapper.find('.control.minus button').trigger('click')

            await wrapper.vm.$nextTick()

            expect(wrapper.vm.computedValue).toBe(5)
        })
    })
})
