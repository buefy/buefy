// Pure column-computation helpers shared by `TableColumn.vue` (a real
// component, used for `<b-table-column>` slot children) and
// `mockTableColumn.ts` (a plain object, used for the `columns` prop).
// Both need identical derived column state, so the logic lives here once.

import { toCssWidth } from '../../utils/helpers'
import type { VueClassAttribute } from '../../utils/config'
import type { ITableColumn, StyleValue, StyleValueUnit, TableRow } from './types'

export function computeIsHeaderUnselectable(column: ITableColumn): boolean {
    return !column.headerSelectable && !!column.sortable
}

export function computeColumnStyle(column: ITableColumn): StyleValueUnit {
    return {
        width: toCssWidth(column.width) ?? undefined // null → undefined to satisfy StyleValue
    }
}

export function computeThClasses(column: ITableColumn): VueClassAttribute {
    const attrs = column.thAttrs(column)
    const classes = [column.headerClass, {
        'is-sortable': column.sortable,
        'is-sticky': column.sticky,
        'is-unselectable': computeIsHeaderUnselectable(column)
    }]
    if (attrs && attrs.class) {
        classes.push(attrs.class)
    }
    return classes
}

export function computeThStyle(column: ITableColumn): StyleValue {
    const attrs = column.thAttrs(column)
    const style = [computeColumnStyle(column)]
    if (attrs && attrs.style) {
        style.push(attrs.style)
    }
    return style
}

export function computeRootClasses(column: ITableColumn): VueClassAttribute {
    return [column.cellClass, {
        'has-text-right': column.numeric && !column.centered,
        'has-text-centered': column.centered,
        'is-sticky': column.sticky
    }]
}

export function computeRootClassesForRow(column: ITableColumn, row: TableRow): VueClassAttribute[] {
    const attrs = column.tdAttrs(row, column)
    const classes = [computeRootClasses(column)]
    if (attrs && attrs.class) {
        classes.push(attrs.class)
    }
    return classes
}

export function computeRootStyleForRow(column: ITableColumn, row: TableRow): StyleValue {
    const attrs = column.tdAttrs(row, column)
    const style: StyleValueUnit[] = []
    if (attrs && attrs.style) {
        style.push(attrs.style)
    }
    return style
}
