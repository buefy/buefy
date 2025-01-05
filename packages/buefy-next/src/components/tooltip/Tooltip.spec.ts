import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { MockInstance } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import BTooltip from '@components/tooltip/Tooltip.vue'

let wrapper: VueWrapper<InstanceType<typeof BTooltip>>

describe('BTooltip', () => {
    let spyOnOnHover: MockInstance
    let spyOnOnContextMenu: MockInstance
    let spyOnOnFocus: MockInstance
    let spyOnOpen: MockInstance

    beforeEach(() => {
        // spies on methods before mounting the component
        // because wrapper.vm does not allow spies
        spyOnOnHover = vi.spyOn(BTooltip.methods!, 'onHover')
        spyOnOnContextMenu = vi.spyOn(BTooltip.methods!, 'onContextMenu')
        spyOnOnFocus = vi.spyOn(BTooltip.methods!, 'onFocus')
        spyOnOpen = vi.spyOn(BTooltip.methods!, 'open')
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
        await wrapper.setData({
            updateAppendToBody: vi.fn(),
            isActive: true
        })
        expect(wrapper.vm.updateAppendToBody).toHaveBeenCalled()
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
})
