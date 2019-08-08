import { shallowMount } from '@vue/test-utils'
import BSteps from '@components/steps/Steps'

let wrapper

describe('BSteps', () => {
    beforeEach(() => {
        wrapper = shallowMount(BSteps)
        wrapper.setData({
            stepItems: [
                {
                    isActive: true,
                    clickable: false,
                    activate: jest.fn(),
                    deactivate: jest.fn()
                },
                {
                    isActive: false,
                    clickable: false,
                    activate: jest.fn(),
                    deactivate: jest.fn()
                }
            ]
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
    })

    it('emit input event with value when stepClick is called', () => {
        wrapper.vm.changeStep = jest.fn()
        wrapper.vm.stepClick(1)
        const valueEmitted = wrapper.emitted()['input'][0]
        expect(valueEmitted).toContainEqual(1)
        expect(wrapper.vm.changeStep).toHaveBeenCalled()
    })
})
