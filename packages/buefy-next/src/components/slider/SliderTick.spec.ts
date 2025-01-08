import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import BSliderTick from '@components/slider/SliderTick.vue'

let wrapper: VueWrapper<InstanceType<typeof BSliderTick>>
const BSlider = {
    data() {
        return {
            _isSlider: true
        }
    },
    template: '<div><slot /></div>'
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
