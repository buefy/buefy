import { shallow, mount } from '@vue/test-utils'
import BInput from '@components/input'
import BIcon from '@components/icon'

import config, {setOptions} from '@utils/config'

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
        const target = wrapper.find(BIcon)

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
            propsData: {
                type: 'password',
                passwordReveal: true
            }
        })

        const target = wrapper.find('input')
        expect(target.exists()).toBeTruthy()
        expect(target.attributes().type).toBe('password')
    })

    it('toggles the visibility of the password to true when the togglePasswordVisibility method is called', (done) => {
        const wrapper = mount(BInput, {
            propsData: {
                value: 'foo',
                type: 'password',
                passwordReveal: true
            }
        })

        wrapper.setData({ value: 'bar' })

        expect(wrapper.find('input').exists()).toBeTruthy()
        expect(wrapper.find('input').attributes().type).toBe('password')

        const visibilityIcon = wrapper.find('.icon.is-clickable')
        expect(visibilityIcon.exists()).toBeTruthy()
        visibilityIcon.trigger('click')
        wrapper.setData({ passwordReveal: false })
        expect(wrapper.find('input').attributes().type).toBe('text')

        wrapper.vm.$nextTick(done)
    })

    it('render the placeholder and readonly attribute when passed', () => {
        const wrapper = shallow(BInput, {
            attrs: { placeholder: 'Awesome!', readonly: true }
        })
        const target = wrapper.find('input')

        expect(target.element.getAttribute('placeholder')).toBe('Awesome!')
        expect(target.element.getAttribute('readonly')).toBe('readonly')
    })

    it('expands input when expanded property is passed', () => {
        const wrapper = shallow(BInput, {
            propsData: { expanded: true }
        })

        expect(wrapper.classes()).toContain('is-expanded')
    })

    it('display loading icon when loading property passed', () => {
        const wrapper = shallow(BInput, {
            propsData: { loading: true, icon: 'magnify' }
        })

        expect(wrapper.classes()).toContain('is-loading')
    })

    it('keep its value on blur', async () => {
        const wrapper = mount(BInput, {
            propsData: {
                value: 'foo'
            },
            methods: {
                checkHtml5Validity: () => true
            }
        })

        const input = wrapper.find('input')

        input.element.value = 'bar'
        input.trigger('input')
        input.trigger('blur')

        expect(input.element.value).toBe('bar')
    })

    it('change status icon when statusType updated', () => {
        const parent = {
            data: () => ({
                newType: 'is-success',
                _isField: true
            }),
            components: {BInput},
            template: `<b-input />`
        }
        const wrapper = mount(parent)

        const input = wrapper.find(BInput)
        expect(input.vm.statusTypeIcon).toBe('check')
        wrapper.setData({ newType: 'is-danger' })
        expect(input.vm.statusTypeIcon).toBe('alert-circle')
        wrapper.setData({ newType: 'is-info' })
        expect(input.vm.statusTypeIcon).toBe('information')
        wrapper.setData({ newType: 'is-warning' })
        expect(input.vm.statusTypeIcon).toBe('alert')
    })

    it('show custom status icon by defaultStatusTypeIcon', () => {
        setOptions(Object.assign(config, {
            defaultStatusTypeIcon: {
                'is-success': 'check-circle',
                'is-danger': 'times-circle',
                'is-info': 'info-circle'
            }
        }))
        const parent = {
            data: () => ({
                newType: 'is-success',
                _isField: true
            }),
            components: {BInput},
            template: `<b-input/>`
        }

        const wrapper = mount(parent)
        const input = wrapper.find(BInput)

        expect(input.vm.statusTypeIcon).toBe('check-circle')
        wrapper.setData({ newType: 'is-danger' })
        expect(input.vm.statusTypeIcon).toBe('times-circle')
        wrapper.setData({ newType: 'is-info' })
        expect(input.vm.statusTypeIcon).toBe('info-circle')
        wrapper.setData({ newType: 'is-warning' })
        expect(input.vm.statusTypeIcon).toBe('alert')
    })

    it('show custom status icon when stateIcon is set', () => {
        const stateIcon = {
            'is-success': 'check-circle',
            'is-danger': 'times-circle',
            'is-info': 'info-circle',
            'is-warning': 'exclamation-circle'
        }

        const parent = {
            data: () => ({
                newType: 'is-success',
                _isField: true,
                stateIcon
            }),
            components: {BInput},
            template: `<b-input :stateIcon="stateIcon"/>`
        }

        const wrapper = mount(parent)
        const input = wrapper.find(BInput)

        expect(input.vm.statusTypeIcon).toBe('check-circle')
        wrapper.setData({ newType: 'is-danger' })
        expect(input.vm.statusTypeIcon).toBe('times-circle')
        wrapper.setData({ newType: 'is-info' })
        expect(input.vm.statusTypeIcon).toBe('info-circle')
        wrapper.setData({ newType: 'is-warning' })
        expect(input.vm.statusTypeIcon).toBe('exclamation-circle')
    })
})
