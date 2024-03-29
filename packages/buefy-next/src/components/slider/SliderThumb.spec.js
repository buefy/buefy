import { mount, shallowMount } from '@vue/test-utils'
import BSliderThumb from '@components/slider/SliderThumb'
import BTooltip from '@components/tooltip/Tooltip'

let wrapper
const BSlider = {
    template: '<div><slot /></div>',
    data() {
        return {
            _isSlider: true,
            step: 5,
            precision: 2,
            min: 0,
            max: 100
        }
    }
} // Mocking only necessary

describe('BSliderThumb', () => {
    beforeEach(() => {
        wrapper = mount(BSlider, {
            slots: {
                default: BSliderThumb
            }
        }).findComponent(BSliderThumb)
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BSliderThumb')
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

    it('manage keys', async () => {
        wrapper = mount(BSlider, {
            slots: {
                default: '<BSliderThumb :model-value="5" />'
            },
            global: {
                components: {
                    BSliderThumb
                }
            }
        }).findComponent(BSliderThumb)
        wrapper.vm.$parent.emitValue = jest.fn()
        const thumb = wrapper.find('.b-slider-thumb')

        await thumb.trigger('keydown.left')
        expect(wrapper.vm.$parent.emitValue).toHaveBeenCalledWith('change')
        expect(wrapper.emitted()['update:modelValue']).toBeTruthy()

        await thumb.trigger('keydown.right')
        expect(wrapper.vm.$parent.emitValue).toHaveBeenCalledWith('change')
        expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    })

    it('manage dragging events', async () => {
        document.removeEventListener = jest.fn(() => document.removeEventListener)
        document.addEventListener = jest.fn(() => document.addEventListener)
        wrapper.vm.$parent.sliderSize = jest.fn()
        wrapper.vm.$parent.emitValue = jest.fn()
        const thumb = wrapper.find('.b-slider-thumb')
        let clientX = 25
        const event = { preventDefault: jest.fn(), clientX }

        await thumb.trigger('mousedown', event)
        expect(event.preventDefault).toHaveBeenCalled()
        expect(document.addEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function))
        expect(document.addEventListener).toHaveBeenCalledWith('touchmove', expect.any(Function))
        expect(document.addEventListener).toHaveBeenCalledWith('mouseup', expect.any(Function))
        expect(document.addEventListener).toHaveBeenCalledWith('touchend', expect.any(Function))
        expect(document.addEventListener).toHaveBeenCalledWith('contextmenu', expect.any(Function))
        expect(wrapper.vm.dragging).toBeTruthy()
        expect(wrapper.emitted().dragstart).toBeTruthy()
        expect(wrapper.vm.startX).toBe(clientX)

        clientX = 50
        event.clientX = clientX
        wrapper.vm.onDragging(event)

        clientX = 100
        event.clientX = clientX
        wrapper.vm.onDragEnd(event)
        expect(wrapper.vm.dragging).toBeFalsy()
        expect(wrapper.emitted().dragend).toBeTruthy()
        expect(document.removeEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function))
        expect(document.removeEventListener).toHaveBeenCalledWith('touchmove', expect.any(Function))
        expect(document.removeEventListener).toHaveBeenCalledWith('mouseup', expect.any(Function))
        expect(document.removeEventListener).toHaveBeenCalledWith('touchend', expect.any(Function))
        expect(document.removeEventListener).toHaveBeenCalledWith('contextmenu', expect.any(Function))
    })

    it('passes tooltip-always prop to b-tooltip component', async () => {
        wrapper = shallowMount(BSliderThumb)
        await wrapper.setProps({ tooltipAlways: true })
        expect(wrapper.findComponent(BTooltip).props().always).toBe(true)
    })

    describe('with fallthrough attributes', () => {
        const attrs = {
            class: 'fallthrough-class',
            style: 'font-size: 2rem;',
            id: 'fallthrough-id'
        }

        it('should apply class, style, and id to the root <div> element if compatFallthrough is true (default)', () => {
            const wrapper = shallowMount(BSliderThumb, {
                attrs,
                global: {
                    stubs: {
                        // b-tooltip must be rendered to access the inner <div>
                        'b-tooltip': false
                    }
                }
            })

            const root = wrapper.find('div.b-slider-thumb-wrapper')
            expect(root.classes(attrs.class)).toBe(true)
            expect(root.attributes('style')).toBe(attrs.style)
            expect(root.attributes('id')).toBe(attrs.id)

            const inner = wrapper.find('div.b-slider-thumb')
            expect(inner.classes(attrs.class)).toBe(false)
            expect(inner.attributes('style')).toBeUndefined()
            expect(inner.attributes('id')).toBeUndefined()
        })

        it('should apply class, style, and id to the inner <div> element if compatFallthrough is false', () => {
            const wrapper = shallowMount(BSliderThumb, {
                attrs,
                props: {
                    compatFallthrough: false
                },
                global: {
                    stubs: {
                        // b-tooltip must be rendered to access the inner <div>
                        'b-tooltip': false
                    }
                }
            })

            const root = wrapper.find('div.b-slider-thumb-wrapper')
            expect(root.classes(attrs.class)).toBe(false)
            expect(root.attributes('style')).toBeUndefined()
            expect(root.attributes('id')).toBeUndefined()

            const inner = wrapper.find('div.b-slider-thumb')
            expect(inner.classes(attrs.class)).toBe(true)
            expect(inner.attributes('style')).toBe(attrs.style)
            expect(inner.attributes('id')).toBe(attrs.id)
        })
    })
})
