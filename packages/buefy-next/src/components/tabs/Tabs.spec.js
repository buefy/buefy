import { mount } from '@vue/test-utils'
import BTabs from '@components/tabs/Tabs'
import BTabItem from '@components/tabs/TabItem'

let wrapper

describe('BTabs', () => {
    beforeEach(() => {
        wrapper = mount(BTabs, {
            props: {
                modelValue: 'tab1'
            },
            slots: {
                default: `
                    <BTabItem value="tab1"></BTabItem>
                    <BTabItem value="tab2" :visible="false"></BTabItem>`
            },
            global: {
                components: { BTabItem }
            }
        })
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BTabs')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('manage main classes accordingly', async () => {
        await wrapper.setProps({
            expanded: true,
            vertical: true,
            position: 'is-centered'
        })
        expect(wrapper.vm.mainClasses['is-fullwidth']).toBeTruthy()
        expect(wrapper.vm.mainClasses['is-vertical']).toBeTruthy()
        expect(wrapper.vm.mainClasses['is-centered']).toBeTruthy()
    })

    it('emit input event with value when active tab is modified', async () => {
        const idx = 'tab2'
        await wrapper.setData({ activeId: idx })

        const valueEmitted = wrapper.emitted()['update:modelValue']

        expect(valueEmitted).toBeTruthy()
        expect(valueEmitted[0][0]).toBe(idx)
    })

    it('emit input event with value when childClick is called', async () => {
        const val = 'tab2'

        wrapper.vm.childClick(wrapper.vm.items[1])
        wrapper.vm.childClick(wrapper.vm.items[1])

        await wrapper.vm.$nextTick() // Wait until $emits have been handled

        const valueEmitted = wrapper.emitted()['update:modelValue']
        expect(valueEmitted[0][0]).toBe(val)
        // Will be called only once even if we clicked multiple times
        expect(valueEmitted.length).toBe(1)
    })

    it('updates the tab when the value is changed', async () => {
        await wrapper.setProps({ modelValue: 'tab2' })

        expect(wrapper.vm.activeId).toBe('tab2')

        await wrapper.setProps({ modelValue: 0 })

        expect(wrapper.vm.activeId).toBe('tab1')
    })

    it('finds the children in descendants', () => {
        const testCmp = {
            template: `
                <div>
                    <BTabItem></BTabItem>
                    <BTabItem></BTabItem>
                </div>`,
            components: { BTabItem }
        }

        wrapper = mount({
            template: `
        <BTabs>
            <test-cmp/>
            <test-cmp/>
            <test-cmp/>
        </BTabs>`,
            components: {
                BTabs, testCmp
            }
        }).findComponent(BTabs)

        expect(wrapper.vm.items.length).toBe(6)
        expect(wrapper.vm.items.map((i) => i.index)).toEqual([0, 1, 2, 3, 4, 5])
    })

    it('doesn\'t show a tab if value is null', async () => {
        await wrapper.setProps({ modelValue: null })

        expect(wrapper.vm.activeId).toBeNull()
        expect(wrapper.vm.activeTab).toBe(undefined)
    })

    it('still renders if there is no item', () => {
        wrapper = mount({
            template: '<BTabs model-value="tab1"></BTabs>',
            components: {
                BTabs
            }
        }).findComponent(BTabs)
        expect(wrapper.html()).toMatchSnapshot()
    })
})
