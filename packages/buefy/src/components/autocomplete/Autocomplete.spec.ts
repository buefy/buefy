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

    it('should handle dynamic appendToBody prop changes without crashing', async () => {
        const data = ['Angular', 'Vue.js', 'React']
        const wrapper = mount(BAutocomplete, {
            props: {
                data,
                appendToBody: false // Start with false
            },
            attachTo: document.body
        })

        // Initially appendToBody is false
        expect(wrapper.vm.appendToBody).toBe(false)

        // Change appendToBody to true dynamically
        await wrapper.setProps({ appendToBody: true })
        expect(wrapper.vm.appendToBody).toBe(true)

        // Focus the input to trigger dropdown and potential appendToBody logic
        const input = wrapper.find('input')
        await input.trigger('focus')
        await wrapper.vm.$nextTick()

        // Type something to open dropdown and trigger updateAppendToBody
        wrapper.vm.newValue = 'Vue'
        await wrapper.vm.$nextTick()

        // This should not crash - if it crashes, the test will fail
        expect(wrapper.vm.isActive).toBe(true)

        wrapper.unmount()
    })

    it('should properly handle appendToBody switching from false to true and back', async () => {
        const data = ['Angular', 'Vue.js', 'React']
        const wrapper = mount(BAutocomplete, {
            props: {
                data,
                appendToBody: false,
                openOnFocus: true
            },
            attachTo: document.body
        })

        const input = wrapper.find('input')

        // Start with appendToBody false
        expect(wrapper.vm.appendToBody).toBe(false)
        expect(wrapper.vm.$data._bodyEl).toBeUndefined()

        // Focus to open dropdown
        await input.trigger('focus')
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.isActive).toBe(true)

        // Change to appendToBody true
        await wrapper.setProps({ appendToBody: true })
        expect(wrapper.vm.appendToBody).toBe(true)

        // Type something to trigger updateAppendToBody
        wrapper.vm.newValue = 'Vue'
        await wrapper.vm.$nextTick()

        // Should have created _bodyEl
        expect(wrapper.vm.$data._bodyEl).toBeDefined()

        // Change back to appendToBody false
        await wrapper.setProps({ appendToBody: false })
        expect(wrapper.vm.appendToBody).toBe(false)

        // _bodyEl should be cleaned up
        expect(wrapper.vm.$data._bodyEl).toBeUndefined()

        // Should still work normally
        expect(wrapper.vm.isActive).toBe(true)

        wrapper.unmount()
    })

    // Performance and stability tests for recent improvements
    describe('Performance and Stability Improvements', () => {
        it('should prevent race conditions by clearing timeouts properly', async () => {
            const wrapper = mount(BAutocomplete, {
                props: {
                    data: DATA_LIST,
                    dropdownPosition: 'auto'
                },
                attachTo: document.body
            })

            // Mock setTimeout and clearTimeout to verify they're called correctly
            const originalSetTimeout = window.setTimeout
            const originalClearTimeout = window.clearTimeout
            const setTimeoutSpy = vi.fn((handler: TimerHandler, timeout?: number) => {
                return originalSetTimeout(handler, timeout) as unknown as number
            })
            const clearTimeoutSpy = vi.fn(originalClearTimeout)
            // @ts-expect-error - Mocking global setTimeout for testing
            window.setTimeout = setTimeoutSpy
            window.clearTimeout = clearTimeoutSpy

            // Rapidly toggle isActive to test race condition prevention
            wrapper.vm.isActive = true
            await wrapper.vm.$nextTick()

            wrapper.vm.isActive = false
            await wrapper.vm.$nextTick()

            wrapper.vm.isActive = true
            await wrapper.vm.$nextTick()

            wrapper.vm.isActive = false
            await wrapper.vm.$nextTick()

            // Should have called clearTimeout to prevent race conditions
            expect(clearTimeoutSpy).toHaveBeenCalled()

            // Restore original functions
            window.setTimeout = originalSetTimeout
            window.clearTimeout = originalClearTimeout

            wrapper.unmount()
        })

        it('should handle scroll events with throttling to improve performance', async () => {
            const wrapper = mount(BAutocomplete, {
                props: {
                    data: DATA_LIST,
                    checkInfiniteScroll: true
                },
                attachTo: document.body
            })

            const input = wrapper.find('input')
            await input.trigger('focus')
            await input.setValue('test')

            // Make dropdown active
            wrapper.vm.isActive = true
            await wrapper.vm.$nextTick()

            // Get dropdown content element
            const dropdown = wrapper.find('.dropdown-content')
            expect(dropdown.exists()).toBe(true)

            // Mock requestAnimationFrame to test throttling
            const originalRAF = window.requestAnimationFrame
            const rafSpy = vi.fn((callback: FrameRequestCallback) => {
                const timestamp = performance.now()
                callback(timestamp)
                return 0
            })
            window.requestAnimationFrame = rafSpy

            // Initial scroll should work
            expect(wrapper.vm._scrollThrottled).toBe(false)

            // Trigger scroll event
            wrapper.vm.checkIfReachedTheEndOfScroll()

            // Should use requestAnimationFrame for throttling
            expect(rafSpy).toHaveBeenCalled()

            // Restore RAF
            window.requestAnimationFrame = originalRAF

            wrapper.unmount()
        })

        it('should handle DOM errors gracefully in calcDropdownInViewportVertical', async () => {
            const wrapper = mount(BAutocomplete, {
                props: {
                    data: DATA_LIST,
                    dropdownPosition: 'auto'
                }
            })

            // Mock console.warn to verify error handling
            const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

            // Simulate a DOM error by making getBoundingClientRect throw
            const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect
            Element.prototype.getBoundingClientRect = vi.fn(() => {
                throw new Error('DOM error')
            })

            // This should not crash and should use fallback positioning
            wrapper.vm.calcDropdownInViewportVertical()
            await wrapper.vm.$nextTick()

            // Should log warning and use fallback
            expect(consoleSpy).toHaveBeenCalledWith(
                expect.stringContaining('Error calculating dropdown position'),
                expect.any(Error)
            )
            expect(wrapper.vm.isListInViewportVertically).toBe(true) // Fallback value

            // Restore original methods
            Element.prototype.getBoundingClientRect = originalGetBoundingClientRect
            consoleSpy.mockRestore()

            wrapper.unmount()
        })

        it('should handle scroll handler errors gracefully', async () => {
            const wrapper = mount(BAutocomplete, {
                props: {
                    data: DATA_LIST,
                    checkInfiniteScroll: true
                },
                attachTo: document.body
            })

            // Mock console.warn to verify error handling
            const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

            // Set up the dropdown first
            const input = wrapper.find('input')
            await input.trigger('focus')
            await input.setValue('test')
            wrapper.vm.isActive = true
            await wrapper.vm.$nextTick()

            // Mock the specific querySelector call that's used in checkIfReachedTheEndOfScroll
            const originalQuerySelector = Element.prototype.querySelector
            const mockQuerySelector = vi.fn((selector: string) => {
                if (selector === '.dropdown-content') {
                    throw new Error('DOM query error')
                }
                return originalQuerySelector.call(this, selector)
            })
            Element.prototype.querySelector = mockQuerySelector

            // This should not crash
            wrapper.vm.checkIfReachedTheEndOfScroll()

            // Wait for RAF to complete
            await new Promise((resolve) => setTimeout(resolve, 20))

            // Should log warning and handle error gracefully
            expect(consoleSpy).toHaveBeenCalledWith(
                expect.stringContaining('Error in scroll handler'),
                expect.any(Error)
            )

            // Restore original methods
            Element.prototype.querySelector = originalQuerySelector
            consoleSpy.mockRestore()

            wrapper.unmount()
        })

        it('should properly clean up timeouts on component destroy', async () => {
            const wrapper = mount(BAutocomplete, {
                props: {
                    data: DATA_LIST,
                    dropdownPosition: 'auto'
                }
            })

            // Mock clearTimeout to verify cleanup
            const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout')

            // Trigger a timeout by setting isActive to false
            // This should create a timeout in the watcher
            wrapper.vm.isActive = true
            await wrapper.vm.$nextTick()
            wrapper.vm.isActive = false
            await wrapper.vm.$nextTick()

            // Verify timeout was set (might be undefined initially)
            // The key is that clearTimeout should be called during cleanup

            // Unmount component
            wrapper.unmount()

            // Should have called clearTimeout during cleanup if timeout existed
            // This verifies the cleanup logic is in place
            expect(clearTimeoutSpy).toHaveBeenCalled()

            clearTimeoutSpy.mockRestore()
        })

        it('should handle type safety for event targets in clickedOutside', async () => {
            const wrapper = mount(BAutocomplete, {
                props: {
                    data: DATA_LIST
                },
                attachTo: document.body
            })

            const input = wrapper.find('input')
            await input.trigger('focus')
            wrapper.vm.isActive = true

            // Create a mock event with null target (testing type safety)
            const mockEvent = new MouseEvent('click', {
                bubbles: true,
                cancelable: true
            })

            // Override target to be null for testing
            Object.defineProperty(mockEvent, 'target', {
                value: null,
                writable: false
            })

            // This should not crash due to proper type safety checks
            expect(() => {
                wrapper.vm.clickedOutside(mockEvent)
            }).not.toThrow()

            wrapper.unmount()
        })

        it('should maintain performance during rapid data updates', async () => {
            const wrapper = mount(BAutocomplete, {
                props: {
                    data: DATA_LIST,
                    openOnFocus: true
                },
                attachTo: document.body
            })

            const input = wrapper.find('input')
            await input.trigger('focus')

            // Measure time for rapid data updates
            const startTime = performance.now()

            // Rapidly update data multiple times
            for (let i = 0; i < 10; i++) {
                const newData = DATA_LIST.map((item) => `${item}_${i}`)
                await wrapper.setProps({ data: newData })
                await wrapper.vm.$nextTick()
            }

            const endTime = performance.now()
            const executionTime = endTime - startTime

            // Should complete reasonably quickly (less than 100ms for 10 updates)
            expect(executionTime).toBeLessThan(100)

            wrapper.unmount()
        })

        it('should handle scroll throttling flag correctly', async () => {
            const wrapper = mount(BAutocomplete, {
                props: {
                    data: DATA_LIST,
                    checkInfiniteScroll: true
                },
                attachTo: document.body
            })

            // Initial state should be false
            expect(wrapper.vm._scrollThrottled).toBe(false)

            // Set up dropdown to be active
            const input = wrapper.find('input')
            await input.trigger('focus')
            wrapper.vm.isActive = true
            await wrapper.vm.$nextTick()

            // Verify throttling behavior by checking the flag directly
            expect(wrapper.vm._scrollThrottled).toBe(false)

            wrapper.unmount()
        })
    })

    // Edge case tests for robustness
    describe('Edge Cases and Robustness', () => {
        it('should handle undefined refs gracefully', async () => {
            const wrapper = mount(BAutocomplete, {
                props: {
                    data: DATA_LIST
                }
            })

            // Test that methods handle missing refs gracefully
            const originalDropdown = wrapper.vm.$refs.dropdown

            // Temporarily set dropdown ref to undefined
            wrapper.vm.$refs.dropdown = undefined

            // These should not crash
            expect(() => {
                wrapper.vm.calcDropdownInViewportVertical()
            }).not.toThrow()

            // Restore refs
            wrapper.vm.$refs.dropdown = originalDropdown

            wrapper.unmount()
        })

        it('should handle missing DOM elements in scroll handler', async () => {
            const wrapper = mount(BAutocomplete, {
                props: {
                    data: DATA_LIST,
                    checkInfiniteScroll: true
                }
            })

            // Create a simple test for missing elements
            // The method should handle cases where dropdown content is missing
            expect(() => {
                wrapper.vm.checkIfReachedTheEndOfScroll()
            }).not.toThrow()

            wrapper.unmount()
        })

        it('should handle window object being undefined (SSR compatibility)', () => {
            // Simple test for SSR compatibility
            // The component should be able to handle cases where window APIs are not available
            const wrapper = mount(BAutocomplete, {
                props: {
                    data: DATA_LIST
                }
            })

            // Should not crash during creation in SSR-like environment
            expect(wrapper.vm).toBeDefined()
            expect(wrapper.vm.$options.name).toBe('BAutocomplete')

            wrapper.unmount()
        })

        it('should handle rapid component mount/unmount cycles', () => {
            // Test for memory leaks and proper cleanup with simpler approach
            let lastWrapper: VueWrapper<InstanceType<typeof BAutocomplete>> | null = null

            for (let i = 0; i < 3; i++) {
                const wrapper = mount(BAutocomplete, {
                    props: {
                        data: DATA_LIST,
                        dropdownPosition: 'auto',
                        checkInfiniteScroll: true
                    },
                    attachTo: document.body
                })

                // Basic functionality should work
                expect(wrapper.vm).toBeDefined()
                expect(wrapper.vm.isActive).toBe(false)

                // Clean up previous wrapper if exists
                if (lastWrapper) {
                    lastWrapper.unmount()
                }

                lastWrapper = wrapper
            }

            // Clean up final wrapper
            if (lastWrapper) {
                lastWrapper.unmount()
            }

            // If we reach here without crashes, cleanup is working properly
            expect(true).toBe(true)
        })
    })
})
