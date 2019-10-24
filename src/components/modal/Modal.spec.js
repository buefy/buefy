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

        expect(ariaRole.type).toBe(String)
        expect(ariaRole.validator && ariaRole.validator('d')).toBeFalsy()
        expect(ariaRole.validator && ariaRole.validator('dialog')).toBeTruthy()
        expect(ariaRole.validator && ariaRole.validator('alertdialog')).toBeTruthy()
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
    })

    it('emit events on close', () => {
        wrapper.vm.close()
        expect(wrapper.emitted()['close']).toBeTruthy()
        expect(wrapper.emitted()['update:active']).toBeTruthy()
    })
})
