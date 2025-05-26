import { h as createElement } from 'vue'
import type { Slots } from 'vue'

import type { VueClassAttribute } from '../../utils/config'
import { getValueByPath, toCssWidth } from '../../utils/helpers'
import type {
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
            const attrs = this.thAttrs(this)
            const classes = [this.headerClass, {
                'is-sortable': this.sortable,
                'is-sticky': this.sticky,
                'is-unselectable': this.isHeaderUnSelectable
            }]
            if (attrs && attrs.class) {
                classes.push(attrs.class)
            }
            return classes
        },
        get thStyle(): StyleValue {
            const attrs = this.thAttrs(this)
            const style = [this.style]
            if (attrs && attrs.style) {
                style.push(attrs.style)
            }
            return style
        },
        get thWrapStyle(): StyleValue {
            return this.style
        },
        get style(): StyleValueUnit {
            return {
                width: toCssWidth(this.width) ?? undefined // null → undefined to satisfy StyleValue
            }
        },
        getRootClasses(row: TableRow) {
            const attrs = this.tdAttrs(row, this)
            const classes = [this.rootClasses]
            if (attrs && attrs.class) {
                classes.push(attrs.class)
            }
            return classes
        },
        getRootStyle(row: TableRow) {
            const attrs = this.tdAttrs(row, this)
            const style = []
            if (attrs && attrs.style) {
                style.push(attrs.style)
            }
            return style
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
            return [this.cellClass, {
                'has-text-right': this.numeric && !this.centered,
                'has-text-centered': this.centered,
                'is-sticky': this.sticky
            }]
        },
        get isHeaderUnSelectable(): boolean {
            return !this.headerSelectable && !!this.sortable
        }
    }
}
