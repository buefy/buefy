import { shallowMount } from '@vue/test-utils'
import BTableMobileSort from '@components/table/TableMobileSort'

let wrapper

describe('BTableMobileSort', () => {
    beforeEach(() => {
        wrapper = shallowMount(BTableMobileSort, {sync: false})
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BTableMobileSort')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    describe('showPlaceholder', () => {
        it('is true if there are no columns', () => {
            expect(wrapper.vm.showPlaceholder).toBeTruthy()
        })
    })

    it('set mobileSort value when currentSortColumn is changed', (done) => {
        wrapper.setProps({currentSortColumn: 'val'})
        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.mobileSort).toEqual(wrapper.vm.currentSortColumn)
            done()
        })
    })

    it('emit sort event with mobileSort value when sort is called', () => {
        wrapper.vm.mobileSort = 'val'
        wrapper.vm.sort()
        const valueEmitted = wrapper.emitted()['sort'][0]
        expect(valueEmitted).toContainEqual(wrapper.vm.mobileSort)
    })
})
