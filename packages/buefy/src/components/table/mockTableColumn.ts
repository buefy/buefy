import { h as createElement } from 'vue'
import type { Slots } from 'vue'

import { getValueByPath } from '../../utils/helpers'
import {
    computeColumnStyle,
    computeIsHeaderUnselectable,
    computeRootClasses,
    computeRootClassesForRow,
    computeRootStyleForRow,
    computeThClasses,
    computeThStyle
} from './tableColumnHelpers'
import type { VueClassAttribute } from '../../utils/config'
import type {
    ITableColumn,
    StyleValue,
    StyleValueUnit,
    TableColumnHost,
    TableColumnProps,
    TableColumnSlotProps,
    TableRow
} from './types'

export default function mockTableColumn(table: TableColumnHost, column: TableColumnProps) {
    const defaultProps = {
        label: undefined,
        customKey: undefined,
        field: undefined,
        meta: undefined,
        width: undefined,
        numeric: undefined,
        centered: undefined,
        searchable: undefined,
        sortable: undefined,
        visible: true,
        subheading: undefined,
        customSort: undefined,
        customSearch: undefined,
        sticky: undefined,
        headerSelectable: undefined,
        headerClass: undefined,
        /* eslint-disable @typescript-eslint/no-explicit-any */
        thAttrs: () => ({} as Record<string, any>),
        tdAttrs: () => ({} as Record<string, any>)
        /* eslint-enable @typescript-eslint/no-explicit-any */
    }
    return {
        // props
        ...defaultProps,
        ...column,
        // data
        newKey: column.customKey || column.label,
        _isTableColumn: true,
        // public computed
        get thClasses(): VueClassAttribute {
            return computeThClasses(this as unknown as ITableColumn)
        },
        get thStyle(): StyleValue {
            return computeThStyle(this as unknown as ITableColumn)
        },
        // NOTE: unlike `TableColumn.vue`'s `thWrapStyle`, this does not skip
        // percentage widths. That's a pre-existing inconsistency between
        // `columns`-prop tables and `<b-table-column>`-slot tables (see
        // Table.spec.ts's "holds columns" test, which asserts this exact
        // percentage-width behavior) — left as-is to avoid a behavior change.
        get thWrapStyle(): StyleValue {
            return this.style
        },
        get style(): StyleValueUnit {
            return computeColumnStyle(this as unknown as ITableColumn)
        },
        getRootClasses(row: TableRow) {
            return computeRootClassesForRow(this as unknown as ITableColumn, row)
        },
        getRootStyle(row: TableRow) {
            return computeRootStyleForRow(this as unknown as ITableColumn, row)
        },
        $slots: {
            default: (props: TableColumnSlotProps) => {
                const vnode = createElement('span', {
                    innerHTML: getValueByPath(props.row, column.field!)
                })
                return [vnode]
            }
        } as Slots,
        // private properties
        get rootClasses(): VueClassAttribute {
            return computeRootClasses(this as unknown as ITableColumn)
        },
        get isHeaderUnSelectable(): boolean {
            return computeIsHeaderUnselectable(this as unknown as ITableColumn)
        }
    }
}
