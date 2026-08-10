import { defineComponent } from 'vue'
import { shallowMount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import FormElementMixin, { useFormElementMixin } from '@utils/FormElementMixin'

describe('FormElementMixin', () => {
    HTMLElement.prototype.insertAdjacentElement = vi.fn()

    const component = defineComponent({
        mixins: [FormElementMixin],
        template: '<div class="b-component"></div>'
    })
    let wrapper: VueWrapper<InstanceType<typeof component>>

    beforeEach(() => {
        wrapper = shallowMount(component, {
            attachTo: document.body
        })
    })

    it('is valid as default', () => {
        expect(wrapper.vm.isValid).toBeTruthy()
    })

    it('should set isFocused and emit focus event on onFocus', async () => {
        wrapper.vm.onFocus(new FocusEvent('focus'))
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.isFocused).toBeTruthy()
        expect(wrapper.emitted().focus).toBeTruthy()
    })

    it('should reset isFocused and emit blur event on onBlur', async () => {
        wrapper.vm.checkHtml5Validity = vi.fn()
        wrapper.vm.onBlur(new FocusEvent('blur'))
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.isFocused).toBeFalsy()
        expect(wrapper.emitted().blur).toBeTruthy()
        expect(wrapper.vm.checkHtml5Validity).toHaveBeenCalled()
    })

    it('should match icon size to field size for is-small and is-medium', async () => {
        await wrapper.setProps({ size: 'is-small' })
        expect(wrapper.vm.iconSize).toBe('is-small')

        await wrapper.setProps({ size: 'is-medium' })
        expect(wrapper.vm.iconSize).toBe('is-medium')
    })

    // https://github.com/buefy/buefy/issues/4187
    it('narrows getElement() to the given type parameter instead of the full element union', () => {
        const narrowedComponent = defineComponent({
            mixins: [useFormElementMixin<HTMLInputElement>()],
            template: '<div class="b-component"></div>'
        })
        const narrowedWrapper = shallowMount(narrowedComponent, {
            attachTo: document.body
        })

        // Type-only assertion: if `useFormElementMixin` stopped narrowing the
        // return type of `getElement()`, this would fail to type-check because
        // the full ConstraintValidationElement union isn't assignable to
        // `HTMLInputElement | undefined`.
        const element: HTMLInputElement | undefined = narrowedWrapper.vm.getElement()
        expect(element).toBeUndefined()
    })
})
