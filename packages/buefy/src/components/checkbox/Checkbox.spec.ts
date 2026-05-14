import { shallowMount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import BCheckbox from '@components/checkbox/Checkbox.vue'

let wrapper: VueWrapper<InstanceType<typeof BCheckbox>>

describe('BCheckbox', () => {
    beforeEach(() => {
        wrapper = shallowMount(BCheckbox)
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BCheckbox')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('has an input checkbox', () => {
        expect(
            wrapper.find('label input[type=checkbox]').exists()
        ).toBeTruthy()
    })

    it('emit input event with value when value change', async () => {
        await wrapper.setProps({ modelValue: true })
        expect(wrapper.vm.computedValue).toBeTruthy()
        wrapper.vm.computedValue = false
        const valueEmitted = wrapper.emitted()['update:modelValue'][0]
        expect(valueEmitted).toContainEqual(false)
    })

    it('method focus() gives focus to the input element', async () => {
        (wrapper.vm.$refs.input as HTMLElement).focus = vi.fn()
        wrapper.vm.focus()
        await wrapper.vm.$nextTick()
        expect(
            (wrapper.vm.$refs.input as HTMLElement).focus
        ).toHaveBeenCalled()
    })

    it('renders no SVG when unchecked', () => {
        const w = shallowMount(BCheckbox)
        expect(w.find('.check svg').exists()).toBe(false)
    })

    it('renders inline SVG checkmark when checked (boolean modelValue)', async () => {
        const w = shallowMount(BCheckbox, {
            props: { modelValue: true }
        })
        const svg = w.find('.check svg')
        expect(svg.exists()).toBe(true)
        const path = svg.find('path')
        expect(path.attributes('fill')).toBe('currentColor')
        expect(path.attributes('d')).toBeTruthy()
        // Uses the 1x1 normalized viewBox for the checkmark
        expect(svg.attributes('viewBox')).toBe('0 0 1 1')
    })

    it('renders inline SVG checkmark when checked (array modelValue)', async () => {
        const w = shallowMount(BCheckbox, {
            props: { modelValue: ['a', 'b'], nativeValue: 'a' }
        })
        expect(w.find('.check svg').exists()).toBe(true)
    })

    it('renders no SVG when value not in array', () => {
        const w = shallowMount(BCheckbox, {
            props: { modelValue: ['b'], nativeValue: 'a' }
        })
        expect(w.find('.check svg').exists()).toBe(false)
    })

    it('renders indeterminate SVG path when indeterminate prop is true', () => {
        const w = shallowMount(BCheckbox, {
            props: { indeterminate: true }
        })
        const svg = w.find('.check svg')
        expect(svg.exists()).toBe(true)
        // Indeterminate and checkmark paths are different
        const indeterminatePath = w.vm.checkmarkAlias.path
        expect(indeterminatePath).toContain('0.15') // rect-as-path signature
    })

    it('checkmark uses different path for indeterminate vs checked', () => {
        const checked = shallowMount(BCheckbox, { props: { modelValue: true } })
        const indeterminate = shallowMount(BCheckbox, { props: { indeterminate: true } })
        expect(checked.vm.checkmarkAlias.path).not.toBe(indeterminate.vm.checkmarkAlias.path)
    })

    it('SVG color is controlled via currentColor (not embedded in SVG data)', () => {
        // Regression: previously _checkbox.scss embedded SVG colors as data-URIs;
        // color could not be changed at runtime. Now SVG uses fill="currentColor"
        // so the CSS `color` property on the parent drives the icon color.
        const w = shallowMount(BCheckbox, { props: { modelValue: true } })
        const path = w.find('.check svg path')
        expect(path.attributes('fill')).toBe('currentColor')
        // No inline fill color embedded in the path data
        expect(path.attributes('d')).not.toContain('fill:')
    })
})
