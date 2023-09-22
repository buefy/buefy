import { shallowMount, mount } from '@vue/test-utils'
import BInput from '@components/input/Input'
import BIcon from '@components/icon/Icon'

let wrapper

describe('BInput', () => {
    beforeEach(() => {
        wrapper = shallowMount(BInput)
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('is vue instance', () => {
        expect(wrapper.name()).toBe('BInput')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('renders input element by default', () => {
        expect(wrapper.contains('input')).toBeTruthy()
        expect(wrapper.classes()).toContain('control')
    })

    it('render textarea element when type is textarea', () => {
        wrapper.setProps({ type: 'textarea' })
        const target = wrapper.find('textarea')

        expect(target.exists()).toBeTruthy()
        expect(target.classes()).toContain('textarea')
    })

    it('displays the icon when the icon property is true', () => {
        wrapper.setProps({ icon: 'magnify' })
        const target = wrapper.find(BIcon)

        expect(target.exists()).toBeTruthy()
    })

    it('display counter when the maxlength property is passed', () => {
        wrapper.setProps({
            value: 'foo',
            maxlength: 100
        })
        const counter = wrapper.find('small.counter')

        expect(counter.exists()).toBeTruthy()
        expect(counter.text()).toBe('3 / 100')

        wrapper.setProps({
            value: 1234
        })
        expect(counter.text()).toBe('4 / 100')
    })

    it('display correct input value length when value contains some emoji', () => {
        wrapper.setProps({
            value: '😀2',
            maxlength: 5
        })
        const counter = wrapper.find('small.counter')

        expect(counter.exists()).toBeTruthy()
        expect(counter.text()).toBe('2 / 5')
    })

    it('no display counter when hasCounter property set for false', () => {
        wrapper.setProps({ maxlength: 100 })
        expect(wrapper.find('small.counter').exists()).toBeTruthy()

        wrapper.setProps({ hasCounter: false })
        expect(wrapper.find('small.counter').exists()).toBeFalsy()
    })

    it('render field password when the type property is password', () => {
        const wrapper = shallowMount(BInput, {
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

        wrapper.setProps({ value: 'bar' })

        expect(wrapper.find('input').exists()).toBeTruthy()
        expect(wrapper.vm.newType).toBe('password')
        expect(wrapper.vm.isPasswordVisible).toBeFalsy()
        expect(wrapper.find('input').attributes().type).toBe('password')

        const visibilityIcon = wrapper.find('.icon.is-clickable')
        expect(visibilityIcon.exists()).toBeTruthy()
        visibilityIcon.trigger('click')
        wrapper.setProps({ passwordReveal: false })
        expect(wrapper.vm.newType).toBe('text')
        expect(wrapper.vm.isPasswordVisible).toBeTruthy()
        expect(wrapper.find('input').attributes().type).toBe('text')

        wrapper.vm.$nextTick(done)
    })

    it('render the placeholder and readonly attribute when passed', () => {
        const wrapper = shallowMount(BInput, {
            attrs: { placeholder: 'Awesome!', readonly: true }
        })
        const target = wrapper.find('input')

        expect(target.element.getAttribute('placeholder')).toBe('Awesome!')
        expect(target.element.getAttribute('readonly')).toBe('readonly')
    })

    it('expands input when expanded property is passed', () => {
        wrapper.setProps({ expanded: true })

        expect(wrapper.classes()).toContain('is-expanded')
    })

    it('display loading icon when loading property passed', () => {
        wrapper.setProps({
            loading: true,
            icon: 'magnify'
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

    it('manage the click on icon', (done) => {
        const wrapper = mount(BInput, {
            propsData: {
                icon: 'magnify',
                iconClickable: true
            }
        })

        expect(wrapper.find('input').exists()).toBeTruthy()

        const visibilityIcon = wrapper.find('.icon.is-clickable')
        expect(visibilityIcon.exists()).toBeTruthy()
        visibilityIcon.trigger('click')

        wrapper.vm.$nextTick(() => {
            expect(wrapper.emitted()['icon-click']).toBeTruthy()
            done()
        })
    })

    describe('validation', () => {
        let spyOnCheckHtml5Validity

        beforeEach(() => {
            spyOnCheckHtml5Validity = jest
                .spyOn(BInput.mixins[0].methods, 'checkHtml5Validity')
                .mockImplementation(function () {
                    this.isValid = false
                })
        })

        afterEach(() => {
            spyOnCheckHtml5Validity.mockReset()
        })

        it('should validate value when updated by user interaction', async () => {
            const wrapper = shallowMount(BInput, {
                data: () => ({ isValid: false })
            })

            // simulates "input" event
            wrapper.vm.onInput({ target: { value: 'foo' } })
            await wrapper.vm.$nextTick()
            expect(spyOnCheckHtml5Validity).toHaveBeenCalledTimes(1)

            // simulates "change" event
            await wrapper.setProps({ lazy: true })
            wrapper.vm.onChange({ target: { value: 'bar' } })
            await wrapper.vm.$nextTick()
            expect(spyOnCheckHtml5Validity).toHaveBeenCalledTimes(2)
        })

        it('should validate value when programmatically updated', async () => {
            const wrapper = shallowMount(BInput, {
                data: () => ({ isValid: false })
            })
            await wrapper.setProps({ value: 'foo' })
            await wrapper.vm.$nextTick()
            expect(spyOnCheckHtml5Validity).toHaveBeenCalledTimes(1)
        })

        describe('via v-model', () => {
            let root
            let wrapper

            beforeEach(async () => {
                root = mount({
                    template: '<b-input v-model="value" :lazy="lazy" />',
                    components: { 'b-input': BInput },
                    data: () => ({
                        value: '',
                        lazy: false
                    })
                })
                wrapper = root.find(BInput)
                // triggers validation and invalidates
                wrapper.vm.onBlur({})
                await wrapper.vm.$nextTick()
                spyOnCheckHtml5Validity.mockClear()
            })

            it('should validate value once when updated by user interaction', async () => {
                // simulates "input" event
                wrapper.vm.onInput({ target: { value: 'foo' } })
                await wrapper.vm.$nextTick()
                expect(root.vm.value).toBe('foo')
                expect(spyOnCheckHtml5Validity).toHaveBeenCalledTimes(1)

                // simulates "change" event
                await root.setData({ lazy: true })
                wrapper.vm.onChange({ target: { value: 'bar' } })
                await wrapper.vm.$nextTick()
                expect(root.vm.value).toBe('bar')
                expect(spyOnCheckHtml5Validity).toHaveBeenCalledTimes(2)
            })

            it('should validate value once when programmatically updated', async () => {
                await root.setData({ value: 'foo' })
                await wrapper.vm.$nextTick()
                expect(spyOnCheckHtml5Validity).toHaveBeenCalledTimes(1)
            })
        })
    })
})
