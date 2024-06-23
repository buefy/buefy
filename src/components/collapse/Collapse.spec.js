import { shallowMount } from '@vue/test-utils'
import BCollapse from '@components/collapse/Collapse'

let wrapper

describe('BCollapse', () => {
    describe('default', () => {
        beforeEach(() => {
            wrapper = shallowMount(BCollapse)
        })

        it('is called', () => {
            expect(wrapper.name()).toBe('BCollapse')
            expect(wrapper.isVueInstance()).toBeTruthy()
        })

        it('default props and vm', () => {
            expect(wrapper.props().open).toBe(true)
            expect(wrapper.props().animation).toBe('fade')
            expect(wrapper.vm.isOpen).toBe(true)
        })

        it('render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot()
        })
    })
    describe('open prop is true', () => {
        it('should render default slot contents', async () => {
            const slotDefault = '<div>Content</div>'
            wrapper = shallowMount(BCollapse, {
                propsData: {
                    open: true
                },
                slots: {
                    default: slotDefault
                }
            })
            await wrapper.vm.$nextTick()
            expect(wrapper.find('.collapse-content div').exists()).toBe(true)
            expect(wrapper.find('.collapse-content div').html()).toContain(slotDefault)
        })

        it('should render content slot contents', async () => {
            wrapper = shallowMount(BCollapse, {
                propsData: {
                    open: true
                },
                scopedSlots: {
                    content: `
                        <div>
                            <img 
                                v-if="props.open"
                                src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
                            />
                        </div>
                    `
                }
            })
            await wrapper.vm.$nextTick()
            expect(wrapper.find('.collapse-content div').exists()).toBe(true)
            expect(wrapper.find('.collapse-content div img').exists()).toBe(true)
        })
    })
    describe('open prop is false', () => {
        beforeEach(() => {
            wrapper = shallowMount(BCollapse, {
                propsData: {
                    open: false,
                    position: 'is-bottom'
                }
            })
        })

        it('set default open prop', () => {
            expect(wrapper.props().open).toBe(false)
            expect(wrapper.vm.isOpen).toBe(false)
        })

        it('call toggle method', async () => {
            expect(wrapper.find('.collapse-content').isVisible()).toBe(false)
            wrapper.vm.toggle()
            await wrapper.vm.$nextTick()
            expect(wrapper.vm.isOpen).toBe(true)
            expect(wrapper.find('.collapse-content').isVisible()).toBe(true)
        })

        it('emit a click event', () => {
            expect(wrapper.find('.collapse-content').isVisible()).toBe(false)
            const updateOpen = jest.fn()
            wrapper.vm.$on('update:open', updateOpen)
            wrapper.find('.collapse-trigger').trigger('click')
            expect(updateOpen).toHaveBeenCalledTimes(1)
            expect(updateOpen).toHaveBeenCalledWith(true)
            expect(wrapper.vm.isOpen).toBe(true)
            expect(wrapper.find('.collapse-content').isVisible()).toBe(true)
        })

        it('should emit open event', () => {
            const open = jest.fn()
            wrapper.vm.$on('open', open)
            wrapper.find('.collapse-trigger').trigger('click')
            expect(open).toHaveBeenCalledTimes(1)
        })

        it('update open prop', () => {
            expect(wrapper.find('.collapse-content').isVisible()).toBe(false)
            wrapper.setProps({ open: true })
            expect(wrapper.vm.isOpen).toBe(true)
            expect(wrapper.find('.collapse-content').isVisible()).toBe(true)
        })

        it('should render default slot contents', async () => {
            const slotDefault = '<div>Content</div>'
            wrapper = shallowMount(BCollapse, {
                propsData: {
                    open: false
                },
                slots: {
                    default: slotDefault
                }
            })
            await wrapper.vm.$nextTick() // Wait for the DOM to update
            expect(wrapper.find('.collapse-content div').exists()).toBe(true)
            expect(wrapper.find('.collapse-content div').html()).toContain(slotDefault)
        })

        it('should not render content slot contents', async () => {
            wrapper = shallowMount(BCollapse, {
                propsData: {
                    open: false
                },
                scopedSlots: {
                    content: `
                        <div>
                            <img 
                                v-if="props.open"
                                src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
                            />
                        </div>
                    `
                }
            })
            await wrapper.vm.$nextTick()
            expect(wrapper.find('.collapse-content div').exists()).toBe(true)
            expect(wrapper.find('.collapse-content div img').exists()).toBe(false)
        })
    })

    it('should have trigger slot', () => {
        const triggerSlot = '<strong> Header </strong>'
        const wrapper = shallowMount(BCollapse, {
            slots: {
                trigger: triggerSlot
            }
        })
        expect(wrapper.find('.collapse-trigger :first-child').html()).toBe(triggerSlot)
    })

    it('should have scoped trigger slot', () => {
        const triggerSlot = '<strong> Header </strong>'
        const wrapper = shallowMount(BCollapse, {
            scopedSlots: {
                trigger: triggerSlot
            }
        })
        expect(wrapper.find('.collapse-trigger :first-child').html()).toBe(triggerSlot)
    })

    it('should have default slot', () => {
        const slotDefault = '<div> Content </div>'
        wrapper = shallowMount(BCollapse, {
            slots: {
                default: slotDefault
            }
        })
        expect(wrapper.find('.collapse-content :first-child').html()).toBe(slotDefault)
    })

    it('should emit close event', () => {
        wrapper = shallowMount(BCollapse, {
            propsData: {
                open: true
            }
        })
        const close = jest.fn()
        wrapper.vm.$on('close', close)
        wrapper.find('.collapse-trigger').trigger('click')
        expect(close).toHaveBeenCalledTimes(1)
    })
})
