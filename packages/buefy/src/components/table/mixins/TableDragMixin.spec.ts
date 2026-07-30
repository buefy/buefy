import { defineComponent } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import TableDragMixin from '@components/table/mixins/TableDragMixin'
import type { ITableColumn } from '@components/table/types'

// jsdom implements neither DataTransfer nor DragEvent, but the shared touch
// helpers under test (via `translateTouchAsDragEvent`) construct real ones.
if (typeof DataTransfer === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).DataTransfer = class DataTransfer {}
}
if (typeof DragEvent === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).DragEvent = class DragEvent extends Event {
        dataTransfer: unknown
        screenX: number
        screenY: number
        clientX: number
        clientY: number
        ctrlKey: boolean
        shiftKey: boolean
        altKey: boolean
        metaKey: boolean

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(type: string, init: any = {}) {
            super(type, init) // handles standard EventInit fields (e.g. bubbles)
            this.dataTransfer = init.dataTransfer ?? null
            this.screenX = init.screenX ?? 0
            this.screenY = init.screenY ?? 0
            this.clientX = init.clientX ?? 0
            this.clientY = init.clientY ?? 0
            this.ctrlKey = !!init.ctrlKey
            this.shiftKey = !!init.shiftKey
            this.altKey = !!init.altKey
            this.metaKey = !!init.metaKey
        }
    }
}

function makeTouch(overrides: Partial<Touch> = {}) {
    return {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        ...overrides
    } as Touch
}

// Minimal host providing the `_selectedRow` member and the `draggedCell`
// ref that `TableDragMixin` reads from `Table.vue` (see `TableDragMixinHost`
// in types.ts, and the `touch-dragged-cell` element in Table.vue's template).
const HostComponent = defineComponent({
    mixins: [TableDragMixin],
    data() {
        return { _selectedRow: null as unknown }
    },
    template: '<div><div ref="draggedCell" /></div>'
})

describe('TableDragMixin', () => {
    let wrapper: VueWrapper<InstanceType<typeof HostComponent>>

    beforeEach(() => {
        wrapper = mount(HostComponent, {
            props: { draggable: true, draggableColumn: true },
            attachTo: document.body
        })
    })

    afterEach(() => {
        wrapper.unmount()
    })

    it('canDragRow/canDragColumn are mutually exclusive while a drag is active', async () => {
        expect(wrapper.vm.canDragRow).toBe(true)
        expect(wrapper.vm.canDragColumn).toBe(true)

        await wrapper.setData({ isDraggingColumn: true })
        expect(wrapper.vm.canDragRow).toBe(false)

        await wrapper.setData({ isDraggingColumn: false, isDraggingRow: true })
        expect(wrapper.vm.canDragColumn).toBe(false)
    })

    it('handleDragStart/handleDragEnd toggle isDraggingRow and emit', () => {
        const row = { id: 1 }
        wrapper.vm.handleDragStart({ type: 'dragstart' } as unknown as DragEvent, row, 0)
        expect(wrapper.vm.isDraggingRow).toBe(true)
        expect(wrapper.emitted('dragstart')![0][0]).toMatchObject({ row, index: 0 })

        wrapper.vm.handleDragEnd({ type: 'dragend' } as unknown as DragEvent, row, 0)
        expect(wrapper.vm.isDraggingRow).toBe(false)
        expect(wrapper.emitted('dragend')![0][0]).toMatchObject({ row, index: 0 })
    })

    it('handleColumnDragStart/handleColumnDragEnd toggle isDraggingColumn and emit', () => {
        const column = { field: 'name' } as unknown as ITableColumn
        wrapper.vm.handleColumnDragStart({ type: 'dragstart' } as unknown as DragEvent, column, 0)
        expect(wrapper.vm.isDraggingColumn).toBe(true)
        expect(wrapper.emitted('columndragstart')![0][0]).toMatchObject({ column, index: 0 })

        wrapper.vm.handleColumnDragEnd({ type: 'dragend' } as unknown as DragEvent, column, 0)
        expect(wrapper.vm.isDraggingColumn).toBe(false)
        expect(wrapper.emitted('columndragend')![0][0]).toMatchObject({ column, index: 0 })
    })

    it('handleTouchStart only arms row-dragging for the tapped row', async () => {
        const row = { id: 1 }
        wrapper.vm.handleTouchStart(
            { preventDefault: vi.fn() } as unknown as TouchEvent, row
        )
        expect(wrapper.vm.mayBeTouchDragging).toBe(false) // row was never "tapped"

        await wrapper.setData({ _selectedRow: row })
        // `setData` stores a reactive proxy of `row`, not `row` itself, so
        // read it back to match the identity check `handleTouchStart` does
        // against the row it's passed (mirrors how `row` and `_selectedRow`
        // are always read from the same reactive source in production).
        const storedRow = wrapper.vm.$data._selectedRow
        wrapper.vm.handleTouchStart(
            { preventDefault: vi.fn() } as unknown as TouchEvent, storedRow
        )
        expect(wrapper.vm.mayBeTouchDragging).toBe(true)
    })

    describe('touch drag (shared _updateTouchDragoverTarget/_dispatchTouchDropAndDragEnd helpers)', () => {
        let dropTarget: HTMLElement
        const originalElementFromPoint = document.elementFromPoint

        beforeEach(() => {
            dropTarget = document.createElement('td')
            document.body.appendChild(dropTarget)
            // jsdom doesn't implement elementFromPoint at all, so it can't be spied on
            document.elementFromPoint = vi.fn().mockReturnValue(dropTarget)
        })

        afterEach(() => {
            document.elementFromPoint = originalElementFromPoint
            dropTarget.remove()
        })

        it('handleTouchMove dispatches dragover on the touched element via the shared helper', async () => {
            const dropTargetListener = vi.fn()
            dropTarget.addEventListener('dragover', dropTargetListener)
            const eventTarget = document.createElement('td')
            document.body.appendChild(eventTarget)

            await wrapper.setData({ mayBeTouchDragging: true })
            wrapper.vm.handleTouchMove({
                target: eventTarget,
                touches: [makeTouch()],
                changedTouches: [makeTouch()]
            } as unknown as TouchEvent)

            expect(dropTargetListener).toHaveBeenCalled()
            expect(wrapper.vm.touchDragoverTarget).toBe(dropTarget)
            eventTarget.remove()
        })

        it('handleTouchEnd dispatches drop/dragend and clears _selectedRow via the shared helper', async () => {
            const dropTargetListener = vi.fn()
            dropTarget.addEventListener('drop', dropTargetListener)
            const row = { id: 1 }
            await wrapper.setData({ _selectedRow: row, isDraggingRow: true })

            wrapper.vm.handleTouchEnd({
                target: dropTarget,
                touches: [makeTouch()],
                changedTouches: [makeTouch()]
            } as unknown as TouchEvent)

            expect(dropTargetListener).toHaveBeenCalled()
            expect(wrapper.vm.$data._selectedRow).toBeNull()
            expect(wrapper.vm.mayBeTouchDragging).toBe(false)
        })

        it('handleColumnTouchEnd dispatches drop/dragend without touching _selectedRow', async () => {
            const dropTargetListener = vi.fn()
            dropTarget.addEventListener('drop', dropTargetListener)
            const row = { id: 1 }
            await wrapper.setData({ _selectedRow: row, isDraggingColumn: true })

            wrapper.vm.handleColumnTouchEnd({
                target: dropTarget,
                touches: [makeTouch()],
                changedTouches: [makeTouch()]
            } as unknown as TouchEvent)

            expect(dropTargetListener).toHaveBeenCalled()
            expect(wrapper.vm.$data._selectedRow).toEqual(row) // unaffected for column drags
        })
    })

    describe('_draggedCellEl lifecycle', () => {
        it('creates _draggedCellEl once draggable becomes true, and removes it on unmount', async () => {
            const freshWrapper = mount(HostComponent, {
                props: { draggable: false, draggableColumn: false }
            })
            expect(freshWrapper.vm.$data._draggedCellEl).toBeUndefined()

            await freshWrapper.setProps({ draggable: true })
            expect(freshWrapper.vm.$data._draggedCellEl).toBeDefined()

            freshWrapper.unmount()
        })
    })
})
