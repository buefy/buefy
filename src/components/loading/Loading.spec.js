import { shallowMount } from '@vue/test-utils'
import BLoading from '@components/loading/Loading'

let wrapper

describe('BLoading', () => {
    beforeEach(() => {
        wrapper = shallowMount(BLoading, {
            propsData: {
                active: true
            },
            stubs: {
                transition: false
            }
        })
    })

    it('Is called', () => {
        expect(wrapper.name()).toBe('BLoading')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
