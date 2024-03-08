import { mount } from '@vue/test-utils'
import BTabs from '@components/tabs/Tabs'
import BTabItem from '@components/tabs/TabItem'

let wrapper
let wrapperParent

const WrapperComp = {
    data() {
        return {
            show1: true
        }
    },
    template: `
        <BTabs ref="tabs">
            <BTabItem v-if="show1" ref="firstItem" value="tab1"/>
            <BTabItem ref="testItem" value="tab2"/>
            <BTabItem value="tab3" :visible="false"/>
        </BTabs>`,
    components: {
        BTabs, BTabItem
    }
}

describe('BTabItem', () => {
    beforeEach(() => {
        wrapperParent = mount(WrapperComp)
        wrapper = wrapperParent.findComponent({ ref: 'testItem' })
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BTabItem')
        expect(wrapper.vm.value).toBe('tab2')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('computes its position correctly', () => {
        expect(wrapper.vm.index).toBe(1)
    })

    it('will retain indexes when a sibling gets removed', async () => {
        expect(wrapper.vm.index).toBe(1)
        await wrapperParent.setData({ show1: false })
        expect(wrapper.vm.index).toBe(1)
    })

    it('should assign new index when tab is added after removal', async () => {
        const firstItem = wrapperParent.findComponent({ ref: 'firstItem' })
        expect(firstItem.vm.index).toBe(0)
        await wrapperParent.setData({ show1: false })
        await wrapperParent.setData({ show1: true })

        const firstItem2 = wrapperParent.findComponent({ ref: 'firstItem' })
        expect(firstItem2.vm.index).toBe(3)
    })

    it('transition correctly when activate is called', () => {
        wrapper.vm.activate(0)
        expect(wrapper.vm.transitionName).toBe('slide-prev')

        wrapper.vm.activate(2)
        expect(wrapper.vm.transitionName).toBe('slide-next')
    })

    it('transition correctly when deactivate is called', () => {
        wrapper.vm.deactivate(2)
        expect(wrapper.vm.transitionName).toBe('slide-prev')

        wrapper.vm.deactivate(0)
        expect(wrapper.vm.transitionName).toBe('slide-next')
    })

    it('should update active state', async () => {
        const wrapperFirstItem = wrapperParent.findComponent({ ref: 'firstItem' })
        // we need `<a>` elements corresponding to individual tab components to
        // activate them with 'click'
        const firstTabLink = wrapperParent.find(`#${wrapperFirstItem.vm.uniqueValue}-label`)
        const secondTabLink = wrapperParent.find(`#${wrapper.vm.uniqueValue}-label`)

        expect(wrapperFirstItem.vm.isActive).toBe(true)
        expect(wrapper.vm.isActive).toBe(false)

        await secondTabLink.trigger('click')
        expect(wrapperFirstItem.vm.isActive).toBe(false)
        expect(wrapper.vm.isActive).toBe(true)

        await firstTabLink.trigger('click')
        expect(wrapperFirstItem.vm.isActive).toBe(true)
        expect(wrapper.vm.isActive).toBe(false)
    })

    it('doesn\'t mount when it has no parent', () => {
        try {
            mount(BTabItem)
        } catch (error) {
            expect(error.message).toEqual(expect.stringMatching(/You should wrap/))
        }
    })

    it('doesn\'t render when parent has destroyOnHide', async () => {
        wrapper = mount(BTabItem, {
            props: {
                value: 'tab1'
            },
            global: {
                provide: {
                    btab: {
                        // since we cannot override the computed value,
                        // `activeItem` needs to be identical to the item
                        // to make the item active
                        _registerItem(item) {
                            this.activeItem = item
                        },
                        activeItem: null,
                        destroyOnHide: true
                    }
                }
            }
        })

        expect(wrapper.vm.isActive).toBeTruthy()
        expect(wrapper.vm.visible).toBeTruthy()
        expect(wrapper.html()).not.toBe('')

        await wrapper.setProps({ visible: false })

        expect(wrapper.html()).toBe('')
    })

    it('unregisters when destroyed', async () => {
        const wrapper = mount({
            template: `
        <BTabs v-model="value">
            <BTabItem ref="item1"/>
            <BTabItem v-if="item2" ref="item2"/>
        </BTabs>`,
            props: {
                // we cannot directly manipulate BTabs' modelValue unless it is
                // directly mounted. uses indirect v-model instead
                value: {
                    type: Number,
                    default: 0
                },
                item2: {
                    type: Boolean,
                    default: true
                }
            },
            components: {
                BTabs, BTabItem
            }
        })

        expect(wrapper.findComponent({ ref: 'item2' })).toBeTruthy()
        expect(wrapper.findComponent(BTabs).vm.items.length).toBe(2)

        await wrapper.setProps({ item2: false })

        expect(wrapper.findComponent(BTabs).vm.items.length).toBe(1)

        await wrapper.setProps({ item2: true })
        await wrapper.setProps({ value: 1 }) // cannot merge with above

        expect(wrapper.findComponent(BTabs).vm.items.length).toBe(2)
        expect(wrapper.findComponent({ ref: 'item2' }).vm.isActive).toBeTruthy()
    })

    describe('with explicit order', () => {
        it('should assign consistent index when tab is added after removal', async () => {
            const wrapper = mount({
                template: `
                    <BTabs ref="tabs">
                        <BTabItem v-if="show1" ref="firstItem" :order="1" />
                        <BTabItem :order="2" />
                        <BTabItem :order="3" />
                    </BTabs>`,
                props: {
                    show1: {
                        type: Boolean,
                        default: true
                    }
                },
                components: { BTabs, BTabItem }
            })

            const firstItem = wrapper.findComponent({ ref: 'firstItem' })
            expect(firstItem.vm.index).toBe(1)
            await wrapper.setProps({ show1: false })
            await wrapper.setProps({ show1: true })

            const firstItem2 = wrapper.findComponent({ ref: 'firstItem' })
            expect(firstItem2.vm.index).toBe(1)
        })
    })
})
