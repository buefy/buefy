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
        wrapper = mount(BAutocomplete, {
            propsData: {
                checkInfiniteScroll: true
            },
            stubs
        })

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

    it('can apply a maximum height for the dropdown', () => {
        expect(wrapper.vm.contentStyle.maxHeight).toBeNull()

        const maxHeight = 200

        wrapper.setProps({ maxHeight })
        expect(wrapper.vm.contentStyle.maxHeight).toBe(`${maxHeight}px`)
        wrapper.setProps({ maxHeight: `${maxHeight}rem` })
        expect(wrapper.vm.contentStyle.maxHeight).toBe(`${maxHeight}rem`)
    })

    it('can select a value using v-model', () => {
        const value = DATA_LIST[0]
        wrapper.setProps({ value })
        expect(wrapper.vm.newValue).toBe(value)
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

        $input.trigger('keydown', {'key': 'Down'})
        $input.trigger('keydown', {'key': 'Enter'})
        await wrapper.vm.$nextTick()

        expect($input.element.value).toBe(itemsInDropdowm[0])
        expect($dropdown.isVisible()).toBeFalsy()

        $input.trigger('focus')
        $input.setValue(VALUE_TYPED)
        await wrapper.vm.$nextTick()

        expect($dropdown.isVisible()).toBeTruthy()

        $input.trigger('keydown', {'key': 'Down'})
        $input.trigger('keydown', {'key': 'Down'})
        $input.trigger('keydown', {'key': 'Enter'})
        await wrapper.vm.$nextTick()

        expect($input.element.value).toBe(itemsInDropdowm[1])
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

    it('open dropdown on down key click', async () => {
        wrapper.vm.setHovered = jest.fn(() => wrapper.vm.setHovered)
        wrapper.setProps({
            data: DATA_LIST,
            dropdownPosition: 'bottom'
        })

        expect($dropdown.isVisible()).toBeFalsy()

        $input.trigger('focus')
        $input.trigger('keydown.down')
        await wrapper.vm.$nextTick()

        expect($dropdown.isVisible()).toBeTruthy()
    })

    it('manages tab pressed as expected', async () => {
        // hovered is null
        $input.trigger('keydown', {'key': 'Tab'})
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

        $input.trigger('keydown', {'key': 'Tab'})
        expect($input.element.value).toBe(DATA_LIST[0])
    })

    it('can be used with objects', async () => {
        const data = [
            {
                id: 1,
                name: 'Value 1'
            },
            {
                id: 2,
                name: 'Value 2'
            }
        ]
        wrapper.setProps({
            data,
            field: 'name'
        })

        wrapper.vm.isActive = true
        expect($dropdown.isVisible()).toBeTruthy()

        $input.trigger('keydown', {'key': 'Enter'})
        expect(wrapper.vm.hovered).toBeNull()

        $input.trigger('keydown', {'key': 'Down'})
        $input.trigger('keydown', {'key': 'Enter'})
        expect($input.element.value).toBe(data[0].name)
    })

    it('clears the value if clearOnSelect is used', async () => {
        wrapper.setProps({
            data: DATA_LIST,
            clearOnSelect: (val) => true
        })

        wrapper.vm.isActive = true
        expect($dropdown.isVisible()).toBeTruthy()

        $input.trigger('keydown', {'key': 'Down'})
        $input.trigger('keydown', {'key': 'Enter'})
        expect($input.element.value).toBe('')
    })

    it('can be used with a custom data formatter', async () => {
        wrapper.setProps({
            data: DATA_LIST,
            customFormatter: (val) => `${val} formatted`
        })

        wrapper.vm.isActive = true
        expect($dropdown.isVisible()).toBeTruthy()

        $input.trigger('keydown', {'key': 'Down'})
        $input.trigger('keydown', {'key': 'Enter'})
        expect($input.element.value).toBe(`${DATA_LIST[0]} formatted`)
    })

    it('can openOnFocus and keepFirst', async () => {
        wrapper.setProps({
            openOnFocus: true,
            keepFirst: true
        })

        expect($dropdown.isVisible()).toBeFalsy()

        $input.trigger('focus')
        expect(wrapper.vm.hovered).toBeNull()

        wrapper.setProps({
            data: DATA_LIST
        }) // Set props in 2 steps to trigger the Watch for data having keepFirst true

        $input.trigger('focus')
        await wrapper.vm.$nextTick()

        expect($dropdown.isVisible()).toBeTruthy()

        expect(wrapper.vm.hovered).toBe(DATA_LIST[0])
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

    it('can have a custom clickable right icon', () => {
        wrapper.setProps({
            iconRight: 'delete',
            iconRightClickable: true
        })
        const icon = wrapper.find('b-icon-stub')
        expect(icon.exists()).toBeTruthy()

        icon.trigger('click')
        expect(wrapper.emitted()['icon-right-click']).toBeTruthy()
    })

    it('reset events before destroy', () => {
        document.removeEventListener = jest.fn()
        window.removeEventListener = jest.fn()

        wrapper.destroy()

        expect(document.removeEventListener).toBeCalledWith('click', expect.any(Function))
        expect(window.removeEventListener).toBeCalledWith('resize', expect.any(Function))
    })
})
