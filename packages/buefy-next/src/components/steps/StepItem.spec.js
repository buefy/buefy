import { mount } from '@vue/test-utils'
import BSteps from '@components/steps/Steps'
import BStepItem from '@components/steps/StepItem'

let wrapper

const WrapperComp = {
    // values must be specified to make the snapshot reproducible
    // I took the values from the legacy snapshot.
    template: `
        <BSteps ref="steps">
            <BStepItem value="14" />
            <BStepItem value="16" ref="testItem"/>
            <BStepItem value="18" :visible="false"/>
        </BSteps>`,
    components: {
        BSteps, BStepItem
    }
}

describe('BStepItem', () => {
    let wrapperSteps

    beforeEach(() => {
        const root = mount(WrapperComp)
        wrapperSteps = root.findComponent({ ref: 'steps' })
        wrapper = root.findComponent({ ref: 'testItem' })
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

    it('should update active state', () => {
        expect(wrapper.vm.isActive).toBe(false)

        wrapperSteps.vm.next()
        expect(wrapper.vm.isActive).toBe(true)

        wrapperSteps.vm.prev()
        expect(wrapper.vm.isActive).toBe(false)
    })

    describe('with explicit order', () => {
        let wrapperSteps
        let wrapperTestItem

        beforeEach(() => {
            const wrapper = mount({
                template: `
                    <BSteps ref="steps">
                        <BStepItem ref="testItem" :order="2" />
                        <BStepItem :order="1" />
                        <BStepItem :order="3" />
                    </BSteps>`,
                components: {
                    BSteps, BStepItem
                }
            })
            wrapperSteps = wrapper.findComponent({ ref: 'steps' })
            wrapperTestItem = wrapper.findComponent({ ref: 'testItem' })
        })

        it('should update active state', () => {
            expect(wrapperTestItem.vm.isActive).toBe(false)

            wrapperSteps.vm.next()
            expect(wrapperTestItem.vm.isActive).toBe(true)

            wrapperSteps.vm.next()
            expect(wrapperTestItem.vm.isActive).toBe(false)

            wrapperSteps.vm.prev()
            expect(wrapperTestItem.vm.isActive).toBe(true)

            wrapperSteps.vm.prev()
            expect(wrapperTestItem.vm.isActive).toBe(false)
        })
    })
})
