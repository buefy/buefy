import { defineComponent } from 'vue'
import { beforeEach, describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import TableDetailMixin from '@components/table/mixins/TableDetailMixin'

const HostComponent = defineComponent({
    mixins: [TableDetailMixin],
    template: '<div></div>'
})

describe('TableDetailMixin', () => {
    const data = [
        { id: 1, name: 'Jesse' },
        { id: 2, name: 'John' }
    ]
    let wrapper: VueWrapper<InstanceType<typeof HostComponent>>

    beforeEach(() => {
        wrapper = shallowMount(HostComponent, {
            props: { detailed: true, detailKey: 'id' }
        })
    })

    it('opens and closes a detail row via toggleDetails', () => {
        expect(wrapper.vm.isVisibleDetailRow(data[0])).toBe(false)

        wrapper.vm.toggleDetails(data[0])
        expect(wrapper.vm.isVisibleDetailRow(data[0])).toBe(true)
        expect(wrapper.emitted('details-open')![0]).toEqual([data[0]])
        expect(wrapper.emitted('update:openedDetailed')![0]).toEqual([[1]])

        wrapper.vm.toggleDetails(data[0])
        expect(wrapper.vm.isVisibleDetailRow(data[0])).toBe(false)
        expect(wrapper.emitted('details-close')![0]).toEqual([data[0]])
    })

    it('isActiveDetailRow/isActiveCustomDetailRow respect the customDetailRow flag', async () => {
        wrapper.vm.toggleDetails(data[0])
        expect(wrapper.vm.isActiveDetailRow(data[0])).toBe(true)
        expect(wrapper.vm.isActiveCustomDetailRow(data[0])).toBe(false)

        await wrapper.setProps({ customDetailRow: true })
        expect(wrapper.vm.isActiveDetailRow(data[0])).toBe(false)
        expect(wrapper.vm.isActiveCustomDetailRow(data[0])).toBe(true)
    })

    it('throws when openedDetailed is set without a detailKey', async () => {
        await wrapper.setProps({ openedDetailed: [data[0]], detailKey: '' })
        expect(() => wrapper.vm.checkPredefinedDetailedRows()).toThrow()
    })

    it('syncs visible detail rows from the openedDetailed prop', async () => {
        await wrapper.setProps({ openedDetailed: [2] })
        expect(wrapper.vm.isVisibleDetailRow(data[1])).toBe(true)
    })
})
