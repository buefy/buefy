import { shallowMount } from '@vue/test-utils'
import BTableMobileSort from '@components/table/TableMobileSort'

let wrapper

describe('BTableMobileSort', () => {
    beforeEach(() => {
        wrapper = shallowMount(BTableMobileSort)
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BTableMobileSort')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    describe('showPlaceholder', () => {
        it('is true if there are no columns', () => {
            expect(wrapper.vm.showPlaceholder).toBeTruthy()
        })
    })

    it('set mobileSort value when currentSortColumn is changed', async () => {
        await wrapper.setProps({ currentSortColumn: 'val' })
        expect(wrapper.vm.mobileSort).toEqual(wrapper.vm.currentSortColumn)
    })

    it('emit sort event with mobileSort value when sort is called', () => {
        wrapper.vm.mobileSort = 'val'
        wrapper.vm.sort()
        const valueEmitted = wrapper.emitted().sort[0]
        expect(valueEmitted).toContainEqual(wrapper.vm.mobileSort)
    })
})
