import { shallowMount } from '@vue/test-utils'
import BSteps from '@components/steps/Steps'

let wrapper

const mockStepItems = (active = false) => {
    return {
        name: 'BStepItem',
        template: '<div></div>',
        data() {
            return {
                _isStepItem: true,
                isActive: active,
                visible: true,
                clickable: active || undefined
            }
        },
        methods: {
            activate: jest.fn(),
            deactivate: jest.fn()
        }
    }
}

describe('BSteps', () => {
    beforeEach(() => {
        wrapper = shallowMount(BSteps, {
            stub: ['b-step-item'],
            slots: {
                default: [
                    mockStepItems(true),
                    mockStepItems()
                ]
            }
        })
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BSteps')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('calls changeStep when value is changed', () => {
        wrapper.vm.changeStep = jest.fn()
        wrapper.setProps({value: 1})
        expect(wrapper.vm.changeStep).toHaveBeenCalled()
    })

    it('emit change event with value when changeStep is called', () => {
        const idx = 1
        wrapper.vm.changeStep(idx)
        const valueEmitted = wrapper.emitted()['change'][0]
        expect(valueEmitted).toContainEqual(idx)
        expect(wrapper.vm.activeStep).toEqual(idx)

        expect(() => wrapper.vm.changeStep(3)).toThrow()
    })

    it('emit input event with value when stepClick is called', () => {
        wrapper.vm.changeStep = jest.fn()
        wrapper.vm.stepClick(1)
        const valueEmitted = wrapper.emitted()['input'][0]
        expect(valueEmitted).toContainEqual(1)
        expect(wrapper.vm.changeStep).toHaveBeenCalled()
    })

    it('manage next/previous listener', () => {
        const first = 0
        const next = first + 1
        wrapper.setProps({value: first})

        expect(wrapper.vm.hasNext).toBeTruthy()
        wrapper.vm.next()
        expect(wrapper.emitted()['input'][0]).toContainEqual(next)
        expect(wrapper.vm.activeStep).toBe(next)
        expect(wrapper.vm.hasNext).toBeFalsy()

        wrapper.vm.next()
        expect(wrapper.vm.activeStep).toBe(next)

        expect(wrapper.vm.hasPrev).toBeTruthy()
        wrapper.vm.prev()
        expect(wrapper.emitted()['input'][1]).toContainEqual(first)
        expect(wrapper.vm.activeStep).toBe(first)
        expect(wrapper.vm.hasPrev).toBeFalsy()

        wrapper.vm.prev()
        expect(wrapper.vm.activeStep).toBe(first)
    })
})
