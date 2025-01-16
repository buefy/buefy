<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

import { toCssWidth } from '../../utils/helpers'
import type {
    CustomSearchFunction,
    CustomSortFunction,
    ITableColumn,
    TableColumnHost,
    TableRow
} from './types'

export default defineComponent({
    name: 'BTableColumn',
    inject: {
        $table: { name: '$table', default: false }
    },
    props: {
        label: String,
        customKey: [String, Number],
        field: String,
        meta: [String, Number, Boolean, Function, Object, Array],
        width: [Number, String],
        numeric: Boolean,
        centered: Boolean,
        searchable: Boolean,
        sortable: Boolean,
        visible: {
            type: Boolean,
            default: true
        },
        subheading: [String, Number],
        customSort: Function as PropType<CustomSortFunction>,
        customSearch: Function as PropType<CustomSearchFunction>,
        sticky: Boolean,
        headerSelectable: Boolean,
        headerClass: String,
        cellClass: String,
        thAttrs: {
            type: Function as PropType<ITableColumn['thAttrs']>,
            default: () => ({})
        },
        tdAttrs: {
            type: Function as PropType<ITableColumn['tdAttrs']>,
            default: () => ({})
        }
    },
    data() {
        return {
            newKey: this.customKey || this.label,
            _isTableColumn: true
        }
    },
    computed: {
        thClasses() {
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
        thStyle() {
            const attrs = this.thAttrs(this)
            const style = [this.style]
            if (attrs && attrs.style) {
                style.push(attrs.style)
            }
            return style
        },
        thWrapStyle() {
            const width = toCssWidth(this.width)
            // interestingly, percentage width on the th element has effect
            // so we won't apply it to .th-wrap
            if (width != null && !width.trim().endsWith('%')) {
                return { width }
            } else {
                return {}
            }
        },
        rootClasses() {
            return [this.cellClass, {
                'has-text-right': this.numeric && !this.centered,
                'has-text-centered': this.centered,
                'is-sticky': this.sticky
            }]
        },
        style() {
            return {
                width: toCssWidth(this.width) ?? undefined // null → undefined to satisfy StyleValue
            }
        },
        hasDefaultSlot() {
            return !!this.$slots.default
        },
        /**
         * Return if column header is un-selectable
         */
        isHeaderUnSelectable() {
            return !this.headerSelectable && this.sortable
        }
    },
    methods: {
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
        }
    },
    created() {
        if (!this.$table) {
            throw new Error('You should wrap bTableColumn on a bTable')
        }
        (this.$table as TableColumnHost)._registerTableColumn(this)
    },
    beforeUnmount() {
        (this.$table as TableColumnHost)._unregisterTableColumn(this)
    },
    render() {
        // renderless
        return null
    }
})
</script>
