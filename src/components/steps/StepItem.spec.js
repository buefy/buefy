import { shallowMount } from '@vue/test-utils'
import BStepItem from '@components/steps/StepItem'

let wrapper
const BSteps = {
    template: '<b-step-stub></b-step-stub>',
    data() {
        return {
            stepItems: [],
            _isSteps: true
        }
    }
}

describe('BSteps', () => {
    beforeEach(() => {
        wrapper = shallowMount(BStepItem, {
            parentComponent: BSteps
        })
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BStepItem')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('set isActive when activate is called', () => {
        wrapper.vm.activate()
        expect(wrapper.vm.isActive).toBeTruthy()
    })

    it('reset isActive when deactivate is called', () => {
        wrapper.vm.deactivate()
        expect(wrapper.vm.isActive).toBeFalsy()
    })
})
