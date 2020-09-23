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
        expect(wrapper.name()).toBe('BSidebar')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    describe('open', () => {
        beforeEach(() => {
            wrapper.setProps({open: true})
        })

        it('is called', () => {
            expect(wrapper.name()).toBe('BSidebar')
            expect(wrapper.isVueInstance()).toBeTruthy()
        })

        it('render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot()
        })

        it('changes isOpen when open prop is modified', () => {
            wrapper.setProps({open: false})
            expect(wrapper.vm.isOpen).toBeFalsy()
            expect(wrapper.vm.transitionName).toBe('slide-prev')
            wrapper.setProps({open: true})
            expect(wrapper.vm.isOpen).toBeTruthy()
            expect(wrapper.vm.transitionName).toBe('slide-next')
        })

        it('close on cancel', () => {
            wrapper.setProps({canCancel: true})
            wrapper.vm.isOpen = true
            wrapper.vm.close = jest.fn(() => wrapper.vm.close)
            wrapper.vm.cancel('outside')

            wrapper.setProps({canCancel: false})
            wrapper.vm.cancel('outside')

            expect(wrapper.vm.close).toHaveBeenCalledTimes(1)
        })

        it('close on escape', () => {
            wrapper.setProps({open: true})
            wrapper.vm.cancel = jest.fn(() => wrapper.vm.cancel)
            const event = new KeyboardEvent('keyup', {'key': 'Escape'})
            wrapper.vm.keyPress({})
            wrapper.vm.keyPress(event)

            wrapper.setProps({position: 'static'})
            wrapper.vm.keyPress(event)

            expect(wrapper.vm.cancel).toHaveBeenCalledTimes(1)
        })

        it('emit events on close', () => {
            wrapper.vm.close()
            expect(wrapper.emitted()['close']).toBeTruthy()
            expect(wrapper.emitted()['update:open']).toBeTruthy()
        })
    })

    const component = document.createElement('div')
    describe('with a container', () => {
        beforeEach(() => {
            component.appendChild = jest.fn()
            wrapper = shallowMount(BSidebar, {
                propsData: {
                    container: component
                },
                attachToDocument: true
            })
        })

        it('Is called', () => {
            expect(wrapper.name()).toBe('BSidebar')
            expect(wrapper.isVueInstance()).toBeTruthy()
        })
    })

    it('manage the whitelisted items accordingly', async () => {
        let el = wrapper.vm.$refs.sidebarContent
        expect(wrapper.vm.getWhiteList()).toContain(el)

        el = wrapper.vm.$refs.sidebarContent.querySelector('.content')
        expect(wrapper.vm.getWhiteList()).toContain(el)
    })

    it('reset events before destroy', () => {
        document.removeEventListener = jest.fn()

        wrapper.destroy()

        expect(document.removeEventListener).toBeCalledWith('click', expect.any(Function))
        expect(document.removeEventListener).toBeCalledWith('keyup', expect.any(Function))
    })
})
