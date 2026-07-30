import { defineComponent } from 'vue'

import { createAbsoluteElement, removeElement, translateTouchAsDragEvent } from '../../../utils/helpers'
import type {
    ITableColumn,
    TableColumnDragEvent,
    TableDragMixinHost,
    TableRow,
    TableRowDragEvent
} from '../types'

export default defineComponent({
    props: {
        draggable: {
            type: Boolean,
            default: false
        },
        draggableColumn: {
            type: Boolean,
            default: false
        }
    },
    emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        columndragend: (_event: TableColumnDragEvent) => true,
        columndragleave: (_event: TableColumnDragEvent) => true,
        columndragover: (_event: TableColumnDragEvent) => true,
        columndragstart: (_event: TableColumnDragEvent) => true,
        columndrop: (_event: TableColumnDragEvent) => true,
        dragend: (_event: TableRowDragEvent) => true,
        dragleave: (_event: TableRowDragEvent) => true,
        dragover: (_event: TableRowDragEvent) => true,
        dragstart: (_event: TableRowDragEvent) => true,
        drop: (_event: TableRowDragEvent) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
    },
    data() {
        return {
            isDraggingRow: false,
            isDraggingColumn: false,
            // for touch-enabled devices
            mayBeTouchDragging: false,
            touchDragoverTarget: null as Element | null,
            _draggedCellEl: undefined as Element | undefined,
            draggedCellContent: ''
        }
    },
    computed: {
        canDragRow(): boolean {
            return this.draggable && !this.isDraggingColumn
        },
        canDragColumn(): boolean {
            return this.draggableColumn && !this.isDraggingRow
        }
    },
    methods: {
        /*
        * Emits drag start event (row)
        */
        handleDragStart(event: DragEvent, row: TableRow, index: number) {
            if (!this.canDragRow) return
            this.isDraggingRow = true
            this.$emit('dragstart', { event, row, index })
        },
        /*
        * Emits drag leave event (row)
        */
        handleDragEnd(event: DragEvent, row: TableRow, index: number) {
            if (!this.canDragRow) return
            this.isDraggingRow = false
            this.$emit('dragend', { event, row, index })
        },
        /*
        * Emits drop event (row)
        */
        handleDrop(event: DragEvent, row: TableRow, index: number) {
            if (!this.canDragRow) return
            this.$emit('drop', { event, row, index })
        },
        /*
        * Emits drag over event (row)
        */
        handleDragOver(event: DragEvent, row: TableRow, index: number) {
            if (!this.canDragRow) return
            this.$emit('dragover', { event, row, index })
        },
        /*
        * Emits drag leave event (row)
        */
        handleDragLeave(event: DragEvent, row: TableRow, index: number) {
            if (!this.canDragRow) return
            this.$emit('dragleave', { event, row, index })
        },

        /*
        * Emits drag start event (column)
        */
        handleColumnDragStart(event: DragEvent, column: ITableColumn, index: number) {
            if (!this.canDragColumn) return
            this.isDraggingColumn = true
            this.$emit('columndragstart', { event, column, index })
        },

        /*
        * Emits drag leave event (column)
        */
        handleColumnDragEnd(event: DragEvent, column: ITableColumn, index: number) {
            if (!this.canDragColumn) return
            this.isDraggingColumn = false
            this.$emit('columndragend', { event, column, index })
        },

        /*
        * Emits drop event (column)
        */
        handleColumnDrop(event: DragEvent, column: ITableColumn, index: number) {
            if (!this.canDragColumn) return
            this.$emit('columndrop', { event, column, index })
        },

        /*
        * Emits drag over event (column)
        */
        handleColumnDragOver(event: DragEvent, column: ITableColumn, index: number) {
            if (!this.canDragColumn) return
            this.$emit('columndragover', { event, column, index })
        },

        /*
        * Emits drag leave event (column)
        */
        handleColumnDragLeave(event: DragEvent, column: ITableColumn, index: number) {
            if (!this.canDragColumn) return
            this.$emit('columndragleave', { event, column, index })
        },

        /*
        * Starts monitoring drag-by-touch events (row on touch-enabled devices)
        */
        handleTouchStart(event: TouchEvent, row: TableRow) {
            if (!this.canDragRow) return
            if (this.isDraggingColumn) return
            // drag won't start unless the row has been clicked (tapped)
            // I think trapping touch-scrolling is annoying
            if ((this as unknown as TableDragMixinHost)._selectedRow !== row) return
            event.preventDefault()
            this.mayBeTouchDragging = true
        },
        /*
        * Emits dragover and dragleave events (row on touch-enabled devices)
        *
        * Emits also dragstart if this is the first touchmove after touchstart.
        */
        handleTouchMove(event: TouchEvent) {
            if (!this.canDragRow) return
            if (!this.mayBeTouchDragging) return
            if (!this.isDraggingRow) {
                const eventTarget = event.target! as HTMLElement
                const tr = eventTarget.closest('tr')
                this.draggedCellContent = tr
                    ? `<table class="table"><tr>${tr.innerHTML}</tr></table>`
                    : eventTarget.innerHTML;
                (this.$refs.draggedCell as HTMLElement).style.width = tr
                    ? `${tr.offsetWidth}px`
                    : `${eventTarget.offsetWidth}px`
                eventTarget.dispatchEvent(translateTouchAsDragEvent(event, {
                    type: 'dragstart'
                }))
            }
            this._updateTouchDragoverTarget(event, event.touches[0])
        },
        /*
        * Emits drop and dragend events (row on touch-enabled devices)
        */
        handleTouchEnd(event: TouchEvent) {
            if (!this.canDragRow) return
            if (this.isDraggingRow) {
                this._dispatchTouchDropAndDragEnd(event)
                ;(this as unknown as TableDragMixinHost)._selectedRow = null
            }
            this.mayBeTouchDragging = false
        },

        /*
        * Starts monitoring drag-by-touch events (column on touch-enabled devices)
        */
        handleColumnTouchStart(event: TouchEvent) {
            if (!this.canDragColumn) return
            if (this.isDraggingRow) return
            event.preventDefault() // otherwise triggers touch-scrolling
            this.mayBeTouchDragging = true
        },
        /*
        * Emits dragover and dragleave events (column on touch-enabled devices)
        *
        * Also emits dragstart if this is the first touchmove after touchstart.
        */
        handleColumnTouchMove(event: TouchEvent) {
            if (!this.canDragColumn) return
            if (!this.mayBeTouchDragging) return
            if (!this.isDraggingColumn) {
                const eventTarget = event.target! as HTMLElement
                this.draggedCellContent = eventTarget.innerHTML;
                (this.$refs.draggedCell as HTMLElement).style.width = `${eventTarget.offsetWidth}px`
                eventTarget.dispatchEvent(translateTouchAsDragEvent(event, {
                    type: 'dragstart'
                }))
            }
            this._updateTouchDragoverTarget(event, event.touches[0])
        },
        /*
        * Emits drop and dragend events (column on touch-enabled devices)
        */
        handleColumnTouchEnd(event: TouchEvent) {
            if (!this.canDragColumn) return
            if (this.isDraggingColumn) {
                this._dispatchTouchDropAndDragEnd(event)
            }
            this.mayBeTouchDragging = false
        },

        /*
        * Shared by `handleTouchMove`/`handleColumnTouchMove`: dispatches
        * dragover/dragleave as the touch point crosses between elements.
        */
        _updateTouchDragoverTarget(event: TouchEvent, touch: Touch) {
            const target = document.elementFromPoint(touch.clientX, touch.clientY)
            if (target != null) {
                if (target !== this.touchDragoverTarget) {
                    if (this.touchDragoverTarget != null) {
                        this.touchDragoverTarget.dispatchEvent(
                            translateTouchAsDragEvent(event, {
                                type: 'dragleave',
                                target: this.touchDragoverTarget
                            })
                        )
                    }
                    this.touchDragoverTarget = target
                    target.dispatchEvent(
                        translateTouchAsDragEvent(event, {
                            type: 'dragover',
                            target
                        })
                    )
                }
            } else if (this.touchDragoverTarget != null) {
                this.touchDragoverTarget.dispatchEvent(
                    translateTouchAsDragEvent(event, {
                        type: 'dragleave',
                        target: this.touchDragoverTarget
                    })
                )
                this.touchDragoverTarget = null
            }
            this.updateDraggedCell(touch)
        },

        /*
        * Shared by `handleTouchEnd`/`handleColumnTouchEnd`: dispatches the
        * final drop (on the element under the touch point) and dragend.
        */
        _dispatchTouchDropAndDragEnd(event: TouchEvent) {
            const touch = event.changedTouches[0]
            const target = document.elementFromPoint(touch.clientX, touch.clientY)
            if (target != null) {
                target.dispatchEvent(translateTouchAsDragEvent(event, {
                    type: 'drop',
                    target
                }))
            }
            event.target!.dispatchEvent(translateTouchAsDragEvent(event, {
                type: 'dragend'
            }))
        },

        updateDraggedCell({ clientX, clientY }: { clientX: number, clientY: number }) {
            const cellRect = (this.$refs.draggedCell as HTMLElement).getBoundingClientRect()
            const top = clientY + window.scrollY - cellRect.height / 2
            const left = clientX + window.scrollX - cellRect.width / 2;
            (this.$refs.draggedCell as HTMLElement).style.top = `calc(${top}px)`;
            (this.$refs.draggedCell as HTMLElement).style.left = `calc(${left}px)`
        }
    },
    mounted() {
        // appends `draggedCell` to the body whenever `draggable` or
        // `draggableColumn` becomes true
        // starts watching here to make sure the DOM is ready
        const prepareDraggedCell = (isDraggable: boolean) => {
            if (isDraggable && this.$data._draggedCellEl == null) {
                this.$data._draggedCellEl =
                    createAbsoluteElement(this.$refs.draggedCell as HTMLElement)
            }
        }
        this.$watch('draggable', prepareDraggedCell, { immediate: true })
        this.$watch('draggableColumn', prepareDraggedCell, { immediate: true })
    },
    beforeUnmount() {
        if (this.$data._draggedCellEl) {
            removeElement(this.$data._draggedCellEl)
        }
    }
})
