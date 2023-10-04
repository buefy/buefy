import { mount, shallowMount } from '@vue/test-utils'
import BNavbarItem from '@components/navbar/NavbarItem'

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
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BNavbarItem')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('correctly renders the provided tag', async () => {
        await wrapper.setProps({ tag })
        expect(wrapper.find(tag).exists()).toBeTruthy()
    })

    it('emit event from tag and out', async () => {
        const testStub = jest.fn()

        const emitWrap = shallowMount(BNavbarItem, {
            props: {
                onTest_event: testStub
            },
            slots: {
                default: '<div class="test_inner"/>'
            }
        })

        const inner = emitWrap.find('div.test_inner')
        expect(inner).toBeTruthy()

        await inner.trigger('test_event')
        expect(testStub).toHaveBeenCalled()
    })

    it('close on escape', () => {
        wrapper = mount(stubBNavBar, {
            slots: {
                default: BNavbarItem
            }
        }).findComponent(BNavbarItem)
        wrapper.vm.$parent.closeMenu = jest.fn()
        const event = new KeyboardEvent('keyup', { key: 'Escape' })
        wrapper.vm.keyPress({})
        wrapper.vm.keyPress(event)
        expect(wrapper.vm.$parent.closeMenu).toHaveBeenCalledTimes(1)
    })

    it('manage click as expected', () => {
        wrapper = mount(stubBNavBar, {
            slots: {
                default: BNavbarItem
            }
        }).findComponent(BNavbarItem)
        wrapper.vm.$parent.closeMenu = jest.fn()
        const event = new MouseEvent('click')
        wrapper.vm.handleClickEvent({
            ...event,
            target: { localName: 'a' }
        })
        expect(wrapper.vm.$parent.closeMenu).toHaveBeenCalledTimes(1)
    })
})
