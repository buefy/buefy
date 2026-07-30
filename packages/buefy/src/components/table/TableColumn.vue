<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

import { toCssWidth } from '../../utils/helpers'
import {
    computeColumnStyle,
    computeIsHeaderUnselectable,
    computeRootClasses,
    computeRootClassesForRow,
    computeRootStyleForRow,
    computeThClasses,
    computeThStyle
} from './tableColumnHelpers'
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
            return computeThClasses(this as unknown as ITableColumn)
        },
        thStyle() {
            return computeThStyle(this as unknown as ITableColumn)
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
            return computeRootClasses(this as unknown as ITableColumn)
        },
        style() {
            return computeColumnStyle(this as unknown as ITableColumn)
        },
        hasDefaultSlot() {
            return !!this.$slots.default
        },
        /*
         * Return if column header is un-selectable
         */
        isHeaderUnSelectable() {
            return computeIsHeaderUnselectable(this as unknown as ITableColumn)
        }
    },
    methods: {
        getRootClasses(row: TableRow) {
            return computeRootClassesForRow(this as unknown as ITableColumn, row)
        },
        getRootStyle(row: TableRow) {
            return computeRootStyleForRow(this as unknown as ITableColumn, row)
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
