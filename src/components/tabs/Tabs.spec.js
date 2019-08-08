import { shallowMount } from '@vue/test-utils'
import BTabs from '@components/tabs/Tabs'

let wrapper

describe('BTabs', () => {
    beforeEach(() => {
        wrapper = shallowMount(BTabs)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BTabs')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('emit input event with value when tabClick is called', () => {
        const val = 1
        wrapper.vm.changeTab = jest.fn()
        wrapper.vm.tabClick(val)
        const valueEmitted = wrapper.emitted()['input'][0]
        expect(valueEmitted).toContainEqual(val)
        expect(wrapper.vm.changeTab).toHaveBeenCalled()
    })
})
