import { mount } from '@vue/test-utils'
import BTabs from '@components/tabs/Tabs'
import BTabItem from '@components/tabs/TabItem'

let wrapper

const WrapperComp = {
    template: `
        <BTabs value="tab1">
            <BTabItem value="tab1"></BTabItem>
            <BTabItem value="tab2" :visible="false"></BTabItem>
        </BTabs>`,
    components: {
        BTabs, BTabItem
    }
}

describe('BTabs', () => {
    beforeEach(() => {
        wrapper = mount(WrapperComp).find(BTabs)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BTabs')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('manage main classes accordingly', () => {
        wrapper.setProps({
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
        wrapper.vm.activeId = idx

        await wrapper.vm.$nextTick() // Wait until $emits have been handled

        const valueEmitted = wrapper.emitted().input

        expect(valueEmitted).toBeTruthy()
        expect(valueEmitted[0][0]).toBe(idx)
    })

    it('emit input event with value when childClick is called', async () => {
        const val = 'tab2'

        wrapper.vm.childClick(wrapper.vm.items[1])
        wrapper.vm.childClick(wrapper.vm.items[1])

        await wrapper.vm.$nextTick() // Wait until $emits have been handled

        const valueEmitted = wrapper.emitted().input
        expect(valueEmitted[0][0]).toBe(val)
        // Will be called only once even if we clicked multiple times
        expect(valueEmitted.length).toBe(1)
    })

    it('updates the tab when the value is changed', async () => {
        wrapper.setProps({value: 'tab2'})

        expect(wrapper.vm.activeId).toBe('tab2')

        wrapper.setProps({value: 0})

        expect(wrapper.vm.activeId).toBe('tab1')
    })

    it('finds the children in descendants', () => {
        const testCmp = {
            template: `
                <div>
                    <BTabItem></BTabItem>
                    <BTabItem></BTabItem>
                </div>`,
            components: {BTabItem}
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
        }).find(BTabs)

        expect(wrapper.vm.items.length).toBe(6)
        expect(wrapper.vm.items.map((i) => i.index)).toEqual([0, 1, 2, 3, 4, 5])
    })

    it('doesn\'t show a tab if value is null', () => {
        wrapper.setProps({value: null})

        expect(wrapper.vm.activeId).toBeNull()
        expect(wrapper.vm.activeTab).toBe(undefined)
    })

    it('still renders if there is no item', () => {
        wrapper = mount({
            template: `<BTabs value="tab1"></BTabs>`,
            components: {
                BTabs
            }
        }).find(BTabs)
        expect(wrapper.html()).toMatchSnapshot()
    })
})
