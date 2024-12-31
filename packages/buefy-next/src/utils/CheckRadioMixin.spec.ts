import { defineComponent } from 'vue'
import { shallowMount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import CheckRadioMixin from '@utils/CheckRadioMixin'

describe('CheckRadioMixin', () => {
    HTMLElement.prototype.insertAdjacentElement = vi.fn()

    const component = defineComponent({
        mixins: [CheckRadioMixin],
        template: '<div class="b-component"></div>'
    })
    let wrapper: VueWrapper<InstanceType<typeof component>>

    beforeEach(() => {
        wrapper = shallowMount(component, {
            attachTo: document.body
        })
    })

    it('set value prop', async () => {
        await wrapper.setProps({
            modelValue: 'test'
        })
        expect(wrapper.vm.newValue).toEqual('test')
    })
})
