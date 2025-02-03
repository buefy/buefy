import { h } from 'vue'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BSlotComponent from '@utils/SlotComponent'

describe('BSlotComponent', () => {
    const MockComponent = {
        render: () => h('div', {}, 'Hello!')
    }

    it('is called', () => {
        const wrapper = shallowMount(BSlotComponent, {
            props: {
                component: {}
            }
        })

        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BSlotComponent')
    })

    it('default render', () => {
        const slot = '<span>Content</span>'
        const Component = shallowMount(MockComponent, {
            slots: {
                default: slot
            }
        })
        const wrapper = shallowMount(BSlotComponent, {
            props: {
                component: Component.vm
            }
        })
        expect(wrapper.html()).toBe(`<div>${slot}</div>`)
    })

    it('render', () => {
        const slot = '<span>Content</span>'
        const slotName = 'header'
        const Component = shallowMount(MockComponent, {
            slots: {
                [slotName]: slot
            }
        })
        const tag = 'span'
        const wrapper = shallowMount(BSlotComponent, {
            props: {
                component: Component.vm,
                tag,
                name: slotName
            }
        })
        expect(wrapper.html()).toBe(`<${tag}>${slot}</${tag}>`)
    })
})
