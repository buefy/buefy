import { transformVNodeArgs } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { Mock, MockInstance } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { BLoading, LoadingProgrammatic } from '@components/loading'

type LoadingProgrammaticInstance = ReturnType<typeof LoadingProgrammatic.prototype.open>

let wrapper: VueWrapper<InstanceType<typeof BLoading>>

describe('BLoading', () => {
    beforeEach(() => {
        wrapper = shallowMount(BLoading)
    })

    it('is inactive initially', () => {
        expect(wrapper.vm.isActive).toBeFalsy()
    })

    describe('active', () => {
        beforeEach(() => {
            wrapper.setProps({ modelValue: true })
        })

        it('Is called', () => {
            expect(wrapper.vm).toBeTruthy()
            expect(wrapper.vm.$options.name).toBe('BLoading')
        })

        it('render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot()
        })

        it('changes isActive when active prop is modified', async () => {
            await wrapper.setProps({ modelValue: false })
            expect(wrapper.vm.isActive).toBeFalsy()
            await wrapper.setProps({ modelValue: true })
            expect(wrapper.vm.isActive).toBeTruthy()
        })

        it('close on cancel', async () => {
            await wrapper.setProps({ canCancel: true })
            await wrapper.setData({ isActive: true })
            wrapper.vm.close = vi.fn()
            wrapper.vm.cancel()
            await wrapper.vm.$nextTick()
            expect(wrapper.vm.close).toHaveBeenCalled()
        })

        it('close on escape', async () => {
            await wrapper.setData({ isActive: true })
            wrapper.vm.cancel = vi.fn(() => wrapper.vm.cancel)
            const event = new KeyboardEvent('keyup', { key: 'Escape' })
            wrapper.vm.keyPress({} as KeyboardEvent)
            wrapper.vm.keyPress(event)
            expect(wrapper.vm.cancel).toHaveBeenCalledTimes(1)
        })

        it('emit events on close', () => {
            wrapper.vm.close()
            expect(wrapper.emitted().close).toBeTruthy()
            expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
        })
    })

    describe('programmatic without container', () => {
        let loading: LoadingProgrammaticInstance
        let onClose: Mock
        let spyOnAppendChild: MockInstance

        beforeEach(async () => {
            // resets stubs introduced by @vue/test-utils
            // otherwise, every BLoading becomes a stub
            transformVNodeArgs()

            onClose = vi.fn()
            spyOnAppendChild = vi.spyOn(window.document.body, 'appendChild')
            loading = new LoadingProgrammatic().open({ onClose })
            await loading.$nextTick() // makes sure DOM is updated
        })

        afterEach(() => {
            spyOnAppendChild.mockRestore()
            vi.useFakeTimers()
            loading.close()
            // subsequent tests will fail unless we wait for the timeout
            vi.advanceTimersByTime(150)
            vi.useRealTimers()
        })

        it('Is called', () => {
            expect(spyOnAppendChild).toHaveBeenCalled()
            expect(window.document.querySelector('.loading-overlay')).toBeTruthy()
        })

        it('Is full page', () => {
            expect(window.document.querySelector('.is-full-page')).toBeTruthy()
        })

        it('manage close', async () => {
            vi.useFakeTimers()
            vi.spyOn(global, 'setTimeout')

            loading.close()
            expect(onClose).toHaveBeenCalled()
            expect(window.document.querySelector('.loading-overlay')).toBeTruthy()
            expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 150)

            vi.advanceTimersByTime(150)
            expect(window.document.querySelector('.loading-overlay')).toBeFalsy()
        })
    })

    describe('programmatic with a container', () => {
        let loading: LoadingProgrammaticInstance
        let container: HTMLElement
        let spyOnAppendChild: MockInstance

        beforeEach(async () => {
            // resets stubs introduced by @vue/test-utils
            // otherwise, every BLoading becomes a stub
            transformVNodeArgs()

            container = document.createElement('div')
            spyOnAppendChild = vi.spyOn(container, 'appendChild')
            loading = new LoadingProgrammatic().open({
                container
            })
            await loading.$nextTick() // makes sure DOM is updated
        })

        afterEach(() => {
            spyOnAppendChild.mockRestore()
            vi.useFakeTimers()
            loading.close()
            // subsequent tests may fail unless we wait for the timeout
            vi.advanceTimersByTime(150)
            vi.useRealTimers()
        })

        it('Is called', () => {
            expect(container.querySelector('.loading-overlay')).toBeTruthy()
            expect(spyOnAppendChild).toHaveBeenCalled()
        })

        it('Is not full page', () => {
            expect(container.querySelector('.is-full-page')).toBeFalsy()
        })
    })
})
