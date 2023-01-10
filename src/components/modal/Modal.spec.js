import { shallowMount } from '@vue/test-utils'
import BModal from '@components/modal/Modal'
import config, {setOptions} from '@utils/config'

let wrapper

describe('BModal', () => {
    beforeEach(() => {
        wrapper = shallowMount(BModal, {
            propsData: {
                active: true
            },
            stubs: {
                transition: false
            }
        })
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BModal')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('manage props validator', () => {
        const ariaRole = wrapper.vm.$options.props.ariaRole
        const ariaLabel = wrapper.vm.$options.props.ariaLabel

        expect(ariaRole.type).toBe(String)
        expect(ariaRole.validator && ariaRole.validator('d')).toBeFalsy()
        expect(ariaRole.validator && ariaRole.validator('dialog')).toBeTruthy()
        expect(ariaRole.validator && ariaRole.validator('alertdialog')).toBeTruthy()
        expect(ariaLabel.type).toBe(String)
        expect(ariaLabel.validator && ariaLabel.validator('')).toBeFalsy()
        expect(ariaLabel.validator && ariaLabel.validator('d')).toBeTruthy()
    })

    it('manage default config props values', () => {
        setOptions(Object.assign(config, {
            defaultModalScroll: 'keep'
        }))
        wrapper = shallowMount(BModal)

        expect(wrapper.vm.scroll).toEqual(config.defaultModalScroll)
    })

    it('sets isActive when active prop is changed', () => {
        wrapper.setProps({active: false})
        expect(wrapper.vm.isActive).toBeFalsy()
    })

    it('manage cancel options', () => {
        wrapper.setProps({canCancel: true})
        expect(wrapper.vm.cancelOptions).toEqual(config.defaultModalCanCancel)

        wrapper.setProps({canCancel: false})
        expect(wrapper.vm.cancelOptions).toEqual([])

        const options = ['escape']
        wrapper.setProps({canCancel: options})
        expect(wrapper.vm.cancelOptions).toEqual(options)

        wrapper.vm.close = jest.fn(() => wrapper.vm.close)
        wrapper.vm.cancel()
        wrapper.vm.cancel('escape')
        expect(wrapper.vm.close).toHaveBeenCalledTimes(1)
    })

    it('close on escape', () => {
        wrapper.setProps({canCancel: true})
        wrapper.setProps({active: true})
        wrapper.vm.cancel = jest.fn(() => wrapper.vm.cancel)
        const event = new KeyboardEvent('keyup', {'key': 'Escape'})
        wrapper.vm.keyPress({})
        wrapper.vm.keyPress(event)
        expect(wrapper.vm.cancel).toHaveBeenCalledTimes(1)
    })

    it('emit events on close', () => {
        jest.useFakeTimers()

        wrapper.vm.$destroy = jest.fn(() => wrapper.vm.$destroy)
        wrapper.vm.close()
        expect(wrapper.emitted()['close']).toBeTruthy()
        expect(wrapper.emitted()['update:active']).toBeTruthy()

        wrapper.setProps({programmatic: true})
        wrapper.vm.close()
        expect(wrapper.vm.isActive).toBeFalsy()

        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 150)
        jest.advanceTimersByTime(150)
        expect(wrapper.vm.$destroy).toHaveBeenCalled()
    })

    it('emit event on transition after-enter hook.', () => {
        wrapper.vm.afterEnter()
        expect(wrapper.emitted()['after-enter']).toBeTruthy()
    })

    it('emit event on transition after-leave hook.', () => {
        wrapper.vm.afterLeave()
        expect(wrapper.emitted()['after-leave']).toBeTruthy()
    })
})
