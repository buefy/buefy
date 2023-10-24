import { mount } from '@vue/test-utils'
import BProgressBar from '@components/progress/ProgressBar'
import ProviderParentMixin from '../../utils/ProviderParentMixin'

let wrapper
const BProgress = {
    mixins: [ProviderParentMixin('progress')],
    template: '<div><slot /></div>'
}

describe('BProgressBar', () => {
    beforeEach(() => {
        wrapper = mount(BProgress, {
            slots: {
                default: BProgressBar
            }
        }).findComponent(BProgressBar)
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BProgressBar')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
