import { shallowMount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import BSnackbar from '@components/snackbar/Snackbar.vue'

let wrapper: VueWrapper<InstanceType<typeof BSnackbar>>

describe('BSnackbar', () => {
    HTMLElement.prototype.insertAdjacentElement = vi.fn()
    beforeEach(() => {
        wrapper = shallowMount(BSnackbar, {
            attachTo: document.body,
            props: {
                onAction: vi.fn()
            }
        })
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BSnackbar')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('calls the action listener and close on action', async () => {
        wrapper.vm.close = vi.fn()
        wrapper.vm.action()
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.onAction).toHaveBeenCalled()
        expect(wrapper.vm.close).toHaveBeenCalled()
    })
})
