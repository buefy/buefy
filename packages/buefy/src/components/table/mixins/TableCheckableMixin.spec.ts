import { defineComponent } from 'vue'
import { beforeEach, describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import TableCheckableMixin from '@components/table/mixins/TableCheckableMixin'
import type { ModifierKeys } from '@components/table/types'

const noModifiers: ModifierKeys = { shiftKey: false, altKey: false, ctrlKey: false }
const shiftModifier: ModifierKeys = { shiftKey: true, altKey: false, ctrlKey: false }

// Minimal host providing the `visibleData` member that `TableCheckableMixin`
// reads from `Table.vue` (see `TableCheckableMixinHost` in types.ts).
const HostComponent = defineComponent({
    mixins: [TableCheckableMixin],
    props: {
        visibleData: {
            type: Array,
            default: () => []
        }
    },
    template: '<div></div>'
})

describe('TableCheckableMixin', () => {
    const data = [
        { id: 1, name: 'Jesse' },
        { id: 2, name: 'John' },
        { id: 3, name: 'Tina' }
    ]
    let wrapper: VueWrapper<InstanceType<typeof HostComponent>>

    beforeEach(() => {
        wrapper = shallowMount(HostComponent, {
            props: { visibleData: data }
        })
    })

    it('checks and unchecks a single row', () => {
        wrapper.vm.checkRow(data[0], 0, noModifiers)
        expect(wrapper.vm.newCheckedRows).toEqual([data[0]])
        expect(wrapper.emitted('check')![0]).toEqual([[data[0]], data[0]])

        wrapper.vm.checkRow(data[0], 0, noModifiers)
        expect(wrapper.vm.newCheckedRows).toEqual([])
    })

    it('checks a range of rows with shift-click', () => {
        wrapper.vm.checkRow(data[0], 0, noModifiers)
        wrapper.vm.checkRow(data[2], 2, shiftModifier)
        expect(wrapper.vm.newCheckedRows).toEqual(data)
    })

    it('checks and unchecks all rows via checkAll', () => {
        wrapper.vm.checkAll()
        expect(wrapper.vm.newCheckedRows).toEqual(data)
        expect(wrapper.vm.isAllChecked).toBe(true)

        wrapper.vm.checkAll()
        expect(wrapper.vm.newCheckedRows).toEqual([])
        expect(wrapper.vm.isAllChecked).toBe(false)
    })

    it('respects isRowCheckable when checking all', async () => {
        await wrapper.setProps({
            isRowCheckable: (row: { id: number }) => row.id !== 2
        })
        wrapper.vm.checkAll()
        expect(wrapper.vm.newCheckedRows).toEqual([data[0], data[2]])
        expect(wrapper.vm.isAllUncheckable).toBe(false)
    })

    it('is fully uncheckable when no row is checkable', async () => {
        await wrapper.setProps({ isRowCheckable: () => false })
        expect(wrapper.vm.isAllUncheckable).toBe(true)
        expect(wrapper.vm.isAllChecked).toBe(false)
    })

    it('syncs newCheckedRows when the checkedRows prop changes', async () => {
        await wrapper.setProps({ checkedRows: [data[1]] })
        expect(wrapper.vm.newCheckedRows).toEqual([data[1]])
    })
})
