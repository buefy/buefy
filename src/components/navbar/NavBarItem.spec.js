import { shallowMount } from '@vue/test-utils'
import BNavbarItem from '@components/navbar/NavbarItem.vue'
import sinon from 'sinon'

let wrapper

const stubBNavBar = {
    data() {
        return {
            _isNavBar: true
        }
    },
    template: `
        <div>
            <slot />
        </div>`
}

describe('BNavbarItem', () => {
    const tag = 'div'
    beforeEach(() => {
        wrapper = shallowMount(BNavbarItem)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BNavbarItem')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('correctly renders the provided tag', () => {
        wrapper.setProps({tag})
        expect(wrapper.contains(tag)).toBeTruthy()
    })

    it('emit event from tag and out', () => {
        let testStub = sinon.stub()

        let emitWrap = shallowMount(BNavbarItem, {
            listeners: {
                test_event: testStub
            },
            slots: {
                default: '<div class="test_inner"/>'
            }
        })

        let inner = emitWrap.find('.test_inner')

        expect(inner.name()).toBe('div')
        inner.trigger('test_event')
        expect(testStub.called).toBe(true)
    })

    it('close on escape', () => {
        wrapper = shallowMount(BNavbarItem, {
            parentComponent: stubBNavBar
        })
        wrapper.vm.$parent.closeMenu = jest.fn()
        const event = new KeyboardEvent('keyup', {'key': 'Escape'})
        wrapper.vm.keyPress({})
        wrapper.vm.keyPress(event)
        expect(wrapper.vm.$parent.closeMenu).toHaveBeenCalledTimes(1)
    })

    it('manage click as expected', () => {
        wrapper = shallowMount(BNavbarItem, {
            parentComponent: stubBNavBar
        })
        wrapper.vm.$parent.closeMenu = jest.fn()
        const event = new KeyboardEvent('click')
        wrapper.vm.handleClickEvent({
            ...event,
            target: { localName: 'a' }
        })
        expect(wrapper.vm.$parent.closeMenu).toHaveBeenCalledTimes(1)
    })
})
