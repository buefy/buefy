import { shallowMount } from '@vue/test-utils'
import BTaginput from '@components/taginput/Taginput'

describe('BTaginput', () => {
    it('is called', () => {
        const wrapper = shallowMount(BTaginput)
        expect(wrapper.name()).toBe('BTaginput')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        const wrapper = shallowMount(BTaginput)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('no display counter when hasCounter property set for false', () => {
        const wrapper = shallowMount(BTaginput, {
            propsData: { maxlength: 100 }
        })
        expect(wrapper.find('small.counter').exists()).toBeTruthy()

        wrapper.setProps({ hasCounter: false })
        expect(wrapper.find('small.counter').exists()).toBeFalsy()
    })
})
