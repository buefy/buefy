import { shallowMount } from '@vue/test-utils'
import BSlider from '@components/slider/Slider'

let wrapper

describe('BSlider', () => {
    beforeEach(() => {
        wrapper = shallowMount(BSlider)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BSlider')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
