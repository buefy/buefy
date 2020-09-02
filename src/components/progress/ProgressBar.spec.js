import { shallowMount } from '@vue/test-utils'
import BProgressBar from '@components/progress/ProgressBar'
import ProviderParentMixin from '../../utils/ProviderParentMixin'

let wrapper
const BProgress = {
    mixins: [ProviderParentMixin('progress')],
    template: '<b-progress-stub></b-progress-stub>'
}

describe('BProgressBar', () => {
    beforeEach(() => {
        wrapper = shallowMount(BProgressBar, {
            parentComponent: BProgress
        })
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BProgressBar')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
