import { shallow } from '@vue/test-utils'
import BInput from '@components/input'
import Icon from '@components/icon'

describe('BInput', () => {
    it('render correctly', () => {
        const wrapper = shallow(BInput)

        expect(wrapper.html()).toMatchSnapshot()
    })

    it('is vue instance', () => {
        const wrapper = shallow(BInput)

        expect(wrapper.name()).toBe('BInput')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('renders input element by default', () => {
        const wrapper = shallow(BInput)

        expect(wrapper.contains('input')).toBeTruthy()
        expect(wrapper.classes()).toContain('control')
    })

    it('render textarea element when type is textarea', () => {
        const wrapper = shallow(BInput, {
            propsData: { type: 'textarea' }
        })
        const target = wrapper.find('textarea')

        expect(target.exists()).toBeTruthy()
        expect(target.classes()).toContain('textarea')
    })

    it('displays the icon when the icon property is true', () => {
        const wrapper = shallow(BInput, {
            propsData: { icon: 'magnify' }
        })
        const target = wrapper.find(Icon)

        expect(target.exists()).toBeTruthy()
    })

    it('display counter when the maxlength property is passed', () => {
        const wrapper = shallow(BInput, {
            propsData: { value: 'foo', maxlength: 100 }
        })
        const counter = wrapper.find('small.counter')

        expect(counter.exists()).toBeTruthy()
        expect(counter.text()).toBe('3 / 100')
    })

    it('no display counter when hasCounter property set for false', () => {
        const wrapper = shallow(BInput, {
            propsData: { maxlength: 100 }
        })
        expect(wrapper.find('small.counter').exists()).toBeTruthy()

        wrapper.setProps({ hasCounter: false })
        expect(wrapper.find('small.counter').exists()).toBeFalsy()
    })

    it('render field password when the type property is password', () => {
        const wrapper = shallow(BInput, {
            propsData: { type: 'password' }
        })

        const target = wrapper.find('input')
        expect(target.exists()).toBeTruthy()
        expect(target.attributes().type).toBe('password')
    })

    it('render the placeholder and readonly attribute when passed', () => {
        const wrapper = shallow(BInput, {
            attrs: { placeholder: 'Awesome!', readonly: true }
        })
        const target = wrapper.find('input')

        expect(target.element.getAttribute('placeholder')).toBe('Awesome!')
        expect(target.element.getAttribute('readonly')).toBe('readonly')
    })

    it()
})
