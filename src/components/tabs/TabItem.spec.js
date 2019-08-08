import { shallowMount } from '@vue/test-utils'
import BTabItem from '@components/tabs/TabItem'

let wrapper
const BTabs = {
    template: '<b-tab-stub></b-tab-stub>',
    data() {
        return {
            tabItems: [],
            _isTabs: true
        }
    }
}

describe('BTabItem', () => {
    beforeEach(() => {
        wrapper = shallowMount(BTabItem, {
            parentComponent: BTabs
        })
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BTabItem')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('set isActive when activate is called', () => {
        wrapper.vm.activate()
        expect(wrapper.vm.isActive).toBeTruthy()
    })

    it('reset isActive when deactivate is called', () => {
        wrapper.vm.deactivate()
        expect(wrapper.vm.isActive).toBeFalsy()
    })
})
