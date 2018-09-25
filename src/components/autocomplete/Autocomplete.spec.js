import { mount } from '@vue/test-utils'
import Helpers from 'mwangaben-vthelpers'
import BAutocomplete from '@components/autocomplete/Autocomplete'

const findStringsStartingWith = (array, value) =>
    array.filter((x) => x.startsWith(value))

const DATA_LIST = [
    'Angular',
    'Angular 2',
    'Aurelia',
    'Backbone',
    'Ember',
    'jQuery',
    'Meteor',
    'Node.js',
    'Polymer',
    'React',
    'RxJS',
    'Vue.js'
]
const dropdownMenu = '.dropdown-menu'
let wrapper, b, $input, $dropdown

describe('BAutocomplete', () => {
    beforeEach(() => {
        wrapper = mount(BAutocomplete)
        b = new Helpers(wrapper, expect)

        $input = b.find('input')
        $dropdown = b.find(dropdownMenu)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BAutocomplete')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('has an input type', () => {
        b.domHas('.control .input[type=text]')
    })

    it('has a dropdown menu hidden by default', () => {
        b.domHas(dropdownMenu)
        b.hidden(dropdownMenu)
    })

    it('can emit input, focus and blur events', async () => {
        const VALUE_TYPED = 'test'
        wrapper.setProps({ data: DATA_LIST })

        $input.trigger('focus')
        b.emitted('focus')
        b.type(VALUE_TYPED, 'input')

        await wrapper.vm.$nextTick()

        b.emittedContains('input', VALUE_TYPED)

        $input.trigger('blur')
        b.emitted('blur')
    })

    it('can autocomplete with keydown', async() => {
        const VALUE_TYPED = 'Ang'
        wrapper.setProps({ data: DATA_LIST })

        $input.trigger('focus')
        b.type(VALUE_TYPED, 'input')
        await wrapper.vm.$nextTick()

        expect($dropdown.isVisible()).toBeTruthy()

        b.domHas('b')

        const wordsInBold = wrapper.findAll('b')
        const itemsInDropdowm = findStringsStartingWith(DATA_LIST, VALUE_TYPED)
        expect(itemsInDropdowm).toHaveLength(wordsInBold.length)

        $input.trigger('keydown.down')
        $input.trigger('keydown.enter')
        await wrapper.vm.$nextTick()

        b.inputValueIs(itemsInDropdowm[0], 'input')
        b.hidden(dropdownMenu)
    })

    it('check validity when value change', async () => {
        wrapper.setProps({ data: DATA_LIST })
        wrapper.vm.$refs.input.checkHtml5Validity = jest.fn()

        wrapper.vm.isValid = false
        wrapper.vm.value = 'test'
        wrapper.vm.$nextTick()

        expect(wrapper.vm.$refs.input.checkHtml5Validity).toBeCalled()
    })

    it('close dropdown on esc', async () => {
        wrapper.setProps({ data: DATA_LIST })

        wrapper.vm.isActive = true
        expect($dropdown.isVisible()).toBeTruthy()

        $input.trigger('keyup.esc')

        b.hidden(dropdownMenu)
    })

    it('close dropdown on click outside', () => {
        wrapper.setProps({ data: DATA_LIST })

        wrapper.vm.isActive = true
        expect($dropdown.isVisible()).toBeTruthy()

        window.document.body.click()

        b.hidden(dropdownMenu)
    })

    it('open dropdown on down key click', async () => {
        wrapper.setProps({ data: DATA_LIST })

        b.hidden(dropdownMenu)

        $input.trigger('focus')
        $input.trigger('keydown.down')

        expect($dropdown.isVisible()).toBeTruthy()
    })

    it('can openOnFocus and keepFirst', async () => {
        wrapper.setProps({
            data: DATA_LIST,
            openOnFocus: true,
            keepFirst: true
        })

        b.hidden(dropdownMenu)

        $input.trigger('focus')
        await wrapper.vm.$nextTick()

        expect($dropdown.isVisible()).toBeTruthy()

        expect(wrapper.vm.hovered).toBe(DATA_LIST[0])
    })

    it('reset events before destroy', () => {
        document.removeEventListener = jest.fn()
        window.removeEventListener = jest.fn()

        wrapper.destroy()

        expect(document.removeEventListener).toBeCalledWith('click', expect.any(Function))
        expect(window.removeEventListener).toBeCalledWith('resize', expect.any(Function))
    })
})
