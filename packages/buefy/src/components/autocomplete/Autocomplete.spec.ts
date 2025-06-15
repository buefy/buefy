import { mount, shallowMount } from '@vue/test-utils'
import type { DOMWrapper, VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import BAutocomplete from '@components/autocomplete/Autocomplete.vue'

const findStringsStartingWith = (array: string[], value: string) =>
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
let wrapper: VueWrapper<InstanceType<typeof BAutocomplete>>
let $input: DOMWrapper<HTMLInputElement | HTMLTextAreaElement>
let $dropdown: DOMWrapper<Element>
const stubs = { 'b-icon': true }

describe('BAutocomplete', () => {
    beforeEach(() => {
        wrapper = mount(BAutocomplete, {
            attachTo: document.body, // isVisible tests require attachTo
            props: {
                checkInfiniteScroll: true
            },
            global: {
                stubs
            }
        })

        $input = wrapper.find('input')
        $dropdown = wrapper.find(dropdownMenu)
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BAutocomplete')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('has an input type', () => {
        expect(wrapper.find('.control .input[type=text]').exists()).toBeTruthy()
    })

    it('has a dropdown menu hidden by default', () => {
        expect(wrapper.find(dropdownMenu).exists()).toBeTruthy()
        expect($dropdown.isVisible()).toBeFalsy()
    })

    it('can apply a maximum height for the dropdown', async () => {
        expect(wrapper.vm.contentStyle.maxHeight).toBeUndefined()

        const maxHeight = 200

        await wrapper.setProps({ maxHeight })
        expect(wrapper.vm.contentStyle.maxHeight).toBe(`${maxHeight}px`)
        await wrapper.setProps({ maxHeight: `${maxHeight}rem` })
        expect(wrapper.vm.contentStyle.maxHeight).toBe(`${maxHeight}rem`)
    })

    it('can select a value using v-model', async () => {
        const modelValue = DATA_LIST[0]
        await wrapper.setProps({ modelValue })
        expect(wrapper.vm.newValue).toBe(modelValue)
    })

    it('can emit input, focus and blur events', async () => {
        const VALUE_TYPED = 'test'
        await wrapper.setProps({ data: DATA_LIST })

        await $input.trigger('focus')
        expect(wrapper.emitted().focus).toBeTruthy()
        await $input.setValue(VALUE_TYPED)

        const valueEmitted = wrapper.emitted()['update:modelValue'][0]
        expect(valueEmitted).toContainEqual(VALUE_TYPED)

        await $input.trigger('blur')
        expect(wrapper.emitted().blur).toBeTruthy()
    })

    it('can emit select-header by keyboard and click', async () => {
        const VALUE_TYPED = 'test'
        const wrapper = mount(BAutocomplete, {
            props: {
                checkInfiniteScroll: true,
                selectableHeader: true,
                selectableFooter: true
            },
            slots: {
                header: '<h1>SLOT HEADER</h1>',
                footer: '<h1>SLOT FOOTER</h1>'
            },
            global: {
                stubs
            }
        })
        const $input = wrapper.find('input')

        await $input.trigger('focus')
        await $input.setValue(VALUE_TYPED)

        await $input.trigger('keydown', { key: 'Down' })
        await $input.trigger('keydown', { key: 'Enter' })

        const $header = wrapper.find('.dropdown-item.dropdown-header')
        await $header.trigger('click')

        const emitted = wrapper.emitted()

        expect(emitted['select-header']).toBeTruthy()
        expect(emitted['select-header']).toHaveLength(2)
    })

    it('can emit select-footer by keyboard and click', async () => {
        const VALUE_TYPED = 'test'
        const wrapper = mount(BAutocomplete, {
            propsData: {
                checkInfiniteScroll: true,
                selectableHeader: true,
                selectableFooter: true
            },
            slots: {
                header: '<h1>SLOT HEADER</h1>',
                footer: '<h1>SLOT FOOTER</h1>'
            },
            global: {
                stubs
            }
        })
        const $input = wrapper.find('input')

        await $input.trigger('focus')
        await $input.setValue(VALUE_TYPED)

        await $input.trigger('keydown', { key: 'Down' })
        await $input.trigger('keydown', { key: 'Down' })
        await $input.trigger('keydown', { key: 'Enter' })
        await $input.trigger('blur')

        const $footer = wrapper.find('.dropdown-item.dropdown-footer')
        await $footer.trigger('click')

        const emitted = wrapper.emitted()

        expect(emitted['select-footer']).toBeTruthy()
        expect(emitted['select-footer']).toHaveLength(2)
    })

    it('can autocomplete with keydown', async () => {
        const VALUE_TYPED = 'Ang'
        await wrapper.setProps({ data: DATA_LIST })

        await $input.trigger('focus')
        await $input.setValue(VALUE_TYPED)

        expect($dropdown.isVisible()).toBeTruthy()

        const itemsInDropdowm = findStringsStartingWith(DATA_LIST, VALUE_TYPED)

        await $input.trigger('keydown', { key: 'Down' })
        await $input.trigger('keydown', { key: 'Enter' })

        expect($input.element.value).toBe(itemsInDropdowm[0])
        expect($dropdown.isVisible()).toBeFalsy()

        await $input.trigger('focus')
        await $input.setValue(VALUE_TYPED)

        expect($dropdown.isVisible()).toBeTruthy()

        await $input.trigger('keydown', { key: 'Down' })
        await $input.trigger('keydown', { key: 'Down' })
        await $input.trigger('keydown', { key: 'Enter' })

        expect($input.element.value).toBe(itemsInDropdowm[1])
        expect($dropdown.isVisible()).toBeFalsy()
    })

    it('close dropdown on esc', async () => {
        vi.useFakeTimers()
        await wrapper.setProps({ data: DATA_LIST })

        await wrapper.setData({ isActive: true })
        expect($dropdown.isVisible()).toBeTruthy()

        await $input.trigger('keydown', { key: 'Escape' })

        expect($dropdown.isVisible()).toBeFalsy()

        wrapper.vm.calcDropdownInViewportVertical = vi.fn(
            () => wrapper.vm.calcDropdownInViewportVertical
        )
        vi.runAllTimers()
        expect(wrapper.vm.calcDropdownInViewportVertical).toHaveBeenCalled()
        vi.useRealTimers()
    })

    it('close dropdown on click outside', async () => {
        await wrapper.setProps({ data: DATA_LIST })

        await wrapper.setData({ isActive: true })
        expect($dropdown.isVisible()).toBeTruthy()

        window.document.body.click()
        await wrapper.vm.$nextTick()
        expect($dropdown.isVisible()).toBeFalsy()
    })

    it('open dropdown on down key click', async () => {
        wrapper.vm.setHovered = vi.fn(() => wrapper.vm.setHovered)
        await wrapper.setProps({
            data: DATA_LIST,
            dropdownPosition: 'bottom'
        })

        expect($dropdown.isVisible()).toBeFalsy()

        await $input.trigger('focus')
        await $input.trigger('keydown.down')

        expect($dropdown.isVisible()).toBeTruthy()
    })

    it('manages tab pressed as expected', async () => {
        // hovered is null
        await $input.trigger('keydown', { key: 'Tab' })
        expect($dropdown.isVisible()).toBeFalsy()

        // The first element will be hovered
        await wrapper.setProps({
            openOnFocus: true,
            keepFirst: true
        })
        await wrapper.setProps({
            data: DATA_LIST
        })
        // Set props in 2 steps to trigger Watch with keepFirst true so the 1st element is hovered

        await $input.trigger('focus')

        await $input.trigger('keydown', { key: 'Tab' })
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
        await wrapper.setProps({
            data,
            field: 'name'
        })

        await wrapper.setData({ isActive: true })
        expect($dropdown.isVisible()).toBeTruthy()

        await $input.trigger('keydown', { key: 'Enter' })
        expect(wrapper.vm.hovered).toBeNull()

        await $input.trigger('keydown', { key: 'Down' })
        await $input.trigger('keydown', { key: 'Enter' })
        expect($input.element.value).toBe(data[0].name)
    })

    it('clears the value if clearOnSelect is used', async () => {
        await wrapper.setProps({
            data: DATA_LIST,
            clearOnSelect: true
        })

        await wrapper.setData({ isActive: true })
        expect($dropdown.isVisible()).toBeTruthy()

        await $input.trigger('keydown', { key: 'Down' })
        await $input.trigger('keydown', { key: 'Enter' })
        expect($input.element.value).toBe('')
    })

    it('can be used with a custom data formatter', async () => {
        await wrapper.setProps({
            data: DATA_LIST,
            customFormatter: (val: string) => `${val} formatted`
        })

        await wrapper.setData({ isActive: true })
        expect($dropdown.isVisible()).toBeTruthy()

        await $input.trigger('keydown', { key: 'Down' })
        await $input.trigger('keydown', { key: 'Enter' })
        expect($input.element.value).toBe(`${DATA_LIST[0]} formatted`)
    })

    it('can openOnFocus and keepFirst', async () => {
        await wrapper.setProps({
            openOnFocus: true,
            keepFirst: true
        })

        expect($dropdown.isVisible()).toBeFalsy()

        await $input.trigger('focus')
        expect(wrapper.vm.hovered).toBeNull()

        await wrapper.setProps({
            data: DATA_LIST
        }) // Set props in 2 steps to trigger the Watch for data having keepFirst true

        await $input.trigger('focus')

        expect($dropdown.isVisible()).toBeTruthy()

        expect(wrapper.vm.hovered).toBe(DATA_LIST[0])
    })

    it('clear button does not exist when the search input is empty', async () => {
        await wrapper.setData({ newValue: '' })
        await wrapper.setProps({ clearable: true })
        const subject = wrapper.find('b-icon-stub').exists()

        expect(subject).toBeFalsy()
    })

    it('clear button exists when the search input is not empty and clearable property is true', async () => {
        await wrapper.setData({ newValue: 'Jquery' })
        await wrapper.setProps({ clearable: true })
        const subject = wrapper.find('b-icon-stub').exists()

        expect(subject).toBeTruthy()
    })

    it('clears search input text when clear button gets clicked', async () => {
        await wrapper.setData({ newValue: 'Jquery' })
        await wrapper.setProps({ clearable: true })
        wrapper.find('b-icon-stub').trigger('click')
        const subject = wrapper.vm.newValue

        expect(subject).toEqual('')
    })

    it('clear button does not appear when clearable property is not set to true', async () => {
        await wrapper.setData({ newValue: 'Jquery' })
        const subject = wrapper.find('b-icon-stub').exists()

        expect(subject).toBeFalsy()
    })

    it('can have a custom clickable right icon', async () => {
        await wrapper.setProps({
            iconRight: 'delete',
            iconRightClickable: true
        })
        const icon = wrapper.find('b-icon-stub')
        expect(icon.exists()).toBeTruthy()

        await icon.trigger('click')
        expect(wrapper.emitted()['icon-right-click']).toBeTruthy()
    })

    it('reset events before destroy', () => {
        document.removeEventListener = vi.fn()
        window.removeEventListener = vi.fn()

        wrapper.unmount()

        expect(document.removeEventListener).toBeCalledWith('click', expect.any(Function))
        expect(window.removeEventListener).toBeCalledWith('resize', expect.any(Function))
    })

    it('emit active with payload true', async () => {
        await wrapper.setProps({
            data: DATA_LIST,
            openOnFocus: true,
            keepFirst: true
        })

        await $input.trigger('focus')

        const { active } = wrapper.emitted()

        expect(active).toBeTruthy()
        expect(active[0]).toEqual([true])
    })

    it('updates ariaAutocomplete when keepFirst changes', async () => {
        await wrapper.setProps({ keepFirst: true })
        expect(wrapper.vm.ariaAutocomplete).toBe('both')
        await wrapper.setProps({ keepFirst: false })
        expect(wrapper.vm.ariaAutocomplete).toBe('list')
    })

    it('clears selection when value changes from 0', async () => {
        await wrapper.setProps({ data: [0, 1] })
        wrapper.vm.setSelected(0)
        await wrapper.vm.$nextTick()
        await wrapper.setData({ newValue: '1' })
        expect(wrapper.vm.selected).toBeNull()
    })

    it('opens dropdown when value is 0', async () => {
        await wrapper.setProps({ data: ['0', '1'] })
        await wrapper.setData({ hasFocus: true })
        await $input.setValue('0')
        expect(wrapper.vm.isActive).toBe(true)
    })

    it('updates model when clearOnSelect is used', async () => {
        await wrapper.setProps({ data: DATA_LIST, clearOnSelect: true })
        await wrapper.setData({ isActive: true })
        await $input.trigger('keydown', { key: 'Down' })
        await $input.trigger('keydown', { key: 'Enter' })
        const emitted = wrapper.emitted()['update:modelValue']
        expect(emitted[emitted.length - 1]).toEqual([''])
    })

    it('updates white list when data changes', async () => {
        await wrapper.setProps({ data: ['a'] })
        const len = wrapper.vm.whiteList.length
        await wrapper.setProps({ data: ['a', 'b'] })
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.whiteList.length).toBeGreaterThan(len)
    })

    describe('with fallthrough attributes', () => {
        const attrs = {
            class: 'fallthrough-class',
            style: 'font-size: 2rem;',
            id: 'fallthrough-id'
        }

        it('should bind class, style, and id to the root div if compatFallthrough is true (default)', async () => {
            const wrapper = shallowMount(BAutocomplete, { attrs })

            const root = wrapper.find('div.autocomplete.control')
            expect(root.classes(attrs.class)).toBe(true)
            expect(root.attributes('style')).toBe(attrs.style)
            expect(root.attributes('id')).toBe(attrs.id)

            const input = wrapper.findComponent({ ref: 'input' })
            expect(input.classes(attrs.class)).toBe(false)
            expect(input.attributes('style')).toBeUndefined()
            expect(input.attributes('id')).toBeUndefined()
        })

        it('should bind class, style, and id to the input if compatFallthrough is false', async () => {
            const wrapper = shallowMount(BAutocomplete, {
                attrs,
                props: {
                    compatFallthrough: false
                }
            })

            const input = wrapper.findComponent({ ref: 'input' })
            expect(input.classes(attrs.class)).toBe(true)
            expect(input.attributes('style')).toBe(attrs.style)
            expect(input.attributes('id')).toBe(attrs.id)

            const root = wrapper.find('div.autocomplete.control')
            expect(root.classes(attrs.class)).toBe(false)
            expect(root.attributes('style')).toBeUndefined()
            expect(root.attributes('id')).toBeUndefined()
        })
    })

    // Test for bug #4098: Arrow key selection doesn't work with computed data
    it('should handle arrow key navigation with computed data containing objects', async () => {
        // This test reproduces the bug where arrow key navigation fails with computed data
        // that contains objects, due to proxy comparison issues

        const DATA_OBJECTS = [
            { id: 1, name: 'Angular' },
            { id: 2, name: 'React' },
            { id: 3, name: 'Vue.js' }
        ]

        // Simulate computed data by creating a new array reference each time
        // This mimics how Vue's reactivity system creates new proxy objects
        const createComputedData = () => {
            return DATA_OBJECTS.map((item) => ({ ...item }))
        }

        // Set initial data
        await wrapper.setProps({
            data: createComputedData(),
            field: 'name',
            openOnFocus: true
        })

        // Focus and open dropdown
        await $input.trigger('focus')
        expect($dropdown.isVisible()).toBeTruthy()

        // Update data to simulate computed property changes (creates new object references)
        // This is where the bug manifests - the hovered item reference becomes stale
        await wrapper.setProps({ data: createComputedData() })

        // Try to navigate with arrow keys
        await $input.trigger('keydown', { key: 'Down' })

        // The first item should be hovered after pressing Down
        expect(wrapper.vm.hovered).not.toBeNull()
        expect(wrapper.vm.hovered?.name).toBe('Angular')

        // Navigate to second item
        await $input.trigger('keydown', { key: 'Down' })

        // This should move to the second item, but due to the bug it might not work
        expect(wrapper.vm.hovered?.name).toBe('React')

        // Select the hovered item
        await $input.trigger('keydown', { key: 'Enter' })
        expect($input.element.value).toBe('React')
    })

    it('should handle arrow key navigation consistently after data updates', async () => {
        // Additional test to verify the fix works with multiple data updates
        const DATA_OBJECTS = [
            { id: 1, name: 'Angular', category: 'framework' },
            { id: 2, name: 'React', category: 'library' },
            { id: 3, name: 'Vue.js', category: 'framework' }
        ]

        await wrapper.setProps({
            data: DATA_OBJECTS,
            field: 'name',
            openOnFocus: true
        })

        await $input.trigger('focus')
        expect($dropdown.isVisible()).toBeTruthy()

        // Navigate to second item
        await $input.trigger('keydown', { key: 'Down' })
        await $input.trigger('keydown', { key: 'Down' })

        expect(wrapper.vm.hovered?.name).toBe('React')

        // Update data (simulating computed property change)
        const updatedData = DATA_OBJECTS.map((item) => ({ ...item, updated: true }))
        await wrapper.setProps({ data: updatedData })

        // Navigation should still work after data update
        await $input.trigger('keydown', { key: 'Down' })
        expect(wrapper.vm.hovered?.name).toBe('Vue.js')

        await $input.trigger('keydown', { key: 'Enter' })
        expect($input.element.value).toBe('Vue.js')
    })
})
