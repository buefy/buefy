import { shallowMount } from '@vue/test-utils'
import BSidebar from '@components/sidebar/Sidebar'

let wrapper

describe('BSidebar', () => {
    beforeEach(() => {
        wrapper = shallowMount(BSidebar)
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

        it('Is called', () => {
            expect(wrapper.name()).toBe('BSidebar')
            expect(wrapper.isVueInstance()).toBeTruthy()
        })

        it('render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot()
        })

        it('changes isOpen when open prop is modified', () => {
            wrapper.setProps({open: false})
            expect(wrapper.vm.isOpen).toBeFalsy()
            wrapper.setProps({open: true})
            expect(wrapper.vm.isOpen).toBeTruthy()
        })

        it('close on cancel', (done) => {
            wrapper.setProps({canCancel: true})
            wrapper.vm.isOpen = true
            wrapper.vm.close = jest.fn()
            wrapper.vm.cancel('outside')
            wrapper.vm.$nextTick(() => {
                expect(wrapper.vm.close).toHaveBeenCalled()
                done()
            })
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
})
