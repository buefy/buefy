import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
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

    it('generates svg checkmark images from concrete colors in checkbox styles', () => {
        const scssPathCandidates = [
            join(process.cwd(), 'src/scss/components/_checkbox.scss'),
            join(process.cwd(), 'buefy/src/scss/components/_checkbox.scss')
        ]
        const scssPath = scssPathCandidates.find((candidate) =>
            existsSync(candidate)
        )

        expect(scssPath).toBeTruthy()
        if (!scssPath) {
            throw new Error(
                'Unable to locate _checkbox.scss for regression assertion'
            )
        }
        const source = readFileSync(scssPath, 'utf8')

        // Regression: CSS variables inside data-uri SVG are not resolved by browsers.
        expect(source).toContain('fn.checkmark($checkbox-checkmark-color)')
        expect(source).toContain('fn.indeterminate($checkbox-checkmark-color)')
        expect(source).not.toContain(
            'fn.checkmark(cv.getVar("checkbox-checkmark-color"))'
        )
        expect(source).not.toContain(
            'fn.indeterminate(cv.getVar("checkbox-checkmark-color"))'
        )
    })
})
