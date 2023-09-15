import { mount } from '@vue/test-utils'
import BSliderTick from '@components/slider/SliderTick'

let wrapper
const BSlider = {
    template: '<div><slot /></div>',
    data() {
        return {
            _isSlider: true
        }
    }
}

describe('BSliderTick', () => {
    beforeEach(() => {
        wrapper = mount(BSlider, {
            slots: {
                default: BSliderTick
            }
        }).findComponent(BSliderTick)
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BSliderTick')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
