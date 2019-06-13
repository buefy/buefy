import { shallowMount, mount } from '@vue/test-utils'
import BButton from '@components/button/Button'

describe('BButton', () => {
    it('is called', () => {
        const wrapper = shallowMount(BButton)
        expect(wrapper.name()).toBe('BButton')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('emit a click event', () => {
        const wrapper = shallowMount(BButton)
        const click = jest.fn()
        wrapper.vm.$on('click', click)
        wrapper.find('.button').trigger('click')
        expect(click).toHaveBeenCalledTimes(1)
    })

    it('should show icon', () => {
        const wrapper = mount(BButton, {
            propsData: {
                iconLeft: 'plus'
            }
        })
        expect(wrapper.contains('.icon')).toBe(true)
    })

    it('should be medium', () => {
        const wrapper = shallowMount(BButton, {
            propsData: {
                size: 'is-medium'
            }
        })
        expect(wrapper.classes()).toContain('is-medium')
    })

    it('should be small + icon', () => {
        const wrapper = mount(BButton, {
            propsData: {
                size: 'is-small',
                iconLeft: 'plus'
            }
        })
        expect(wrapper.classes()).toContain('is-small')
        expect(wrapper.contains('.icon')).toBe(true)
    })

    it('should be large + icon', () => {
        const wrapper = mount(BButton, {
            propsData: {
                size: 'is-large',
                iconLeft: 'plus'
            }
        })
        expect(wrapper.classes()).toContain('is-large')
        expect(wrapper.contains('.icon')).toBe(true)
    })
})
