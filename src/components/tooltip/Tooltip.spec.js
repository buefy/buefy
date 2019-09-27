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
})
