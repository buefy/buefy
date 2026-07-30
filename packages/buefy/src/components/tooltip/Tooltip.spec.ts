import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { MockInstance } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import BTooltip from '@components/tooltip/Tooltip.vue'

let wrapper: VueWrapper<InstanceType<typeof BTooltip>>

describe('BTooltip', () => {
    let spyOnOnHover: MockInstance
    let spyOnOnContextMenu: MockInstance
    let spyOnOnFocus: MockInstance
    let spyOnOpen: MockInstance
    let spyOnUpdateAppendToBody: MockInstance

    beforeEach(() => {
        // spies on methods before mounting the component
        // because wrapper.vm does not allow spies
        spyOnOnHover = vi.spyOn(BTooltip.methods!, 'onHover')
        spyOnOnContextMenu = vi.spyOn(BTooltip.methods!, 'onContextMenu')
        spyOnOnFocus = vi.spyOn(BTooltip.methods!, 'onFocus')
        spyOnOpen = vi.spyOn(BTooltip.methods!, 'open')
        spyOnUpdateAppendToBody = vi.spyOn(BTooltip.methods!, 'updateAppendToBody')
        wrapper = shallowMount(BTooltip)
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BTooltip')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('tests isActive watch', async () => {
        await wrapper.setProps({ appendToBody: true })
        spyOnUpdateAppendToBody.mockClear()
        await wrapper.setData({ isActive: true })
        expect(spyOnUpdateAppendToBody).toHaveBeenCalled()
        expect(wrapper.emitted().open).toBeTruthy()
    })

    it('tests onHover method', async () => {
        await wrapper.setProps({ triggers: ['hover'] })
        wrapper.vm.onHover()
        expect(spyOnOnHover).toHaveBeenCalled()
        expect(spyOnOpen).toHaveBeenCalled()
    })

    it('tests onContextMenu method', async () => {
        await wrapper.setProps({ triggers: ['contextmenu'] })
        wrapper.vm.onContextMenu({ preventDefault: vi.fn() })
        expect(spyOnOnContextMenu).toHaveBeenCalled()
        expect(spyOnOpen).toHaveBeenCalled()
    })

    it('tests onFocus method', async () => {
        await wrapper.setProps({ triggers: ['focus'] })
        wrapper.vm.onFocus()
        expect(spyOnOnFocus).toHaveBeenCalled()
        expect(spyOnOpen).toHaveBeenCalled()
    })

    it('handles appendToBody prop changes', async () => {
        const bodyWrapper = mount(BTooltip, {
            props: { label: 'Tooltip text', appendToBody: false },
            slots: { default: '<button>Trigger</button>' },
            attachTo: document.body
        })
        expect(bodyWrapper.vm.$data._bodyEl).toBeUndefined()

        await bodyWrapper.setProps({ appendToBody: true })
        expect(bodyWrapper.vm.$data._bodyEl).toBeDefined()

        bodyWrapper.unmount()
    })

    it('handles appendToBody switching back and forth', async () => {
        const bodyWrapper = mount(BTooltip, {
            props: { label: 'Tooltip text', appendToBody: false, triggers: ['hover'] },
            slots: { default: '<button>Trigger</button>' },
            attachTo: document.body
        })
        await bodyWrapper.setProps({ appendToBody: true })
        expect(bodyWrapper.vm.$data._bodyEl).toBeDefined()

        // Opening the tooltip after appendToBody was toggled on used to throw
        // "undefined is not an object (evaluating 'this.$data._bodyEl.children')"
        expect(() => bodyWrapper.vm.onHover()).not.toThrow()
        await bodyWrapper.vm.$nextTick()
        expect(bodyWrapper.vm.isActive).toBe(true)

        await bodyWrapper.setProps({ appendToBody: false })
        expect(bodyWrapper.vm.$data._bodyEl).toBeUndefined()

        bodyWrapper.unmount()
    })
})
