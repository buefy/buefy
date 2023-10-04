import { shallowMount } from '@vue/test-utils'
import BSidebar from '@components/sidebar/Sidebar'

let wrapper

describe('BSidebar', () => {
    beforeEach(() => {
        wrapper = shallowMount(BSidebar, {
            slots: {
                default: '<div class="content"></div>'
            }
        })
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BSidebar')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    describe('open', () => {
        beforeEach(() => {
            wrapper.setProps({ modelValue: true })
        })

        it('is called', () => {
            expect(wrapper.vm).toBeTruthy()
            expect(wrapper.vm.$options.name).toBe('BSidebar')
        })

        it('render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot()
        })

        it('changes isOpen when open prop is modified', async () => {
            await wrapper.setProps({ modelValue: false })
            expect(wrapper.vm.isOpen).toBeFalsy()
            expect(wrapper.vm.transitionName).toBe('slide-prev')
            await wrapper.setProps({ modelValue: true })
            expect(wrapper.vm.isOpen).toBeTruthy()
            expect(wrapper.vm.transitionName).toBe('slide-next')
        })

        it('close on cancel', async () => {
            await wrapper.setProps({ canCancel: true })
            wrapper.vm.isOpen = true
            wrapper.vm.close = jest.fn(() => wrapper.vm.close)
            wrapper.vm.cancel('outside')

            await wrapper.setProps({ canCancel: false })
            wrapper.vm.cancel('outside')

            expect(wrapper.vm.close).toHaveBeenCalledTimes(1)
        })

        it('close on escape', async () => {
            await wrapper.setProps({ modelValue: true })
            wrapper.vm.cancel = jest.fn(() => wrapper.vm.cancel)
            const event = new KeyboardEvent('keyup', { key: 'Escape' })
            wrapper.vm.keyPress({})
            wrapper.vm.keyPress(event)

            await wrapper.setProps({ position: 'static' })
            wrapper.vm.keyPress(event)

            expect(wrapper.vm.cancel).toHaveBeenCalledTimes(1)
        })

        it('emit events on close', () => {
            wrapper.vm.close()
            expect(wrapper.emitted().close).toBeTruthy()
            expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
        })
    })

    const component = document.createElement('div')
    describe('with a container', () => {
        beforeEach(() => {
            component.appendChild = jest.fn()
            wrapper = shallowMount(BSidebar, {
                props: {
                    container: component
                },
                attachTo: document.body
            })
        })

        it('Is called', () => {
            expect(wrapper.vm).toBeTruthy()
            expect(wrapper.vm.$options.name).toBe('BSidebar')
        })
    })

    it('reset events before destroy', () => {
        document.removeEventListener = jest.fn()

        wrapper.unmount()

        expect(document.removeEventListener).toBeCalledWith('click', expect.any(Function))
        expect(document.removeEventListener).toBeCalledWith('keyup', expect.any(Function))
    })
})
