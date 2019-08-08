import { shallowMount } from '@vue/test-utils'
import BModal from '@components/modal/Modal'

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

    it('sets isActive when active prop is changed', () => {
        wrapper.setProps({active: false})
        expect(wrapper.vm.isActive).toBeFalsy()
    })

    it('emit events on close', () => {
        wrapper.vm.close()
        expect(wrapper.emitted()['close']).toBeTruthy()
        expect(wrapper.emitted()['update:active']).toBeTruthy()
    })
})
