import { shallowMount } from '@vue/test-utils'
import BMenuItem from '@components/menu/MenuItem'

let wrapper

describe('BMenuItem', () => {
    beforeEach(() => {
        wrapper = shallowMount(BMenuItem)
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BMenuItem')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('sets newActive when active is changed', async () => {
        await wrapper.setProps({ active: true })
        expect(wrapper.vm.newActive).toBeTruthy()
    })

    it('sets newExpanded when expanded is changed', async () => {
        await wrapper.setProps({ expanded: true })
        expect(wrapper.vm.newExpanded).toBeTruthy()
    })

    it('manage onClick', async () => {
        wrapper.vm.reset = jest.fn()

        await wrapper.setProps({ disabled: true })
        wrapper.vm.onClick()

        await wrapper.setProps({ disabled: false })
        wrapper.vm.onClick()

        expect(wrapper.vm.reset).toHaveBeenCalledTimes(1)
        expect(wrapper.vm.newExpanded).toBeTruthy()
        expect(wrapper.emitted()['update:expanded'][0]).toContainEqual(true)
    })
})
