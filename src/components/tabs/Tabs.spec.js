import { shallowMount } from '@vue/test-utils'
import BTabs from '@components/tabs/Tabs'

let wrapper

const mockTabItems = (active = false) => {
    return {
        name: 'BTabItem',
        template: '<div></div>',
        data() {
            return {
                _isTabItem: true,
                isActive: active,
                visible: active,
                clickable: active
            }
        },
        methods: {
            activate: jest.fn(),
            deactivate: jest.fn()
        }
    }
}

describe('BTabs', () => {
    beforeEach(() => {
        wrapper = shallowMount(BTabs, {
            stub: ['b-tab-item'],
            slots: {
                default: [
                    mockTabItems(true),
                    mockTabItems()
                ]
            }
        })
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

    it('calls changeTab when value is changed', () => {
        wrapper.vm.changeTab = jest.fn()
        wrapper.setProps({value: 1})
        expect(wrapper.vm.changeTab).toHaveBeenCalled()
    })

    it('emit change event with value when changeTab is called', () => {
        const idx = 1
        wrapper.vm.changeTab(idx)
        const valueEmitted = wrapper.emitted()['change'][0]
        expect(valueEmitted).toContainEqual(idx)
        expect(wrapper.vm.activeTab).toEqual(idx)
    })

    it('emit input event with value when tabClick is called', () => {
        const val = 1
        wrapper.vm.changeTab = jest.fn((newIndex) => {
            wrapper.vm.activeTab = newIndex
        })
        wrapper.vm.tabClick(val)
        wrapper.vm.tabClick(val)
        const valueEmitted = wrapper.emitted()['input'][0]
        expect(valueEmitted).toContainEqual(val)
        // Will be called only once even if we clicked multiple times
        expect(wrapper.vm.changeTab).toHaveBeenCalledTimes(1)
    })
})
