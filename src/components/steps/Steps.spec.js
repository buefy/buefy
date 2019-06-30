import { mount } from '@vue/test-utils'
import BSteps from '@components/steps/Steps'

describe('BSteps', () => {
    it('is called', () => {
        const wrapper = mount(BSteps)
        expect(wrapper.name()).toBe('BSteps')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
