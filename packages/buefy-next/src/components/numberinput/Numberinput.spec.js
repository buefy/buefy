import { shallowMount, mount } from '@vue/test-utils'
import BNumberinput from '@components/numberinput/Numberinput'

let wrapper

describe('BNumberinput', () => {
    describe('Rendered', () => {
        beforeEach(() => {
            wrapper = mount(BNumberinput)
        })

        afterEach(() => {
            jest.useRealTimers()
        })

        it('is called', () => {
            expect(wrapper.vm).toBeTruthy()
            expect(wrapper.vm.$options.name).toBe('BNumberinput')
        })

        it('renders by default', () => {
            expect(wrapper.find('input').exists()).toBeTruthy()
            expect(wrapper.find('button').exists()).toBeTruthy()
            expect(wrapper.classes()).toContain('is-grouped')
        })

        it('set controls position', async () => {
            await wrapper.setProps({
                controlsPosition: 'compact'
            })

            expect(wrapper.find('input').exists()).toBeTruthy()
            expect(wrapper.find('button').exists()).toBeTruthy()
            expect(wrapper.classes()).toContain('has-addons')
        })

        it('increments/decrements on long pressing exponentially', async () => {
            // we should not depend on a real timer
            // otherwise the results will depend on the machine
            jest.useFakeTimers()

            await wrapper.setProps({ exponential: true, modelValue: 1, step: 1 })

            wrapper.find('.control.plus button').trigger('mousedown')
            expect(wrapper.vm.computedValue).toBe(2)

            for (let n = 1; n <= 10; ++n) {
                // while Jest's fake setTimeout truncates the delay to an exact
                // ms when it schedules the callback,
                // jest.advanceTimersByTime floors the value
                // and accumulates the remainder.
                // so should be floored to prevent the accumulated remainder
                // from triggering an extra callback
                jest.advanceTimersByTime(Math.floor(250 / n))
                expect(wrapper.vm.computedValue).toBe(n + 2)
            }

            wrapper.find('.control.plus').trigger('mouseup')
            jest.runAllTimers()
            await wrapper.vm.$nextTick()
            expect(wrapper.vm.computedValue).toBe(12)

            await wrapper.setProps({ exponential: 3, modelValue: 0, step: 1 })

            wrapper.find('.control.plus button').trigger('mousedown')
            expect(wrapper.vm.computedValue).toBe(1)

            for (let n = 1; n <= 20; ++n) {
                // while Jest's fake setTimeout truncates the delay to an exact
                // ms when it schedules the callback,
                // jest.advanceTimersByTime floors the value
                // and accumulates the remainder.
                // so should be floored to prevent the accumulated remainder
                // from triggering an extra callback
                jest.advanceTimersByTime(Math.floor(250 / (n * 3)))
                expect(wrapper.vm.computedValue).toBe(n + 1)
            }

            wrapper.find('.control.plus').trigger('mouseup')
            jest.runAllTimers()
            await wrapper.vm.$nextTick()
            expect(wrapper.vm.computedValue).toBe(21)
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

        it('does not increment/decrement on long pressing when feature is disabled', async () => {
            await wrapper.setProps({
                longPress: false
            })
            jest.useFakeTimers()
            wrapper.vm.computedValue = 0

            // Increment
            wrapper.find('.control.plus button').trigger('mousedown')

            // await wait(2000)
            jest.runOnlyPendingTimers()
            jest.runOnlyPendingTimers()
            jest.runOnlyPendingTimers()

            wrapper.find('.control.plus').trigger('mouseup')
            expect(wrapper.vm.computedValue).toBe(1)

            // Decrement
            wrapper.find('.control.minus button').trigger('mousedown')

            jest.runOnlyPendingTimers()
            jest.runOnlyPendingTimers()

            wrapper.find('.control.minus button').trigger('mouseup')
            // Trigger it another time to check for unexpected browser behavior
            wrapper.find('.control.minus button').trigger('mouseup')

            expect(wrapper.vm.computedValue).toBe(0)
        })

        it('increments/decrements after manually set value on input', async () => {
            await wrapper.setProps({ exponential: true, modelValue: 1, step: 1 })
            const BASE_VALUE = Math.floor(Math.random() * 10 + 1)
            wrapper.find('input').setValue(BASE_VALUE)
            wrapper.find('.control.plus button').trigger('click')
            wrapper.find('.control.minus button').trigger('click')

            expect(wrapper.vm.computedValue).toEqual(BASE_VALUE)
        })

        it('is invalid when step / minStep decimals and value decimals lengths are different', async () => {
            await wrapper.setProps({ step: 1, modelValue: 1.15 })
            expect(wrapper.find('input').element.checkValidity()).toEqual(false)
            await wrapper.setProps({ step: 1.15, modelValue: 1.154 })
            expect(wrapper.find('input').element.checkValidity()).toEqual(false)
            await wrapper.setProps({ step: 1.15, modelValue: 1.11541, minStep: 0.0001 })
            expect(wrapper.find('input').element.checkValidity()).toEqual(false)
        })

        it('is valid when step is "any"', async () => {
            await wrapper.setProps({ step: 'any', modelValue: 1.15 })
            expect(wrapper.find('input').element.checkValidity()).toEqual(true)
            await wrapper.setProps({ step: 'any', modelValue: 1.054878 })
            expect(wrapper.find('input').element.checkValidity()).toEqual(true)
            await wrapper.setProps({ step: 'any', modelValue: 1 })
            expect(wrapper.find('input').element.checkValidity()).toEqual(true)
            await wrapper.setProps({ step: 'any', modelValue: '' }) // produces a warning
            expect(wrapper.find('input').element.checkValidity()).toEqual(true)
        })
    })

    describe('Rendered (shallow)', () => {
        beforeEach(() => {
            wrapper = shallowMount(BNumberinput, {
                global: {
                    stubs: {
                        'b-input': {
                            template: '<div></div>',
                            emits: ['focus', 'blur'], // suppresses warning
                            methods: {
                                checkHtml5Validity: () => true
                            }
                        }
                    }
                }
            })
        })

        it('manage prop types (number / string)', async () => {
            const min = 5
            const max = 15
            const step = 5
            const stepDec = 1.5
            const minStep = 0.05

            await wrapper.setProps({ min })
            expect(wrapper.vm.minNumber).toBe(min)
            await wrapper.setProps({ min: `${min}` })
            expect(wrapper.vm.minNumber).toBe(min)

            await wrapper.setProps({ max })
            expect(wrapper.vm.maxNumber).toBe(max)
            await wrapper.setProps({ max: `${max}` })
            expect(wrapper.vm.maxNumber).toBe(max)

            await wrapper.setData({ newStep: step })
            expect(wrapper.vm.stepNumber).toBe(step)
            expect(wrapper.vm.minStepNumber).toBe(step)
            await wrapper.setData({ newStep: `${step}` })
            expect(wrapper.vm.stepNumber).toBe(step)
            expect(wrapper.vm.minStepNumber).toBe(step)

            await wrapper.setData({ newStep: step })
            expect(wrapper.vm.stepDecimals).toBe(0)
            await wrapper.setData({ newStep: stepDec })
            expect(wrapper.vm.stepDecimals).toBe(1)

            await wrapper.setData({
                newStep: step,
                newMinStep: minStep
            })
            expect(wrapper.vm.stepDecimals).toBe(2)
            expect(wrapper.vm.minStepNumber).toBe(minStep)
            await wrapper.setData({ newStep: stepDec })
            expect(wrapper.vm.stepDecimals).toBe(2)
            expect(wrapper.vm.minStepNumber).toBe(minStep)
        })

        it('manage prop value', async () => {
            const value = 5

            await wrapper.setProps({ modelValue: value })
            expect(wrapper.vm.newValue).toBe(value)
        })

        it('allows a placeholder', async () => {
            const placeholder = 90
            const value = 10

            await wrapper.setProps({ placeholder })
            expect(wrapper.vm.placeholder).toBe(placeholder)

            // Only user input should set value, i.e. placeholder shouldn't set value
            await wrapper.setProps({ modelValue: value })
            expect(wrapper.vm.newValue).toBe(value)
        })

        it('expects placeholder to not override v-model value', async () => {
            const placeholder = 90
            const value = 10
            const newValue = 20

            await wrapper.setProps({ placeholder, modelValue: value })
            expect(wrapper.vm.placeholder).toBe(placeholder)
            await wrapper.setProps({ modelValue: newValue })

            // Only user input should set value, i.e. placeholder shouldn't set value
            expect(wrapper.vm.newValue).toBe(newValue)
        })

        it('allows a string placeholder value', async () => {
            const placeholder = '90'
            const newValue = 20

            await wrapper.setProps({ placeholder })
            expect(wrapper.vm.placeholder).toBe(placeholder)
            await wrapper.setProps({ modelValue: newValue })
            expect(wrapper.vm.modelValue).toBe(20)
            expect(wrapper.vm.computedValue).toBe(20)
            wrapper.vm.increment()
            expect(wrapper.vm.computedValue).toBe(21)
        })

        it('can increment / decrement', async () => {
            const min = 5
            const max = 6
            wrapper.vm.computedValue = max

            await wrapper.setProps({ min })
            wrapper.vm.decrement()
            expect(wrapper.vm.computedValue).toBe(min)
            wrapper.vm.decrement()
            expect(wrapper.vm.computedValue).toBe(min)

            await wrapper.setProps({ max })
            wrapper.vm.increment()
            expect(wrapper.vm.computedValue).toBe(max)
            wrapper.vm.increment()
            expect(wrapper.vm.computedValue).toBe(max)
        })

        it('can increment / decrement with a step', async () => {
            const start = 5
            const step = 3.5
            const min = -5
            wrapper.vm.computedValue = start
            await wrapper.setProps({ step, min })
            wrapper.vm.decrement()
            expect(wrapper.vm.computedValue).toBe(start - step)
            wrapper.vm.decrement()
            expect(wrapper.vm.computedValue).toBe(start - (step * 2))
        })

        it('can increment / decrement with a "any" step', async () => {
            const start = 5
            const step = 'any'
            const min = -5
            wrapper.vm.computedValue = start
            await wrapper.setProps({ step, min })
            wrapper.vm.decrement()
            expect(wrapper.vm.computedValue).toBe(start - 1)
            wrapper.vm.decrement()
            expect(wrapper.vm.computedValue).toBe(start - (1 * 2))

            const decimalStart = 5.15
            wrapper.vm.computedValue = decimalStart
            await wrapper.setProps({ step, min })
            wrapper.vm.decrement()
            expect(wrapper.vm.computedValue).toBe(start - 1)
            wrapper.vm.decrement()
            expect(wrapper.vm.computedValue).toBe(start - (1 * 2))
        })

        it('can increment / decrement with minStep', async () => {
            const start = 5.51
            const step = 0.2
            const minStep = 0.01
            const min = -5
            wrapper.vm.computedValue = start
            await wrapper.setProps({ step, min, minStep })
            wrapper.vm.decrement()
            expect(wrapper.vm.computedValue).toBe(5.31)
            wrapper.vm.decrement()
            expect(wrapper.vm.computedValue).toBe(5.11)
            wrapper.vm.increment()
            expect(wrapper.vm.computedValue).toBe(5.31)
            wrapper.vm.increment()
            expect(wrapper.vm.computedValue).toBe(5.51)

            const newMinStep = 0.1
            await wrapper.setProps({ minStep: newMinStep })
            wrapper.vm.decrement()
            expect(wrapper.vm.computedValue).toBe(5.3)
        })

        it('can increment / decrement with minStep and "any" as step', async () => {
            const start = 5.51
            const step = 'any'
            const minStep = 0.01
            const min = -5
            wrapper.vm.computedValue = start
            await wrapper.setProps({ step, min, minStep })
            wrapper.vm.decrement()
            expect(wrapper.vm.computedValue).toBe(4.51)
            wrapper.vm.decrement()
            expect(wrapper.vm.computedValue).toBe(3.51)
            wrapper.vm.increment()
            expect(wrapper.vm.computedValue).toBe(4.51)
            wrapper.vm.increment()
            expect(wrapper.vm.computedValue).toBe(5.51)

            const newMinStep = 0.1
            await wrapper.setProps({ minStep: newMinStep })
            wrapper.vm.decrement()
            expect(wrapper.vm.computedValue).toBe(4.5)
        })

        it('manages empty value', async () => {
            wrapper.vm.computedValue = ''
            expect(wrapper.vm.computedValue).toBeNull()

            const min = 5
            await wrapper.setProps({ min })
            wrapper.vm.computedValue = ''
            expect(wrapper.vm.computedValue).toBeNull()
        })

        it('increments/decrements on click', async () => {
            await wrapper.setProps({ modelValue: 5, step: 1 })

            wrapper.find('.control.plus button').trigger('click')

            await wrapper.vm.$nextTick()

            expect(wrapper.vm.computedValue).toBe(6)

            wrapper.find('.control.minus button').trigger('click')

            await wrapper.vm.$nextTick()

            expect(wrapper.vm.computedValue).toBe(5)
        })
    })

    describe('with fallthrough attributes', () => {
        const attrs = {
            class: 'fallthrough-class',
            style: 'font-size: 2rem;',
            id: 'fallthrough-id'
        }

        it('should apply class, style, and id to the root <div> element if compatFallthrough is true (default)', () => {
            const wrapper = shallowMount(BNumberinput, { attrs })

            const root = wrapper.find('div.b-numberinput')
            expect(root.classes(attrs.class)).toBe(true)
            expect(root.attributes('style')).toBe(attrs.style)
            expect(root.attributes('id')).toBe(attrs.id)

            const input = wrapper.findComponent({ ref: 'input' })
            expect(input.classes(attrs.class)).toBe(false)
            expect(input.attributes('style')).toBeUndefined()
            expect(input.attributes('id')).toBeUndefined()
        })

        it('should apply class, style and id to the underlying <b-input> if compatFallthrough is false', () => {
            const wrapper = shallowMount(BNumberinput, {
                attrs,
                props: {
                    compatFallthrough: false
                }
            })

            const root = wrapper.find('div.b-numberinput')
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
