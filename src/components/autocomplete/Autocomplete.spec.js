import { mount } from '@vue/test-utils'
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
let wrapper, $input, $dropdown, stubs

describe('BAutocomplete', () => {
    beforeEach(() => {
        stubs = {'b-icon': true}
        wrapper = mount(BAutocomplete, {stubs})

        $input = wrapper.find('input')
        $dropdown = wrapper.find(dropdownMenu)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BAutocomplete')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('has an input type', () => {
        expect(wrapper.contains('.control .input[type=text]')).toBeTruthy()
    })

    it('has a dropdown menu hidden by default', () => {
        expect(wrapper.contains(dropdownMenu)).toBeTruthy()
        expect($dropdown.isVisible()).toBeFalsy()
    })

    it('can emit input, focus and blur events', async () => {
        const VALUE_TYPED = 'test'
        wrapper.setProps({ data: DATA_LIST })

        $input.trigger('focus')
        expect(wrapper.emitted()['focus']).toBeTruthy()
        $input.setValue(VALUE_TYPED)

        await wrapper.vm.$nextTick()

        const valueEmitted = wrapper.emitted()['input'][0]
        expect(valueEmitted).toContainEqual(VALUE_TYPED)

        $input.trigger('blur')
        expect(wrapper.emitted()['blur']).toBeTruthy()
    })

    it('can autocomplete with keydown', async () => {
        const VALUE_TYPED = 'Ang'
        wrapper.setProps({ data: DATA_LIST })

        $input.trigger('focus')
        $input.setValue(VALUE_TYPED)
        await wrapper.vm.$nextTick()

        expect($dropdown.isVisible()).toBeTruthy()

        const itemsInDropdowm = findStringsStartingWith(DATA_LIST, VALUE_TYPED)

        $input.trigger('keydown.down')
        $input.trigger('keydown.enter')
        await wrapper.vm.$nextTick()

        expect($input.element.value).toBe(itemsInDropdowm[0])
        expect($dropdown.isVisible()).toBeFalsy()
    })

    it('close dropdown on esc', () => {
        jest.useFakeTimers()
        wrapper.setProps({ data: DATA_LIST })

        wrapper.vm.isActive = true
        expect($dropdown.isVisible()).toBeTruthy()

        $input.trigger('keyup.esc')

        expect($dropdown.isVisible()).toBeFalsy()

        wrapper.vm.calcDropdownInViewportVertical = jest.fn(
            () => wrapper.vm.calcDropdownInViewportVertical
        )
        jest.runAllTimers()
        expect(wrapper.vm.calcDropdownInViewportVertical).toHaveBeenCalled()
        jest.useRealTimers()
    })

    it('close dropdown on click outside', () => {
        wrapper.setProps({ data: DATA_LIST })

        wrapper.vm.isActive = true
        expect($dropdown.isVisible()).toBeTruthy()

        window.document.body.click()

        expect($dropdown.isVisible()).toBeFalsy()
    })

    it('open dropdown on down key click', () => {
        wrapper.setProps({ data: DATA_LIST })

        expect($dropdown.isVisible()).toBeFalsy()

        $input.trigger('focus')
        $input.trigger('keydown.down')

        expect($dropdown.isVisible()).toBeTruthy()
    })

    it('manages tab pressed as expected', async () => {
        // hovered is null
        $input.trigger('keydown.tab')
        expect($dropdown.isVisible()).toBeFalsy()

        // The first element will be hovered
        wrapper.setProps({
            openOnFocus: true,
            keepFirst: true
        })
        wrapper.setProps({
            data: DATA_LIST
        })
        // Set props in 2 steps to trigger Watch with keepFirst true so the 1st element is hovered

        $input.trigger('focus')
        await wrapper.vm.$nextTick()

        $input.trigger('keydown.tab')
        expect($input.element.value).toBe(DATA_LIST[0])
    })

    it('can openOnFocus and keepFirst', async () => {
        wrapper.setProps({
            openOnFocus: true,
            keepFirst: true
        })
        wrapper.setProps({
            data: DATA_LIST
        }) // Set props in 2 steps to trigger the Watch for data having keepFirst true

        expect($dropdown.isVisible()).toBeFalsy()

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

    it('clear button does not exist when the search input is empty', () => {
        wrapper.setData({newValue: ''})
        wrapper.setProps({ clearable: true })
        const subject = wrapper.find('b-icon-stub').exists()

        expect(subject).toBeFalsy()
    })

    it('clear button exists when the search input is not empty and clearable property is true', () => {
        wrapper.setData({ newValue: 'Jquery' })
        wrapper.setProps({ clearable: true })
        const subject = wrapper.find('b-icon-stub').exists()

        expect(subject).toBeTruthy()
    })

    it('clears search input text when clear button gets clicked', () => {
        wrapper.setData({newValue: 'Jquery'})
        wrapper.setProps({ clearable: true })
        wrapper.find('b-icon-stub').trigger('click')
        const subject = wrapper.vm.newValue

        expect(subject).toEqual('')
    })

    it('clear button does not appear when clearable property is not set to true', () => {
        wrapper.setData({newValue: 'Jquery'})
        const subject = wrapper.find('b-icon-stub').exists()

        expect(subject).toBeFalsy()
    })
})
