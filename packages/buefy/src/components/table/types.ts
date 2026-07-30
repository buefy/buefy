// Defines types for the table.

import type { Slots } from 'vue'
import type { VueClassAttribute } from '../../utils/config'
import type { MultiColumnSortPriority } from '../../utils/helpers'

// Single unit value for `style` attributes.
export type StyleValueUnit = string | Record<string, string | undefined> | undefined

// Value for `style` attributes.
//
// We avoid using `StyleValue` provided by `vue` because it may end up with
// type errors due to excessively deep recursion in type inference.
export type StyleValue = StyleValueUnit | StyleValueUnit[]

// Table row has any type unless we could use generics.
// I have not figured out how to enable generics in the Options API so far.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TableRow = any

// Type that represents the order of a table column.
export type TableColumnOrder = MultiColumnSortPriority<TableRow>

// Type for a custom sort function.
export type CustomSortFunction = TableColumnOrder['customSort']

// Type for a custom search function.
export type CustomSearchFunction = (row: TableRow, input: string | number) => boolean

// Props of a table column.
export interface TableColumnProps {
    label?: string
    customKey?: string | number
    field?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    meta?: any
    width?: string | number
    numeric?: boolean
    centered?: boolean
    searchable?: boolean
    sortable?: boolean
    visible?: boolean
    subheading?: string | number
    customSort?: CustomSortFunction
    customSearch?: CustomSearchFunction
    sticky?: boolean
    headerSelectable?: boolean
    headerClass?: string
    cellClass?: string
    /* eslint-disable @typescript-eslint/no-explicit-any, no-use-before-define */
    thAttrs?: (column: ITableColumn) => Record<string, any> | null
    tdAttrs?: (row: TableRow, column: ITableColumn) => Record<string, any> | null
    /* eslint-enable @typescript-eslint/no-explicit-any, no-use-before-define */
}

// Interface of a table column.
//
// Extends `TableColumnProps`, but `thAttrs` and `tdAttrs` must be defined.
export interface ITableColumn extends Omit<TableColumnProps, 'thAttrs' | 'tdAttrs'> {
    // non-null props
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    thAttrs: (column: ITableColumn) => Record<string, any> | null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tdAttrs: (row: TableRow, column: ITableColumn) => Record<string, any> | null
    // data public to Table
    newKey?: string | number
    _isTableColumn?: boolean
    // computed public to Table
    thClasses?: VueClassAttribute
    thStyle?: StyleValue
    thWrapStyle?: StyleValue
    style?: StyleValueUnit
    // public methods
    getRootClasses: (row: TableRow) => VueClassAttribute[]
    getRootStyle: (row: TableRow) => StyleValue
    // slots
    $slots: Slots
}

// Interface of the props that a slot of a table column receives.
export interface TableColumnSlotProps {
    row: TableRow
}

// Host of table columns; i.e., the Table component.
export interface TableColumnHost {
    _registerTableColumn(column: ITableColumn): void
    _unregisterTableColumn(column: ITableColumn): void
}

// Members of `Table.vue` itself that `TableCheckableMixin` reads.
// `visibleData` is the pagination-aware slice of data, owned by `Table.vue`.
export interface TableCheckableMixinHost {
    visibleData: TableRow[]
}

// Members of `Table.vue` itself that `TableDragMixin` reads/writes.
// `_selectedRow` tracks the row tapped before a touch-drag may begin; it's
// owned by `Table.vue`'s row-selection logic (`selectRow`).
export interface TableDragMixinHost {
    _selectedRow: TableRow | null
}

// Members of `Table.vue` itself that `TableSortMixin` reads/writes.
// `newColumns` is the resolved column list; `newData`/`data` are the
// (possibly re-sorted) working data and the original `data` prop. All are
// owned by `Table.vue`'s column/data plumbing.
export interface TableSortMixinHost {
    newColumns: ITableColumn[]
    newData: TableRow[]
    data: TableRow[]
}

// Members of `Table.vue` (column/data plumbing) and `TableSortMixin` that
// `TableFilterMixin` reads/writes/calls from `handleFiltersChange`, which
// re-sorts and re-totals the filtered data.
export interface TableFilterMixinHost {
    newColumns: ITableColumn[]
    data: TableRow[]
    newData: TableRow[]
    backendPagination: boolean
    newDataTotal: number | string
    backendSorting: boolean
    sortMultiple: boolean
    sortMultipleDataLocal: TableColumnOrder[]
    currentSortColumn: ITableColumn
    doSortMultiColumn(): void
    doSortSingleColumn(column: ITableColumn): void
}

// Modifier keys for operations, e.g., sorting, checking, in Table.
// It is mentioned as "event".
// TODO: we should not mix the UI matter and the logic of the Table component.
export interface ModifierKeys {
    shiftKey: boolean
    altKey: boolean
    ctrlKey: boolean
}

export interface TableRowDragEvent {
    event: DragEvent
    row: TableRow
    index: number
}

export interface TableColumnDragEvent {
    event: DragEvent
    column: ITableColumn
    index: number
}
