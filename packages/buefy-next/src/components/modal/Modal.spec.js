import { transformVNodeArgs } from 'vue'
import { shallowMount } from '@vue/test-utils'
import { BModal, ModalProgrammatic } from '@components/modal'
import config, { setOptions } from '@utils/config'

let wrapper

describe('BModal', () => {
    beforeEach(() => {
        wrapper = shallowMount(BModal, {
            props: {
                modelValue: true
            },
            global: {
                stubs: {
                    // intentionally stubs transition component
                    // to avoid potentially flaky snapshots
                    transition: true
                }
            }
        })
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BModal')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('manage props validator', () => {
        const ariaRole = wrapper.vm.$options.props.ariaRole
        const ariaLabel = wrapper.vm.$options.props.ariaLabel

        expect(ariaRole.type).toBe(String)
        expect(ariaRole.validator && ariaRole.validator('d')).toBeFalsy()
        expect(ariaRole.validator && ariaRole.validator('dialog')).toBeTruthy()
        expect(ariaRole.validator && ariaRole.validator('alertdialog')).toBeTruthy()
        expect(ariaLabel.type).toBe(String)
        expect(ariaLabel.validator && ariaLabel.validator('')).toBeFalsy()
        expect(ariaLabel.validator && ariaLabel.validator('d')).toBeTruthy()
    })

    it('manage default config props values', () => {
        setOptions(Object.assign(config, {
            defaultModalScroll: 'keep'
        }))
        wrapper = shallowMount(BModal)

        expect(wrapper.vm.scroll).toEqual(config.defaultModalScroll)
    })

    it('sets isActive when active (modelValue) prop is changed', async () => {
        await wrapper.setProps({ modelValue: false })
        expect(wrapper.vm.isActive).toBeFalsy()
    })

    it('manage cancel options', async () => {
        await wrapper.setProps({ canCancel: true })
        expect(wrapper.vm.cancelOptions).toEqual(config.defaultModalCanCancel)

        await wrapper.setProps({ canCancel: false })
        expect(wrapper.vm.cancelOptions).toEqual([])

        const options = ['escape']
        await wrapper.setProps({ canCancel: options })
        expect(wrapper.vm.cancelOptions).toEqual(options)

        wrapper.vm.close = jest.fn(() => wrapper.vm.close)
        wrapper.vm.cancel()
        wrapper.vm.cancel('escape')
        expect(wrapper.vm.close).toHaveBeenCalledTimes(1)
    })

    it('close on escape', async () => {
        await wrapper.setProps({ canCancel: true })
        await wrapper.setProps({ modalValue: true })
        wrapper.vm.cancel = jest.fn(() => wrapper.vm.cancel)
        const event = new KeyboardEvent('keyup', { key: 'Escape' })
        wrapper.vm.keyPress({})
        wrapper.vm.keyPress(event)
        expect(wrapper.vm.cancel).toHaveBeenCalledTimes(1)
    })

    it('emit events on close but stay active', () => {
        wrapper.vm.close()
        expect(wrapper.emitted().close).toBeTruthy()
        expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
        expect(wrapper.vm.isActive).toBeTruthy()
    })

    it('should be deactivated on close if programmatic', async () => {
        await wrapper.setProps({ programmatic: true })
        wrapper.vm.close()
        expect(wrapper.vm.isActive).toBeFalsy()
    })

    describe('programmatically opened', () => {
        beforeEach(() => {
            // resets stubs introduced by @vue/test-utils
            // otherwise, every BModal becomes a stub
            transformVNodeArgs()
        })

        it('should be able to be manually closed', async () => {
            const modal = new ModalProgrammatic().open({
                content: 'content'
            })
            await modal.$nextTick() // makes sure DOM is updated
            expect(document.querySelector('.modal')).toBeTruthy()
            jest.useFakeTimers()
            modal.close()
            jest.advanceTimersByTime(150)
            expect(document.querySelector('.modal')).toBeFalsy()
            jest.useRealTimers()
        })
    })

    it('emit event on transition after-enter hook.', () => {
        wrapper.vm.afterEnter()
        expect(wrapper.emitted()['after-enter']).toBeTruthy()
    })

    it('emit event on transition after-leave hook.', () => {
        wrapper.vm.afterLeave()
        expect(wrapper.emitted()['after-leave']).toBeTruthy()
    })

    it('should not be rendered on mounted if active and renderOnMounted are false', () => {
        const wrapper = shallowMount(BModal, {
            props: {
                modelValue: false,
                renderOnMounted: false
            },
            global: {
                stubs: {
                    transition: false
                }
            }
        })
        expect(wrapper.find('.modal.is-active').exists()).toBeFalsy()
    })

    it('should be rendered on mounted if active is false but renderOnMounted is true', () => {
        const wrapper = shallowMount(BModal, {
            props: {
                modelValue: false,
                renderOnMounted: true
            },
            global: {
                stubs: {
                    transition: false
                }
            }
        })
        expect(wrapper.find('.modal.is-active').exists()).toBeTruthy()
    })
})
