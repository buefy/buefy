import {mount} from '@vue/test-utils'
import BSteps from '@components/steps/Steps'
import BStepItem from '@components/steps/StepItem'

let wrapper

const WrapperComp = {
    template: `
        <BSteps>
            <BStepItem/>
            <BStepItem ref="testItem"/>
            <BStepItem :visible="false"/>
        </BSteps>`,
    components: {
        BSteps, BStepItem
    }
}

describe('BStepItem', () => {
    beforeEach(() => {
        wrapper = mount(WrapperComp, { sync: false }).find({ ref: 'testItem' })
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BStepItem')
        expect(wrapper.isVueInstance()).toBeTruthy()
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
        const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {})

        try {
            wrapper = mount({
                template: `<BStepItem/>`,
                components: {
                    BStepItem
                },
                destroyed() {
                    spy()
                }
            })
        } catch (error) {
            expect(error.message).stringMatching(/You should wrap/)
        } finally {
            spy.mockRestore()
        }
    })
})
