import { defineComponent } from 'vue'
import type { PropType } from 'vue'

import type { TableRow } from '../types'

export default defineComponent({
    props: {
        detailed: Boolean,
        showDetailIcon: {
            type: Boolean,
            default: true
        },
        detailIcon: {
            type: String,
            default: 'chevron-right'
        },
        openedDetailed: {
            type: Array<TableRow>,
            default: () => []
        },
        hasDetailedVisible: {
            type: Function as PropType<(row: TableRow) => boolean>,
            default: () => true
        },
        detailKey: {
            type: String,
            default: ''
        },
        detailTransition: {
            type: String,
            default: ''
        },
        customDetailRow: {
            type: Boolean,
            default: false
        }
    },
    emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        'details-close': (_row: TableRow) => true,
        'details-open': (_row: TableRow) => true,
        'update:openedDetailed': (_rows: TableRow[]) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
    },
    data() {
        return {
            visibleDetailRows: this.openedDetailed as TableRow[]
        }
    },
    watch: {
        /*
        * When the user wants to control the detailed rows via props.
        * Or wants to open the details of certain row with the router for example.
        */
        openedDetailed(expandedRows: TableRow[]) {
            this.visibleDetailRows = expandedRows
        }
    },
    methods: {
        /*
        * Toggle to show/hide details slot
        */
        toggleDetails(obj: TableRow) {
            const found = this.isVisibleDetailRow(obj)

            if (found) {
                this.closeDetailRow(obj)
                this.$emit('details-close', obj)
            } else {
                this.openDetailRow(obj)
                this.$emit('details-open', obj)
            }

            // Syncs the detailed rows with the parent component
            this.$emit('update:openedDetailed', this.visibleDetailRows)
        },

        openDetailRow(obj: TableRow) {
            const index = this.handleDetailKey(obj)
            this.visibleDetailRows.push(index)
        },

        closeDetailRow(obj: TableRow) {
            const index = this.handleDetailKey(obj)
            const i = this.visibleDetailRows.indexOf(index)
            if (i >= 0) {
                this.visibleDetailRows.splice(i, 1)
            }
        },

        isVisibleDetailRow(obj: TableRow) {
            const index = this.handleDetailKey(obj)
            return this.visibleDetailRows.indexOf(index) >= 0
        },

        isActiveDetailRow(row: TableRow) {
            return this.detailed && !this.customDetailRow && this.isVisibleDetailRow(row)
        },

        isActiveCustomDetailRow(row: TableRow) {
            return this.detailed && this.customDetailRow && this.isVisibleDetailRow(row)
        },

        /*
        * When the detailKey is defined we use the object[detailKey] as index.
        * If not, use the object reference by default.
        */
        handleDetailKey(index: TableRow) {
            const key = this.detailKey
            return !key.length || !index
                ? index
                : index[key]
        },

        checkPredefinedDetailedRows() {
            const defaultExpandedRowsDefined = this.openedDetailed.length > 0
            if (defaultExpandedRowsDefined && !this.detailKey.length) {
                throw new Error('If you set a predefined opened-detailed, you must provide a unique key using the prop "detail-key"')
            }
        }
    }
})
