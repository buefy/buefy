import { defineComponent } from 'vue'
import type { PropType } from 'vue'

import { indexOf } from '../../../utils/helpers'
import type { ModifierKeys, TableCheckableMixinHost, TableRow } from '../types'

export default defineComponent({
    props: {
        checkable: Boolean,
        headerCheckable: {
            type: Boolean,
            default: true
        },
        checkboxType: {
            type: String,
            default: 'is-primary'
        },
        checkboxPosition: {
            type: String,
            default: 'left',
            validator: (value) => {
                return [
                    'left',
                    'right'
                ].indexOf(value as string) >= 0
            }
        },
        stickyCheckbox: {
            type: Boolean,
            default: false
        },
        customIsChecked: Function as PropType<(a: TableRow, b: TableRow) => boolean>,
        isRowCheckable: {
            type: Function as PropType<(row: TableRow) => boolean>,
            default: () => true
        },
        checkedRows: {
            type: Array<TableRow>,
            default: () => []
        }
    },
    emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        check: (_checkedRows: TableRow[], _row?: TableRow) => true,
        'check-all': (_rows: TableRow[]) => true,
        'update:checkedRows': (_rows: TableRow[]) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
    },
    data() {
        return {
            newCheckedRows: [...this.checkedRows] as TableRow[],
            lastCheckedRowIndex: null as number | null
        }
    },
    computed: {
        /*
        * Check if all rows in the page are checked.
        */
        isAllChecked(): boolean {
            const visibleData = (this as unknown as TableCheckableMixinHost).visibleData
            const validVisibleData = visibleData.filter((row) => this.isRowCheckable(row))
            if (validVisibleData.length === 0) return false
            const isAllChecked = validVisibleData.some((currentVisibleRow) => {
                return indexOf(this.newCheckedRows, currentVisibleRow, this.customIsChecked) < 0
            })
            return !isAllChecked
        },

        /*
        * Check if all rows in the page are checkable.
        */
        isAllUncheckable(): boolean {
            const visibleData = (this as unknown as TableCheckableMixinHost).visibleData
            const validVisibleData = visibleData.filter((row) => this.isRowCheckable(row))
            return validVisibleData.length === 0
        }
    },
    watch: {
        /*
        * When checkedRows prop change, update internal value without
        * mutating original data.
        */
        checkedRows(rows: TableRow[]) {
            this.newCheckedRows = [...rows]
        }
    },
    methods: {
        /*
        * Check if the row is checked (is added to the array).
        */
        isRowChecked(row: TableRow) {
            return indexOf(this.newCheckedRows, row, this.customIsChecked) >= 0
        },

        /*
        * Remove a checked row from the array.
        */
        removeCheckedRow(row: TableRow) {
            const index = indexOf(this.newCheckedRows, row, this.customIsChecked)
            if (index >= 0) {
                this.newCheckedRows.splice(index, 1)
            }
        },

        /*
        * Header checkbox click listener.
        * Add or remove all rows in current page.
        */
        checkAll() {
            const isAllChecked = this.isAllChecked
            const visibleData = (this as unknown as TableCheckableMixinHost).visibleData
            visibleData.forEach((currentRow) => {
                if (this.isRowCheckable(currentRow)) {
                    this.removeCheckedRow(currentRow)
                }
                if (!isAllChecked) {
                    if (this.isRowCheckable(currentRow)) {
                        this.newCheckedRows.push(currentRow)
                    }
                }
            })

            this.$emit('check', this.newCheckedRows)
            this.$emit('check-all', this.newCheckedRows)

            // Emit checked rows to update user variable
            this.$emit('update:checkedRows', this.newCheckedRows)
        },

        /*
        * Row checkbox click listener.
        */
        checkRow(row: TableRow, index: number, event: ModifierKeys) {
            if (!this.isRowCheckable(row)) return
            const lastIndex = this.lastCheckedRowIndex
            this.lastCheckedRowIndex = index

            if (event.shiftKey && lastIndex !== null && index !== lastIndex) {
                this.shiftCheckRow(row, index, lastIndex)
            } else if (!this.isRowChecked(row)) {
                this.newCheckedRows.push(row)
            } else {
                this.removeCheckedRow(row)
            }

            this.$emit('check', this.newCheckedRows, row)

            // Emit checked rows to update user variable
            this.$emit('update:checkedRows', this.newCheckedRows)
        },

        /*
         * Check row when shift is pressed.
         */
        shiftCheckRow(row: TableRow, index: number, lastCheckedRowIndex: number) {
            const visibleData = (this as unknown as TableCheckableMixinHost).visibleData
            // Get the subset of the list between the two indicies
            const subset = visibleData.slice(
                Math.min(index, lastCheckedRowIndex),
                Math.max(index, lastCheckedRowIndex) + 1
            )

            // Determine the operation based on the state of the clicked checkbox
            const shouldCheck = !this.isRowChecked(row)

            subset.forEach((item) => {
                this.removeCheckedRow(item)
                if (shouldCheck && this.isRowCheckable(item)) {
                    this.newCheckedRows.push(item)
                }
            })
        }
    }
})
