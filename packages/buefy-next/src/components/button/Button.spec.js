import { shallowMount, mount } from '@vue/test-utils'
import BButton from '@components/button/Button'
import config, { setOptions } from '@utils/config'

let wrapper

describe('BButton', () => {
    beforeEach(() => {
        wrapper = shallowMount(BButton)
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BButton')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('emit a click event', () => {
        const click = jest.fn()
        wrapper = shallowMount(BButton, {
            props: {
                onClick: click
            }
        })
        wrapper.find('.button').trigger('click')
        expect(click).toHaveBeenCalledTimes(1)
    })

    it('should show icon', () => {
        wrapper = mount(BButton, {
            props: {
                iconLeft: 'plus'
            }
        })
        expect(wrapper.find('.icon').exists()).toBe(true)
    })

    it('should be medium', async () => {
        await wrapper.setProps({
            size: 'is-medium'
        })
        expect(wrapper.classes()).toContain('is-medium')
    })

    it('should be small + icon', () => {
        wrapper = mount(BButton, {
            propsData: {
                size: 'is-small',
                iconLeft: 'plus'
            }
        })
        expect(wrapper.classes()).toContain('is-small')
        expect(wrapper.find('.icon').exists()).toBe(true)
    })

    it('should be large + icon', () => {
        wrapper = mount(BButton, {
            propsData: {
                size: 'is-large',
                iconLeft: 'plus'
            }
        })
        expect(wrapper.classes()).toContain('is-large')
        expect(wrapper.find('.icon').exists()).toBe(true)
    })

    it('should be rounded when default config set to true', async () => {
        setOptions(Object.assign(config, {
            defaultButtonRounded: true
        }))
        await wrapper.setProps({
            rounded: config.defaultButtonRounded
        })
        expect(wrapper.classes()).toContain('is-rounded')
    })

    it('should set tag to "button" if disabled', async () => {
        await wrapper.setProps({
            tag: 'a'
        })
        expect(wrapper.vm.computedTag).toBe('a')

        wrapper = shallowMount(BButton, {
            attrs: {
                disabled: true
            }
        })
        expect(wrapper.vm.computedTag).toBe('button')
    })

    it('should set type attribute', async () => {
        await wrapper.setProps({
            nativeType: 'submit'
        })
        expect(wrapper.element.type).toBe('submit')
    })

    it("shouldn't set type attribute unless if the tag is button", async () => {
        await wrapper.setProps({
            tag: 'a'
        })
        expect(wrapper.element.type).toBeFalsy()
    })

    it('should set type attribute if the tag is input', async () => {
        await wrapper.setProps({
            tag: 'input',
            nativeType: 'submit'
        })
        expect(wrapper.element.type).toBe('submit')
    })
})
