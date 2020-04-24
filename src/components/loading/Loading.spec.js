import { shallowMount } from '@vue/test-utils'
import BLoading from '@components/loading/Loading'

let wrapper

describe('BLoading', () => {
    beforeEach(() => {
        wrapper = shallowMount(BLoading, {
            stubs: {
                transition: false
            }
        })
    })

    it('is inactive initially', () => {
        expect(wrapper.vm.isActive).toBeFalsy()
    })

    describe('active', () => {
        beforeEach(() => {
            wrapper.setProps({active: true})
        })

        it('Is called', () => {
            expect(wrapper.name()).toBe('BLoading')
            expect(wrapper.isVueInstance()).toBeTruthy()
        })

        it('render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot()
        })

        it('changes isActive when active prop is modified', () => {
            wrapper.setProps({active: false})
            expect(wrapper.vm.isActive).toBeFalsy()
            wrapper.setProps({active: true})
            expect(wrapper.vm.isActive).toBeTruthy()
        })

        it('close on cancel', (done) => {
            wrapper.setProps({canCancel: true})
            wrapper.vm.isActive = true
            wrapper.vm.close = jest.fn()
            wrapper.vm.cancel()
            wrapper.vm.$nextTick(() => {
                expect(wrapper.vm.close).toHaveBeenCalled()
                done()
            })
        })

        it('close on escape', () => {
            wrapper.vm.isActive = true
            wrapper.vm.cancel = jest.fn(() => wrapper.vm.cancel)
            const event = new KeyboardEvent('keyup', {'key': 'Escape'})
            wrapper.vm.keyPress({})
            wrapper.vm.keyPress(event)
            expect(wrapper.vm.cancel).toHaveBeenCalledTimes(1)
        })

        it('emit events on close', () => {
            wrapper.vm.close()
            expect(wrapper.emitted()['close']).toBeTruthy()
            expect(wrapper.emitted()['update:active']).toBeTruthy()
        })
    })

    describe('programmatic without container', () => {
        beforeEach(() => {
            window.document.body.appendChild = jest.fn()
            wrapper = shallowMount(BLoading, {
                propsData: {
                    programmatic: true
                },
                stubs: {
                    transition: false
                },
                attachToDocument: true
            })
        })

        it('Is called', () => {
            expect(wrapper.name()).toBe('BLoading')
            expect(wrapper.isVueInstance()).toBeTruthy()
            expect(window.document.body.appendChild).toHaveBeenCalled()
        })

        it('manage close', () => {
            jest.useFakeTimers()

            wrapper.vm.$destroy = jest.fn(() => wrapper.vm.$destroy)
            wrapper.vm.close()

            expect(wrapper.vm.isActive).toBeFalsy()
            expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 150)
            jest.advanceTimersByTime(150)
            expect(wrapper.vm.$destroy).toHaveBeenCalled()
        })
    })

    const component = document.createElement('div')
    describe('programmatic with a container', () => {
        beforeEach(() => {
            component.appendChild = jest.fn()
            wrapper = shallowMount(BLoading, {
                propsData: {
                    programmatic: true,
                    container: component
                },
                stubs: {
                    transition: false
                },
                attachToDocument: true
            })
        })

        it('Is called', () => {
            expect(wrapper.name()).toBe('BLoading')
            expect(wrapper.isVueInstance()).toBeTruthy()
            expect(component.appendChild).toHaveBeenCalled()
        })

        it('Is not full page', () => {
            expect(wrapper.vm.displayInFullPage).toBeFalsy()
        })
    })
})
