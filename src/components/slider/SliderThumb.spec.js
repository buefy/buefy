import { shallowMount } from '@vue/test-utils'
import BSliderThumb from '@components/slider/SliderThumb'

let wrapper
const BSlider = {
    template: '<b-slider-stub></b-slider-stub>',
    data() {
        return {
            _isSlider: true,
            step: 5,
            precision: 2
        }
    }
} // Mocking only necessary

describe('BSliderThumb', () => {
    beforeEach(() => {
        wrapper = shallowMount(BSliderThumb, {
            parentComponent: BSlider
        })
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BSliderThumb')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('inherits parent properties', () => {
        expect(wrapper.vm.step).toBe(BSlider.data().step)
        expect(wrapper.vm.precision).toBe(BSlider.data().precision)
    })

    it('manage focus', () => {
        wrapper.vm.onFocus()
        expect(wrapper.vm.isFocused).toBeTruthy()

        wrapper.vm.onBlur()
        expect(wrapper.vm.isFocused).toBeFalsy()
    })

    it('manage keys', () => {
        wrapper.vm.$parent.emitValue = jest.fn()
        wrapper.setProps({ value: 5 })
        const thumb = wrapper.find('.b-slider-thumb')

        thumb.trigger('keydown.left')
        expect(wrapper.vm.$parent.emitValue).toHaveBeenCalledWith('change')
        expect(wrapper.emitted()['input']).toBeTruthy()

        thumb.trigger('keydown.right')
        expect(wrapper.vm.$parent.emitValue).toHaveBeenCalledWith('change')
        expect(wrapper.emitted()['input']).toBeTruthy()
    })

    it('manage dragging events', () => {
        document.removeEventListener = jest.fn(() => document.removeEventListener)
        document.addEventListener = jest.fn(() => document.addEventListener)
        wrapper.vm.$parent.sliderSize = jest.fn()
        wrapper.vm.$parent.emitValue = jest.fn()
        const thumb = wrapper.find('.b-slider-thumb')
        let clientX = 25
        const event = { preventDefault: jest.fn(), clientX }

        thumb.trigger('mousedown', event)
        expect(event.preventDefault).toHaveBeenCalled()
        expect(document.addEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function))
        expect(document.addEventListener).toHaveBeenCalledWith('touchmove', expect.any(Function))
        expect(document.addEventListener).toHaveBeenCalledWith('mouseup', expect.any(Function))
        expect(document.addEventListener).toHaveBeenCalledWith('touchend', expect.any(Function))
        expect(document.addEventListener).toHaveBeenCalledWith('contextmenu', expect.any(Function))
        expect(wrapper.vm.dragging).toBeTruthy()
        expect(wrapper.emitted()['dragstart']).toBeTruthy()
        expect(wrapper.vm.startX).toBe(clientX)

        clientX = 50
        event.clientX = clientX
        wrapper.vm.onDragging(event)

        clientX = 100
        event.clientX = clientX
        wrapper.vm.onDragEnd(event)
        expect(wrapper.vm.dragging).toBeFalsy()
        expect(wrapper.emitted()['dragend']).toBeTruthy()
        expect(document.removeEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function))
        expect(document.removeEventListener).toHaveBeenCalledWith('touchmove', expect.any(Function))
        expect(document.removeEventListener).toHaveBeenCalledWith('mouseup', expect.any(Function))
        expect(document.removeEventListener).toHaveBeenCalledWith('touchend', expect.any(Function))
        expect(document.removeEventListener).toHaveBeenCalledWith('contextmenu', expect.any(Function))
    })

    it('passes tooltip-always prop to b-tooltip component', () => {
        wrapper.setProps({ tooltipAlways: true })
        expect(wrapper.find('b-tooltip-stub').props().always).toBe(true)
    })
})
