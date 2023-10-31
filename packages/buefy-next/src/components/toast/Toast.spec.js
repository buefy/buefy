import { transformVNodeArgs } from 'vue'
import { shallowMount } from '@vue/test-utils'
import { BToast, ToastProgrammatic } from '@components/toast'

let wrapper

describe('BToast', () => {
    HTMLElement.prototype.insertAdjacentElement = jest.fn()
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
            jest.useRealTimers()
        })

        it('should close after the duration', () => {
            jest.useFakeTimers()
            const params = {
                message: 'message',
                duration: 1000,
                onClose: jest.fn()
            }
            new ToastProgrammatic().open(params)
            jest.advanceTimersByTime(500)
            expect(params.onClose).not.toHaveBeenCalled()
            jest.advanceTimersByTime(500)
            expect(params.onClose).toHaveBeenCalled()
        })

        it('indefinitely should be able to be manually closed', () => {
            jest.useFakeTimers()
            const params = {
                message: 'message',
                indefinite: true,
                onClose: jest.fn()
            }
            const toast = new ToastProgrammatic().open(params)
            jest.advanceTimersByTime(10000)
            expect(params.onClose).not.toHaveBeenCalled()
            toast.close()
            expect(params.onClose).toHaveBeenCalled()
        })
    })
})
