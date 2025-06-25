import { defineComponent } from 'vue'
import { shallowMount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import FormElementMixin from '@utils/FormElementMixin'

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
})
