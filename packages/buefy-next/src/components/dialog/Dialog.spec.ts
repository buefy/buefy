import { shallowMount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import BDialog from '@components/dialog/Dialog.vue'
import config, { setOptions } from '@utils/config'

let wrapper: VueWrapper<InstanceType<typeof BDialog>>

describe('BDialog', () => {
    HTMLElement.prototype.focus = vi.fn()
    beforeEach(() => {
        wrapper = shallowMount(BDialog, {
            attachTo: document.body
        })
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BDialog')
    })

    it('gives focus to the input element if it contains one', async () => {
        await wrapper.setProps({ hasInput: true })
        expect((wrapper.vm.$refs.input as HTMLInputElement).focus).toHaveBeenCalled()
    })

    it('manage default config props values', () => {
        setOptions(Object.assign(config, {
            defaultDialogConfirmText: 'foo',
            defaultDialogCancelText: 'bar'
        }))
        wrapper = shallowMount(BDialog)

        expect(wrapper.vm.confirmText).toEqual(config.defaultDialogConfirmText)
        expect(wrapper.vm.cancelText).toEqual(config.defaultDialogCancelText)
    })

    it('manage props validator', () => {
        const ariaRole = wrapper.vm.$options.props.ariaRole

        expect(ariaRole.type).toBe(String)
        expect(ariaRole.validator && ariaRole.validator('d')).toBeFalsy()
        expect(ariaRole.validator && ariaRole.validator('dialog')).toBeTruthy()
        expect(ariaRole.validator && ariaRole.validator('alertdialog')).toBeTruthy()
    })

    it('manage icons', async () => {
        await wrapper.setProps({ type: 'is-info' })
        expect(wrapper.vm.iconByType).toBe('information')

        await wrapper.setProps({ type: 'is-success' })
        expect(wrapper.vm.iconByType).toBe('check-circle')

        await wrapper.setProps({ type: 'is-warning' })
        expect(wrapper.vm.iconByType).toBe('alert')

        await wrapper.setProps({ type: 'is-danger' })
        expect(wrapper.vm.iconByType).toBe('alert-circle')

        await wrapper.setProps({ type: 'is-primary' })
        expect(wrapper.vm.iconByType).toBeNull()
    })

    it('close on confirm', async () => {
        await wrapper.setProps({ confirmCallback: vi.fn() })
        wrapper.vm.confirm()
        expect(wrapper.vm.isActive).toBeFalsy()
        expect(wrapper.vm.confirmCallback).toHaveBeenCalled()
        expect(wrapper.emitted<string[]>().confirm[0][0]).toEqual('')
    })

    it('async confirm and keep Loading state', async () => {
        await wrapper.setProps({
            confirmCallback: vi.fn((confirmValue, { startLoading }) => {
                startLoading()
                expect(wrapper.vm.isLoading).toBeTruthy()
            }),
            closeOnConfirm: false
        })
        expect(wrapper.vm.isLoading).toBeFalsy()
        wrapper.vm.confirm()
        expect(wrapper.vm.isLoading).toBeTruthy()
        expect(wrapper.vm.confirmCallback).toHaveBeenCalled()
    })

    it('async confirm and close Loading state', async () => {
        await wrapper.setProps({
            confirmCallback: vi.fn((confirmValue, { startLoading, cancelLoading }) => {
                startLoading()
                expect(wrapper.vm.isLoading).toBeTruthy()
                cancelLoading()
            }),
            closeOnConfirm: false
        })
        expect(wrapper.vm.isLoading).toBeFalsy()
        wrapper.vm.confirm()
        expect(wrapper.vm.isLoading).toBeFalsy()
        expect(wrapper.vm.confirmCallback).toHaveBeenCalled()
    })

    it('closeOnConfirm prop equals false', async () => {
        await wrapper.setProps({ confirmCallback: vi.fn(), closeOnConfirm: false })
        wrapper.vm.confirm()
        expect(wrapper.vm.isActive).toBeTruthy()
        expect(wrapper.vm.confirmCallback).toHaveBeenCalled()
        expect(wrapper.emitted<string[]>().confirm[0][0]).toEqual('')
    })
})
