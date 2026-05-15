import { transformVNodeArgs } from 'vue'
import { shallowMount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import BSnackbar from '@components/snackbar/Snackbar.vue'
import { SnackbarProgrammatic } from '@components/snackbar'
import config, { setOptions } from '@utils/config'

let wrapper: VueWrapper<InstanceType<typeof BSnackbar>>
const realInsertAdjacentElement = HTMLElement.prototype.insertAdjacentElement

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

    describe('programmatically opened', () => {
        const savedNoticeQueue = config.defaultNoticeQueue

        beforeEach(() => {
            transformVNodeArgs(undefined)
            HTMLElement.prototype.insertAdjacentElement = realInsertAdjacentElement
        })

        afterEach(() => {
            HTMLElement.prototype.insertAdjacentElement = vi.fn()
            setOptions(Object.assign(config, { defaultNoticeQueue: savedNoticeQueue }))
            document.querySelectorAll('.notices').forEach((el) => el.remove())
        })

        it('should not dismiss existing snackbar when queue is disabled globally', () => {
            setOptions(Object.assign(config, { defaultNoticeQueue: false }))

            new SnackbarProgrammatic().open({ message: 'first', indefinite: true })
            const parent = document.querySelector('body > .notices.is-bottom')!
            expect(parent.childElementCount).toBe(1)

            new SnackbarProgrammatic().open({ message: 'second', indefinite: true })
            expect(parent.childElementCount).toBe(2)
        })

        it('should dismiss existing snackbar when queue is enabled', () => {
            setOptions(Object.assign(config, { defaultNoticeQueue: true }))

            new SnackbarProgrammatic().open({ message: 'first', indefinite: true })
            const parent = document.querySelector('body > .notices.is-bottom')!
            expect(parent.childElementCount).toBe(1)

            new SnackbarProgrammatic().open({ message: 'second', indefinite: true })
            expect(parent.childElementCount).toBe(1)
        })

        it('explicit queue param should override the global config', () => {
            setOptions(Object.assign(config, { defaultNoticeQueue: false }))

            new SnackbarProgrammatic().open({ message: 'first', indefinite: true })
            const parent = document.querySelector('body > .notices.is-bottom')!
            expect(parent.childElementCount).toBe(1)

            new SnackbarProgrammatic().open({ message: 'second', indefinite: true, queue: true })
            expect(parent.childElementCount).toBe(1)
        })
    })
})
