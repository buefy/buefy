import { mount } from '@vue/test-utils'
import BSteps from '@components/steps/Steps'
import BStepItem from '@components/steps/StepItem'

let wrapper

const WrapperComp = {
    // values must be specified to make the snapshot reproducible
    // I took the values from the legacy snapshot.
    template: `
        <BSteps>
            <BStepItem value="14" />
            <BStepItem value="16" ref="testItem"/>
            <BStepItem value="18" :visible="false"/>
        </BSteps>`,
    components: {
        BSteps, BStepItem
    }
}

describe('BStepItem', () => {
    beforeEach(() => {
        wrapper = mount(WrapperComp).findComponent({ ref: 'testItem' })
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BStepItem')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('computes its position correctly', () => {
        expect(wrapper.vm.index).toBe(1)
    })

    it('transition correctly when activate is called', () => {
        wrapper.vm.activate(0)
        expect(wrapper.vm.transitionName).toBe('slide-prev')

        wrapper.vm.activate(2)
        expect(wrapper.vm.transitionName).toBe('slide-next')
    })

    it('transition correctly when deactivate is called', () => {
        wrapper.vm.deactivate(2)
        expect(wrapper.vm.transitionName).toBe('slide-prev')

        wrapper.vm.deactivate(0)
        expect(wrapper.vm.transitionName).toBe('slide-next')
    })

    it('doesn\'t mount when it has no parent', () => {
        expect(() => mount(BStepItem)).toThrow(/You should wrap/)
    })
})
