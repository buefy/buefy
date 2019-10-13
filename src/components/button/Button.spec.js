import { shallowMount, mount } from '@vue/test-utils'
import BButton from '@components/button/Button'
import config, {setOptions} from '@utils/config'

let wrapper

describe('BButton', () => {
    beforeEach(() => {
        wrapper = shallowMount(BButton)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BButton')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('emit a click event', () => {
        const click = jest.fn()
        wrapper.vm.$on('click', click)
        wrapper.find('.button').trigger('click')
        expect(click).toHaveBeenCalledTimes(1)
    })

    it('should show icon', () => {
        wrapper = mount(BButton, {
            propsData: {
                iconLeft: 'plus'
            }
        })
        expect(wrapper.contains('.icon')).toBe(true)
    })

    it('should be medium', () => {
        wrapper = shallowMount(BButton, {
            propsData: {
                size: 'is-medium'
            }
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
        expect(wrapper.contains('.icon')).toBe(true)
    })

    it('should be large + icon', () => {
        wrapper = mount(BButton, {
            propsData: {
                size: 'is-large',
                iconLeft: 'plus'
            }
        })
        expect(wrapper.classes()).toContain('is-large')
        expect(wrapper.contains('.icon')).toBe(true)
    })

    it('should be rounded when default config set to true', () => {
        setOptions(Object.assign(config, {
            defaultButtonRounded: true
        }))
        wrapper = mount(BButton, {
            propsData: {
                rounded: config.defaultButtonRounded
            }
        })
        expect(wrapper.classes()).toContain('is-rounded')
    })
})
