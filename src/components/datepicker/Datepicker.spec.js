import {
    mount
} from '@vue/test-utils'
import BDatepicker from '@components/datepicker/Datepicker'

const dropdownMenu = '.dropdown-menu'
let wrapper, $dropdown, $input

describe('BDatepicker', () => {
    beforeEach(() => {
        wrapper = mount(BDatepicker, {
            stubs: {
                transition: false
            }
        })
        $dropdown = wrapper.find(dropdownMenu)
        $input = wrapper.find('input')
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BDatepicker')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('has an input type', () => {
        expect(wrapper.contains('.control .input[type=text]')).toBeTruthy()
    })

    it('has a dropdown menu hidden by default', () => {
        expect(wrapper.contains(dropdownMenu)).toBeTruthy()
        expect($dropdown.isVisible()).toBeFalsy()
    })

    it('has no input type when inline', () => {
        wrapper.setProps({
            inline: 'true'
        })
        expect(wrapper.contains('.control .input[type=text]')).toBeFalsy()
    })

    it('has a dropdown menu visible when inline', () => {
        wrapper.setProps({
            inline: 'true'
        })
        expect(wrapper.contains(dropdownMenu)).toBeTruthy()
        expect($dropdown.isVisible()).toBeTruthy()
    })

    it('call toggle method', async () => {
        wrapper.vm.$refs.dropdown.isActive = false
        wrapper.vm.toggle()
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.$refs.dropdown.isActive).toBeTruthy()
        expect($dropdown.isVisible()).toBeTruthy()

        wrapper.vm.toggle(false)
        expect(wrapper.vm.$refs.dropdown.isActive).toBeFalsy()
    })

    it('can emit input, focus and blur events', () => {
        $input.trigger('focus')
        expect(wrapper.emitted()['focus']).toBeTruthy()
        $input.trigger('blur')
        expect(wrapper.emitted()['blur']).toBeTruthy()
    })

    it('can open datepicker on openOnfocus', () => {
        wrapper.setProps({
            openOnFocus: true
        })
        $input.trigger('focus')
        expect(wrapper.vm.$refs.dropdown.isActive).toBeTruthy()
        expect($dropdown.isVisible()).toBeTruthy()
    })

    it('can open datepicker on enter', () => {
        wrapper.setProps({
            openOnFocus: false
        })
        $input.trigger('focus')
        $input.trigger('keyup.enter')
        expect(wrapper.vm.$refs.dropdown.isActive).toBeTruthy()
        expect($dropdown.isVisible()).toBeTruthy()
    })

    it('can close datepicker on esc', () => {
        wrapper.vm.$refs.dropdown.isActive = true
        const keyupEvent = new Event('keyup')
        keyupEvent.keyCode = 27
        window.document.dispatchEvent(keyupEvent)
        wrapper.vm.$nextTick(() => expect($dropdown.isVisible()).toBeFalsy())
    })
})
