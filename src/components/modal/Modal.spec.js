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
})
