import { h } from 'vue'
import { shallowMount } from '@vue/test-utils'
import BSlotComponent from '@utils/SlotComponent'

describe('BSlotComponent', () => {
    const MockComponent = {
        render: () => h('div', {}, 'Hello!')
    }

    it('is called', () => {
        const wrapper = shallowMount(BSlotComponent, {
            props: {
                component: {}
            }
        })

        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BSlotComponent')
    })

    it('default render', () => {
        const slot = '<span>Content</span>'
        const Component = shallowMount(MockComponent, {
            slots: {
                default: slot
            }
        })
        const wrapper = shallowMount(BSlotComponent, {
            props: {
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
            props: {
                component: Component.vm,
                tag,
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
            props: {
                component: Component.vm
            }
        })
        Component.vm.$forceUpdate()
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
        const spyOnRefresh = jest.spyOn(BSlotComponent.methods, 'refresh').mockImplementation(() => {})
        const wrapper = shallowMount(BSlotComponent, {
            props: {
                component: Component.vm
            }
        })
        Component.vm.$forceUpdate()
        await Component.vm.$nextTick()
        expect(spyOnRefresh).toHaveBeenCalledTimes(1)
        expect(wrapper.html()).toBe(`<div>${slot}</div>`)
        spyOnRefresh.mockRestore()
    })

    it('refresh on default event with existing handler', async () => {
        const MockComponent = {
            render: () => h('div', {}, 'Hello!'),
            updated: jest.fn()
        }
        const slot = '<span>Content</span>'
        const Component = shallowMount(MockComponent, {
            slots: {
                default: slot
            }
        })
        const spyOnRefresh = jest.spyOn(BSlotComponent.methods, 'refresh').mockImplementation(() => {})
        const wrapper = shallowMount(BSlotComponent, {
            props: {
                component: Component.vm
            }
        })
        Component.vm.$forceUpdate()
        await Component.vm.$nextTick()
        expect(MockComponent.updated).toHaveBeenCalledTimes(1)
        expect(spyOnRefresh).toHaveBeenCalledTimes(1)
        expect(wrapper.html()).toBe(`<div>${slot}</div>`)
        spyOnRefresh.mockRestore()
    })

    it('refresh on custom event', () => {
        const event = 'component-event'
        const slot = '<span>Content</span>'
        const Component = shallowMount(MockComponent, {
            slots: {
                default: slot
            }
        })
        const spyOnRefresh = jest.spyOn(BSlotComponent.methods, 'refresh').mockImplementation(() => {})
        const wrapper = shallowMount(BSlotComponent, {
            props: {
                component: Component.vm,
                event
            }
        })
        Component.vm.$emit(event, {})
        expect(spyOnRefresh).toHaveBeenCalledTimes(1)
        expect(wrapper.html()).toBe(`<div>${slot}</div>`)
        spyOnRefresh.mockRestore()
    })

    it('refresh on custom event with existing handler (default case)', () => {
        const event = 'component-event'
        const slot = '<span>Content</span>'
        const existingHandler = jest.fn()
        const Component = shallowMount(MockComponent, {
            props: {
                'onComponent-event': existingHandler
            },
            slots: {
                default: slot
            }
        })
        const spyOnRefresh = jest.spyOn(BSlotComponent.methods, 'refresh').mockImplementation(() => {})
        const wrapper = shallowMount(BSlotComponent, {
            props: {
                component: Component.vm,
                event
            }
        })
        Component.vm.$emit(event, {})
        expect(existingHandler).toHaveBeenCalledTimes(1)
        expect(spyOnRefresh).toHaveBeenCalledTimes(1)
        expect(wrapper.html()).toBe(`<div>${slot}</div>`)
        spyOnRefresh.mockRestore()
    })

    it('refresh on custom event with existing handler (camelized case)', () => {
        const event = 'component-event'
        const slot = '<span>Content</span>'
        const existingHandler = jest.fn()
        const Component = shallowMount(MockComponent, {
            props: {
                onComponentEvent: existingHandler
            },
            slots: {
                default: slot
            }
        })
        const spyOnRefresh = jest.spyOn(BSlotComponent.methods, 'refresh').mockImplementation(() => {})
        const wrapper = shallowMount(BSlotComponent, {
            props: {
                component: Component.vm,
                event
            }
        })
        Component.vm.$emit(event, {})
        expect(existingHandler).toHaveBeenCalledTimes(1)
        expect(spyOnRefresh).toHaveBeenCalledTimes(1)
        expect(wrapper.html()).toBe(`<div>${slot}</div>`)
        spyOnRefresh.mockRestore()
    })

    it('destroy', async () => {
        const slot = '<span>Content</span>'
        const Component = shallowMount(MockComponent, {
            slots: {
                default: slot
            }
        })
        const spyOnRefresh = jest.spyOn(BSlotComponent.methods, 'refresh').mockImplementation(() => {})
        const wrapper = shallowMount(BSlotComponent, {
            props: {
                component: Component.vm
            }
        })
        wrapper.unmount()
        Component.vm.$forceUpdate()
        await Component.vm.$nextTick()
        expect(spyOnRefresh).toHaveBeenCalledTimes(0)
        spyOnRefresh.mockRestore()
    })

    it('destroy with existing handler', async () => {
        const MockComponent = {
            render: () => h('div', {}, 'Hello!'),
            updated: jest.fn()
        }
        const slot = '<span>Content</span>'
        const Component = shallowMount(MockComponent, {
            slots: {
                default: slot
            }
        })
        const spyOnRefresh = jest.spyOn(BSlotComponent.methods, 'refresh').mockImplementation(() => {})
        const wrapper = shallowMount(BSlotComponent, {
            props: {
                component: Component.vm
            }
        })
        wrapper.unmount()
        Component.vm.$forceUpdate()
        await Component.vm.$nextTick()
        expect(MockComponent.updated).toHaveBeenCalledTimes(1)
        expect(spyOnRefresh).toHaveBeenCalledTimes(0)
        spyOnRefresh.mockRestore()
    })

    it('destroy with custom event', async () => {
        const event = 'component-event'
        const slot = '<span>Content</span>'
        const Component = shallowMount(MockComponent, {
            slots: {
                default: slot
            }
        })
        const spyOnRefresh = jest.spyOn(BSlotComponent.methods, 'refresh').mockImplementation(() => {})
        const wrapper = shallowMount(BSlotComponent, {
            props: {
                component: Component.vm,
                event
            }
        })
        wrapper.unmount()
        Component.vm.$emit(event, {})
        await Component.vm.$nextTick()
        expect(spyOnRefresh).toHaveBeenCalledTimes(0)
        spyOnRefresh.mockRestore()
    })

    it('destroy with custom event and existing handler', async () => {
        const event = 'component-event'
        const slot = '<span>Content</span>'
        const existingHandler = jest.fn()
        const Component = shallowMount(MockComponent, {
            props: {
                'onComponent-event': existingHandler
            },
            slots: {
                default: slot
            }
        })
        const spyOnRefresh = jest.spyOn(BSlotComponent.methods, 'refresh').mockImplementation(() => {})
        const wrapper = shallowMount(BSlotComponent, {
            props: {
                component: Component.vm,
                event
            }
        })
        wrapper.unmount()
        Component.vm.$emit(event, {})
        await Component.vm.$nextTick()
        expect(existingHandler).toHaveBeenCalledTimes(1)
        expect(spyOnRefresh).toHaveBeenCalledTimes(0)
        spyOnRefresh.mockRestore()
    })
})
