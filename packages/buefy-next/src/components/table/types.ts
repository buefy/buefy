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
