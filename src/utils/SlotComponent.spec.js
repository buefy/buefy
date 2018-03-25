import { shallow } from '@vue/test-utils'
import BSlotComponent from '@utils/SlotComponent'
import Vue from 'vue'

describe('BSlotComponent', () => {
    it('is called', () => {
        const wrapper = shallow(BSlotComponent, {
            propsData: {
                component: {}
            }
        })

        expect(wrapper.name()).toBe('BSlotComponent')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('default render', () => {
        const slot = 'Content'
        const component = shallow(Vue, {
            slots: {
                default: slot
            }
        })
        const wrapper = shallow(BSlotComponent, {
            propsData: {
                component: component.vm
            }
        })
        expect(wrapper.html()).toBe(`<div>${slot}</div>`)
    })

    it('render', () => {
        const slot = 'Content'
        const slotName = 'header'
        const component = shallow(Vue, {
            slots: {
                [slotName]: slot
            }
        })
        const tag = 'span'
        const wrapper = shallow(BSlotComponent, {
            propsData: {
                component: component.vm,
                tag: tag,
                name: slotName
            }
        })
        expect(wrapper.html()).toBe(`<${tag}>${slot}</${tag}>`)
    })
})
