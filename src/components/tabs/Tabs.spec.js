import { mount } from '@vue/test-utils'
import BTabs from '@components/tabs/Tabs'

describe('BTabs', () => {
    it('is called', () => {
        const wrapper = mount(BTabs)
        expect(wrapper.name()).toBe('BTabs')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
