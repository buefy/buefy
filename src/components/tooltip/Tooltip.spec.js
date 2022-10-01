import { shallowMount } from '@vue/test-utils'
import BTooltip from '@components/tooltip/Tooltip'

let wrapper

describe('BTooltip', () => {
    beforeEach(() => {
        wrapper = shallowMount(BTooltip)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BTooltip')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('tests isActive watch', async () => {
        await wrapper.setProps({appendToBody: true})
        wrapper.vm.updateAppendToBody = jest.fn()
        wrapper.vm.isActive = true
        expect(wrapper.vm.updateAppendToBody).toHaveBeenCalled()
        expect(wrapper.emitted().open).toBeTruthy()
    })

    it('tests onHover method', async () => {
        const onHover = jest.spyOn(wrapper.vm, 'onHover')
        const open = jest.spyOn(wrapper.vm, 'open')
        await wrapper.setProps({triggers: ['hover']})
        wrapper.vm.onHover()
        expect(onHover).toHaveBeenCalled()
        expect(open).toHaveBeenCalled()
    })

    it('tests onContextMenu method', async () => {
        const onContextMenu = jest.spyOn(wrapper.vm, 'onContextMenu')
        const open = jest.spyOn(wrapper.vm, 'open')
        await wrapper.setProps({triggers: ['contextmenu']})
        wrapper.vm.onContextMenu({preventDefault: jest.fn()})
        expect(onContextMenu).toHaveBeenCalled()
        expect(open).toHaveBeenCalled()
    })

    it('tests onFocus method', async () => {
        const onFocus = jest.spyOn(wrapper.vm, 'onFocus')
        const open = jest.spyOn(wrapper.vm, 'open')
        await wrapper.setProps({triggers: ['focus']})
        wrapper.vm.onFocus()
        expect(onFocus).toHaveBeenCalled()
        expect(open).toHaveBeenCalled()
    })
})
