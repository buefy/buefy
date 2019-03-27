import { shallowMount } from '@vue/test-utils'
import BSlotComponent from '@utils/SlotComponent'

describe('BSlotComponent', () => {
    const MockComponent = {
        render: (h) => h('div', {}, 'Hello!')
    }
    const defaultEvent = 'hook:updated'

    it('is called', () => {
        const wrapper = shallowMount(BSlotComponent, {
            propsData: {
                component: {}
            }
        })

        expect(wrapper.name()).toBe('BSlotComponent')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('default render', () => {
        const slot = '<span>Content</span>'
        const Component = shallowMount(MockComponent, {
            slots: {
                default: slot
            }
        })
        const wrapper = shallowMount(BSlotComponent, {
            propsData: {
                component: Component.vm
            }
        })
        expect(wrapper.html()).toBe(`<div>${slot}</div>`)
    })

    it('render', () => {
        const slot = '<span>Content</span>'
        const slotName = 'header'
        const Component = shallowMount(MockComponent, {
            slots: {
                [slotName]: slot
            }
        })
        const tag = 'span'
        const wrapper = shallowMount(BSlotComponent, {
            propsData: {
                component: Component.vm,
                tag: tag,
                name: slotName
            }
        })
        expect(wrapper.html()).toBe(`<${tag}>${slot}</${tag}>`)
    })

    it('render after emit event', async () => {
        const slot = '<span>Content</span>'
        const Component = shallowMount(MockComponent, {
            slots: {
                default: slot
            }
        })
        const wrapper = shallowMount(BSlotComponent, {
            propsData: {
                component: Component.vm
            }
        })
        Component.vm.$emit(defaultEvent, {})
        await wrapper.vm.$nextTick()
        expect(wrapper.html()).toBe(`<div>${slot}</div>`)
    })

    it('refresh after default event (hook)', async () => {
        const slot = '<span>Content</span>'
        const Component = shallowMount(MockComponent, {
            slots: {
                default: slot
            }
        })
        const refresh = jest.fn()
        const wrapper = shallowMount(BSlotComponent, {
            propsData: {
                component: Component.vm
            },
            methods: {
                refresh
            }
        })
        Component.vm.$forceUpdate()
        await Component.vm.$nextTick()
        expect(wrapper.html()).toBe(`<div>${slot}</div>`)
    })

    it('refresh', () => {
        const event = 'component-event'
        const slot = '<span>Content</span>'
        const Component = shallowMount(MockComponent, {
            slots: {
                default: slot
            }
        })
        const refresh = jest.fn()
        const wrapper = shallowMount(BSlotComponent, {
            propsData: {
                component: Component.vm,
                event
            },
            methods: {
                refresh
            }
        })
        Component.vm.$emit(event, {})
        expect(refresh).toHaveBeenCalledTimes(1)
        expect(wrapper.html()).toBe(`<div>${slot}</div>`)
    })

    it('destroy', () => {
        const slot = '<span>Content</span>'
        const Component = shallowMount(MockComponent, {
            slots: {
                default: slot
            }
        })
        const refresh = jest.fn()
        const wrapper = shallowMount(BSlotComponent, {
            propsData: {
                component: Component.vm
            },
            methods: {
                refresh
            }
        })
        wrapper.destroy()
        Component.vm.$emit(defaultEvent, {})
        expect(refresh).toHaveBeenCalledTimes(0)
    })
})
