import { shallowMount } from '@vue/test-utils'
import BNavbarItem from '@components/navbar/NavbarItem.vue'
import sinon from 'sinon'

let wrapper

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
})
