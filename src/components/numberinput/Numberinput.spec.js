import { shallowMount, mount } from '@vue/test-utils'
import BNumberinput from '@components/numberinput/Numberinput'

describe('BNumberinput', () => {
    it('is called', () => {
        const wrapper = shallowMount(BNumberinput)
        expect(wrapper.name()).toBe('BNumberinput')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('renders by default', () => {
        const wrapper = mount(BNumberinput)

        expect(wrapper.contains('input')).toBeTruthy()
        expect(wrapper.contains('button')).toBeTruthy()
        expect(wrapper.classes()).toContain('is-grouped')
    })

    it('set controls position', () => {
        const wrapper = mount(BNumberinput, {
            propsData: {
                controlsPosition: 'compact'
            }
        })

        expect(wrapper.contains('input')).toBeTruthy()
        expect(wrapper.contains('button')).toBeTruthy()
        expect(wrapper.classes()).toContain('has-addons')
    })

    it('default value is 0', () => {
        const wrapper = mount(BNumberinput)

        const input = wrapper.find('input')
        expect(input.element.value).toBe('0')
    })
})
