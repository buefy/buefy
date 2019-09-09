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

    it('calls changeActive when value is changed', () => {
        wrapper.vm.changeActive = jest.fn()
        wrapper.setProps({value: 1})
        expect(wrapper.vm.changeActive).toHaveBeenCalled()
    })

    it('emit change event with value when changeActive is called', () => {
        const idx = 1
        wrapper.vm.changeActive(idx)
        const valueEmitted = wrapper.emitted()['change'][0]
        expect(valueEmitted).toContainEqual(idx)
        expect(wrapper.vm.activeChild).toEqual(idx)

        expect(() => wrapper.vm.changeActive(3)).toThrow()
    })

    it('emit input event with value when childClick is called', () => {
        wrapper.vm.changeActive = jest.fn()
        wrapper.vm.childClick(1)
        const valueEmitted = wrapper.emitted()['input'][0]
        expect(valueEmitted).toContainEqual(1)
        expect(wrapper.vm.changeActive).toHaveBeenCalled()
    })

    it('manage next/previous listener', () => {
        const first = 0
        const next = first + 1
        wrapper.setProps({value: first})

        expect(wrapper.vm.hasNext).toBeTruthy()
        wrapper.vm.next()
        expect(wrapper.emitted()['input'][0]).toContainEqual(next)
        expect(wrapper.vm.activeChild).toBe(next)
        expect(wrapper.vm.hasNext).toBeFalsy()

        wrapper.vm.next()
        expect(wrapper.vm.activeChild).toBe(next)

        expect(wrapper.vm.hasPrev).toBeTruthy()
        wrapper.vm.prev()
        expect(wrapper.emitted()['input'][1]).toContainEqual(first)
        expect(wrapper.vm.activeChild).toBe(first)
        expect(wrapper.vm.hasPrev).toBeFalsy()

        wrapper.vm.prev()
        expect(wrapper.vm.activeChild).toBe(first)
    })

    it('manage wrapper classes as expected', () => {
        expect(wrapper.vm.wrapperClasses[1]['is-vertical']).toBeFalsy()

        wrapper.setProps({vertical: true})
        expect(wrapper.vm.wrapperClasses[1]['is-vertical']).toBeTruthy()

        wrapper.setProps({position: 'is-right'})
        expect(wrapper.vm.wrapperClasses[1]['is-right']).toBeTruthy()
    })
})
