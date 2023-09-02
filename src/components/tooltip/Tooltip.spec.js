import { shallowMount } from '@vue/test-utils'
import BTooltip from '@components/tooltip/Tooltip'

let wrapper

describe('BTooltip', () => {
    let spyOnOnHover
    let spyOnOnContextMenu
    let spyOnOnFocus
    let spyOnOpen

    beforeEach(() => {
        // spies on methods before mounting the component
        // because wrapper.vm does not allow spies
        spyOnOnHover = jest.spyOn(BTooltip.methods, 'onHover')
        spyOnOnContextMenu = jest.spyOn(BTooltip.methods, 'onContextMenu')
        spyOnOnFocus = jest.spyOn(BTooltip.methods, 'onFocus')
        spyOnOpen = jest.spyOn(BTooltip.methods, 'open')
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
            updateAppendToBody: jest.fn(),
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
        wrapper.vm.onContextMenu({ preventDefault: jest.fn() })
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
