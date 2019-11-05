import { shallowMount } from '@vue/test-utils'
import BTag from '@components/tag/Tag'

let wrapper

describe('BTag', () => {
    beforeEach(() => {
        wrapper = shallowMount(BTag)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BTag')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('emit close event when closing if not disabled', () => {
        wrapper.setProps({ disabled: false })

        const close = jest.fn()
        wrapper.vm.$on('close', close)
        wrapper.vm.close()

        wrapper.setProps({ disabled: true })
        wrapper.vm.close()

        expect(close).toHaveBeenCalledTimes(1)
    })
})
