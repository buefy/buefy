import { mount } from '@vue/test-utils'
import BSteps from '@components/steps/Steps'
import BStepItem from '@components/steps/StepItem'

let wrapper

describe('BSteps', () => {
    beforeEach(() => {
        wrapper = mount(BSteps, {
            props: {
                modelValue: 1
            },
            slots: {
                // values must be specified to make the snapshot reproducible
                // I took them from the legacy snapshot
                default: `
                    <BStepItem value="14"></BStepItem>
                    <BStepItem value="16" :visible="false"></BStepItem>
                    <BStepItem value="18" :clickable="false"></BStepItem>
                `
            },
            global: {
                components: { BStepItem }
            }
        })
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BSteps')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('emit input event with value when active step is modified', async () => {
        await wrapper.setData({ activeId: wrapper.vm.items[0].value })

        const valueEmitted = wrapper.emitted()['update:modelValue']

        expect(valueEmitted).toBeTruthy()
        expect(valueEmitted.length).toBe(1)
        expect(valueEmitted[0][0]).toBe(0)
    })

    it('manage next/previous listener', async () => {
        const first = 0
        const next = first + 2

        // First input
        await wrapper.setProps({ modelValue: 0 })

        expect(wrapper.vm.modelValue).toBe(0)

        expect(wrapper.vm.hasNext).toBeTruthy()
        wrapper.vm.next()

        await wrapper.vm.$nextTick() // Wait until $emits have been handled

        // Simulate v-model
        let emitted = wrapper.emitted()['update:modelValue']
        await wrapper.setProps(
            { modelValue: emitted[emitted.length - 1][0] }
        )

        emitted = wrapper.emitted()['update:modelValue']

        expect(emitted).toBeTruthy()
        expect(emitted.length).toBe(1)
        expect(emitted[0][0]).toBe(next)

        expect(wrapper.vm.hasNext).toBeFalsy()

        wrapper.vm.next()

        await wrapper.vm.$nextTick() // Wait until $emits have been handled

        // Simulate v-model
        emitted = wrapper.emitted()['update:modelValue']
        await wrapper.setProps(
            { modelValue: emitted[emitted.length - 1][0] }
        )

        emitted = wrapper.emitted()['update:modelValue']
        expect(emitted.length).toBe(1) // To still be

        expect(wrapper.vm.hasPrev).toBeTruthy()
        wrapper.vm.prev()

        await wrapper.vm.$nextTick() // Wait until $emits have been handled

        // Simulate v-model
        emitted = wrapper.emitted()['update:modelValue']
        await wrapper.setProps(
            { modelValue: emitted[emitted.length - 1][0] }
        )

        emitted = wrapper.emitted()['update:modelValue']
        expect(emitted.length).toBe(2)
        expect(emitted[1][0]).toBe(first)
        expect(wrapper.vm.hasPrev).toBeFalsy()

        wrapper.vm.prev()
        await wrapper.vm.$nextTick() // Wait until $emits have been handled

        emitted = wrapper.emitted()['update:modelValue']
        expect(emitted.length).toBe(2) // To still be
    })

    it('manage wrapper classes as expected', async () => {
        expect(wrapper.vm.wrapperClasses[1]['is-vertical']).toBeFalsy()

        await wrapper.setProps({ vertical: true })
        expect(wrapper.vm.wrapperClasses[1]['is-vertical']).toBeTruthy()

        await wrapper.setProps({ position: 'is-right' })
        expect(wrapper.vm.wrapperClasses[1]['is-right']).toBeTruthy()
    })
})
