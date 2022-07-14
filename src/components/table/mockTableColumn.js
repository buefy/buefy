import { h as createElement } from 'vue'
import Emitter from 'tiny-emitter'

import { getValueByPath, toCssWidth } from '../../utils/helpers'

export default function mockTableColumn(table, column) {
    const eventEmitter = new Emitter()
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
        thAttrs: () => ({}),
        tdAttrs: () => ({})
    }
    return {
        // props
        ...defaultProps,
        ...column,
        // data
        parent: table,
        newKey: column.customKey || column.label,
        _isTableColumn: true,
        // inject
        $table: table,
        // computed
        get thClasses() {
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
        get thStyle() {
            const attrs = this.thAttrs(this)
            const style = [this.style]
            if (attrs && attrs.style) {
                style.push(attrs.style)
            }
            return style
        },
        get rootClasses() {
            return [this.cellClass, {
                'has-text-right': this.numeric && !this.centered,
                'has-text-centered': this.centered,
                'is-sticky': this.sticky
            }]
        },
        get style() {
            return {
                width: toCssWidth(this.width)
            }
        },
        get hasDefaultSlot() {
            return !!this.$scopedSlots.default
        },
        get isHeaderUnSelectable() {
            return !this.headerSelectable && this.sortable
        },
        // methods
        getRootClasses(row) {
            const attrs = this.tdAttrs(row, this)
            const classes = [this.rootClasses]
            if (attrs && attrs.class) {
                classes.push(attrs.class)
            }
            return classes
        },
        getRootStyle(row) {
            const attrs = this.tdAttrs(row, this)
            const style = []
            if (attrs && attrs.style) {
                style.push(attrs.style)
            }
            return style
        },
        $on: (...args) => eventEmitter.on(...args),
        $once: (...args) => eventEmitter.once(...args),
        $off: (...args) => eventEmitter.off(...args),
        $emit: (...args) => eventEmitter.emit(...args),
        // special fields
        _isVue: true,
        $scopedSlots: {
            default: (props) => {
                const vnode = createElement('span', {
                    innerHTML: getValueByPath(props.row, column.field)
                })
                return [vnode]
            }
        }
    }
}
