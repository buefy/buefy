import { transformVNodeArgs } from 'vue'
import { shallowMount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { BToast, ToastProgrammatic } from '@components/toast'

let wrapper: VueWrapper<InstanceType<typeof BToast>>

describe('BToast', () => {
    HTMLElement.prototype.insertAdjacentElement = vi.fn()
    beforeEach(() => {
        wrapper = shallowMount(
            BToast,
            {
                global: {
                    stubs: {
                        // intentionally stubs transition
                        // to avoid flaky snapshots
                        transition: true
                    }
                }
            }
        )
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BToast')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    describe('programmatically opened', () => {
        beforeEach(() => {
            // resets stubs introduced by @vue/test-utils
            // otherwise, every BToast is replaced with a stub
            transformVNodeArgs(undefined)
        })

        afterEach(() => {
            vi.useRealTimers()
        })

        it('should close after the duration', () => {
            vi.useFakeTimers()
            const params = {
                message: 'message',
                duration: 1000,
                onClose: vi.fn()
            }
            new ToastProgrammatic().open(params)
            vi.advanceTimersByTime(500)
            expect(params.onClose).not.toHaveBeenCalled()
            vi.advanceTimersByTime(500)
            expect(params.onClose).toHaveBeenCalled()
        })

        it('indefinitely should be able to be manually closed', () => {
            vi.useFakeTimers()
            const params = {
                message: 'message',
                indefinite: true,
                onClose: vi.fn()
            }
            const toast = new ToastProgrammatic().open(params)
            vi.advanceTimersByTime(10000)
            expect(params.onClose).not.toHaveBeenCalled()
            toast.close()
            expect(params.onClose).toHaveBeenCalled()
        })
    })
})
