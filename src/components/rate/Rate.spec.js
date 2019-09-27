import { shallowMount } from '@vue/test-utils'
import BRate from '@components/rate/Rate'

describe('BRate', () => {
    it('is vue instance', () => {
        const wrapper = shallowMount(BRate)

        expect(wrapper.name()).toBe('BRate')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('renders props.customText', () => {
        const wrapper = shallowMount(BRate, {
            propsData: { customText: 'Points' }
        })
        expect(wrapper.text()).toMatch('Points')
    })
})
