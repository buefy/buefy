import { shallowMount } from '@vue/test-utils'
import BSteps from '@components/steps/Steps'
import BStepItem from '@components/steps/StepItem'

let wrapper

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
})
