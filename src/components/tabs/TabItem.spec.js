import {mount} from '@vue/test-utils'
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
        <BTabs>
            <BTabItem v-if="show1" value="tab1"/>
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
        wrapper = wrapperParent.find({ ref: 'testItem' })
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BTabItem')
        expect(wrapper.isVueInstance()).toBeTruthy()
        expect(wrapper.vm.value).toBe('tab2')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('computes its position correctly', () => {
        expect(wrapper.vm.index).toBe(1)
    })

    it('will recompute indexes when a sibling gets removed', async () => {
        expect(wrapper.vm.index).toBe(1)
        wrapperParent.vm.show1 = false

        await wrapper.vm.$nextTick()

        expect(wrapper.vm.index).toBe(0)
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

    it('doesn\'t mount when it has no parent', () => {
        const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {})

        try {
            wrapper = mount({
                template: `<BTabItem/>`,
                components: {
                    BTabItem
                },
                destroyed() {
                    spy()
                }
            })
        } catch (error) {
            expect(error.message).stringMatching(/You should wrap/)
        } finally {
            spy.mockRestore()
        }
    })

    it('doesn\'t render when parent has destroyOnHide', async () => {
        wrapper = mount({
            template: `
        <BTabs :destroy-on-hide="true">
            <BTabItem></BTabItem>
        </BTabs>`,
            components: {
                BTabs, BTabItem
            }
        }).find(BTabItem)

        expect(wrapper.html()).not.toBe(undefined)

        wrapper.setProps({visible: false})

        await wrapper.vm.$nextTick() // Wait until it's rerendered

        expect(wrapper.html()).toBe(undefined)
    })

    it('unregisters when destroyed', async () => {
        const wrapper = mount({
            template: `
        <BTabs>
            <BTabItem ref="item1"/>
            <BTabItem v-if="item2" ref="item2"/>
        </BTabs>`,
            props: {
                item2: {
                    type: Boolean,
                    default: true
                }
            },
            components: {
                BTabs, BTabItem
            }
        })

        expect(wrapper.find({ref: 'item2'})).toBeTruthy()
        expect(wrapper.find(BTabs).vm.items.length).toBe(2)

        wrapper.setProps({item2: false})

        expect(wrapper.find(BTabs).vm.items.length).toBe(1)

        wrapper.setProps({item2: true})
        wrapper.find(BTabs).setProps({value: 1})

        await wrapper.vm.$nextTick()

        expect(wrapper.find(BTabs).vm.items.length).toBe(2)
        expect(wrapper.find({ref: 'item2'}).vm.isActive).toBeTruthy()
    })
})
