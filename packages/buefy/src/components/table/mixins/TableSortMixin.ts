import { defineComponent, toRaw } from 'vue'
import type { PropType } from 'vue'

import { getValueByPath, isNil, multiColumnSort } from '../../../utils/helpers'
import type {
    CustomSortFunction,
    ITableColumn,
    ModifierKeys,
    TableColumnOrder,
    TableRow,
    TableSortMixinHost
} from '../types'

// Dummy column object that indicates there is no column present.
const BLANK_COLUMN = {
    thAttrs: () => ({}),
    tdAttrs: () => ({}),
    getRootClasses: () => [],
    getRootStyle: () => undefined,
    $slots: {}
} as const

export default defineComponent({
    props: {
        defaultSort: [String, Array<string>],
        defaultSortDirection: {
            type: String,
            default: 'asc'
        },
        sortIcon: {
            type: String,
            default: 'arrow-up'
        },
        sortIconSize: {
            type: String,
            default: 'is-small'
        },
        sortMultiple: {
            type: Boolean,
            default: false
        },
        sortMultipleData: {
            type: Array as PropType<TableColumnOrder[]>,
            default: () => []
        },
        sortMultipleKey: {
            type: String as PropType<keyof ModifierKeys | null>,
            default: null
        },
        backendSorting: Boolean,
        mobileSortPlaceholder: String
    },
    emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        sort: (
            _field: string | undefined,
            _order: 'asc' | 'desc',
            _event: ModifierKeys | null
        ) => true,
        'sorting-priority-removed': (_field: string | undefined) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
    },
    data() {
        return {
            sortMultipleDataLocal: [] as TableColumnOrder[],
            currentSortColumn: {} as ITableColumn,
            isAsc: true,
            firstTimeSort: true // Used by first time initSort
        }
    },
    computed: {
        sortMultipleDataComputed() {
            return this.backendSorting ? this.sortMultipleData : this.sortMultipleDataLocal
        },

        /*
        * Check if has any sortable column.
        */
        hasSortablenewColumns() {
            return (this as unknown as TableSortMixinHost).newColumns.some((column) => {
                return column.sortable
            })
        }
    },
    methods: {
        /*
        * Return the multi-sort priority entry for a column, if it is part
        * of the current multi-sort selection.
        */
        getMultiSortEntry(column: ITableColumn) {
            return this.sortMultipleDataComputed.find((i) => i.field === column.field)
        },

        findIndexOfSortData(column: ITableColumn) {
            const sortObj = this.getMultiSortEntry(column)
            return sortObj ? this.sortMultipleDataComputed.indexOf(sortObj) + 1 : 0
        },

        removeSortingPriority(column: ITableColumn) {
            if (this.backendSorting) {
                this.$emit('sorting-priority-removed', column.field)
            } else {
                this.sortMultipleDataLocal = this.sortMultipleDataLocal.filter(
                    (priority) => priority.field !== column.field)

                if (this.sortMultipleDataLocal.length === 0) {
                    this.resetMultiSorting()
                } else {
                    const host = this as unknown as TableSortMixinHost
                    host.newData = multiColumnSort(host.newData, this.sortMultipleDataLocal)
                }
            }
        },

        resetMultiSorting() {
            this.sortMultipleDataLocal = []
            this.currentSortColumn = BLANK_COLUMN
            const host = this as unknown as TableSortMixinHost
            host.newData = host.data
        },

        /*
        * Sort an array by key without mutating original data.
        * Call the user sort function if it was passed.
        */
        sortBy(
            array: TableRow[],
            key: string | undefined,
            fn: CustomSortFunction | undefined,
            isAsc: boolean
        ) {
            let sorted = []
            // Sorting without mutating original data
            if (fn && typeof fn === 'function') {
                sorted = [...array].sort((a, b) => fn(a, b, isAsc))
            } else {
                sorted = [...array].sort((a, b) => {
                    // Get nested values from objects
                    let newA = getValueByPath(a, key!)
                    let newB = getValueByPath(b, key!)

                    // sort boolean type
                    if (typeof newA === 'boolean' && typeof newB === 'boolean') {
                        return isAsc ? +newA - +newB : +newB - +newA
                    }

                    // sort null values to the bottom when in asc order
                    // and to the top when in desc order
                    if (!isNil(newB) && isNil(newA)) return isAsc ? 1 : -1
                    if (!isNil(newA) && isNil(newB)) return isAsc ? -1 : 1
                    if (newA === newB) return 0

                    newA = (typeof newA === 'string')
                        ? newA.toUpperCase()
                        : newA
                    newB = (typeof newB === 'string')
                        ? newB.toUpperCase()
                        : newB

                    return isAsc
                        ? newA > newB ? 1 : -1
                        : newA > newB ? -1 : 1
                })
            }

            return sorted
        },

        sortMultiColumn(column: ITableColumn | TableColumnOrder) {
            this.currentSortColumn = BLANK_COLUMN
            if (!this.backendSorting) {
                const existingPriority = this.sortMultipleDataLocal.filter((i) =>
                    i.field === column.field)[0]
                if (existingPriority) {
                    existingPriority.order = existingPriority.order === 'desc' ? 'asc' : 'desc'
                } else {
                    this.sortMultipleDataLocal.push({
                        field: column.field,
                        order: this.isAsc ? 'asc' : 'desc',
                        customSort: column.customSort
                    })
                }
                this.doSortMultiColumn()
            }
        },

        doSortMultiColumn() {
            const host = this as unknown as TableSortMixinHost
            host.newData = multiColumnSort(host.newData, this.sortMultipleDataLocal)
        },

        /*
        * Sort the column.
        * Toggle current direction on column if it's sortable
        * and not just updating the prop.
        */
        sort(
            column: ITableColumn | null | undefined,
            updatingData: boolean | null = false,
            event: ModifierKeys | null = null
        ) {
            if (!column || !column.sortable) return
            if (
                // if backend sorting is enabled, just emit the sort press like usual
                // if the correct key combination isnt pressed, sort like usual
                !this.backendSorting &&
                this.sortMultiple &&
                ((this.sortMultipleKey && event![this.sortMultipleKey]) || !this.sortMultipleKey)
            ) {
                if (updatingData) {
                    this.doSortMultiColumn()
                } else {
                    this.sortMultiColumn(column)
                }
            } else {
                // sort multiple is enabled but the correct key combination isnt pressed so reset
                if (this.sortMultiple) {
                    this.sortMultipleDataLocal = []
                }

                if (!updatingData) {
                    this.isAsc = toRaw(column) === toRaw(this.currentSortColumn)
                        ? !this.isAsc
                        : (this.defaultSortDirection.toLowerCase() !== 'desc')
                }
                if (!this.firstTimeSort) {
                    this.$emit('sort', column.field, this.isAsc ? 'asc' : 'desc', event)
                }
                if (!this.backendSorting) {
                    this.doSortSingleColumn(column)
                }
                this.currentSortColumn = column
            }
        },

        doSortSingleColumn(column: ITableColumn) {
            const host = this as unknown as TableSortMixinHost
            host.newData = this.sortBy(
                host.newData,
                column.field,
                column.customSort,
                this.isAsc
            )
        },

        /*
        * Initial sorted column based on the default-sort prop.
        */
        initSort() {
            if (this.sortMultiple && this.sortMultipleData) {
                this.sortMultipleData.forEach((column) => {
                    this.sortMultiColumn(column)
                })
            } else {
                if (!this.defaultSort) return

                let sortField = ''
                let sortDirection = this.defaultSortDirection

                if (Array.isArray(this.defaultSort)) {
                    sortField = this.defaultSort[0]
                    if (this.defaultSort[1]) {
                        sortDirection = this.defaultSort[1]
                    }
                } else {
                    sortField = this.defaultSort
                }

                const sortColumn = (this as unknown as TableSortMixinHost).newColumns.filter(
                    (column) => (column.field === sortField))[0]
                if (sortColumn) {
                    this.isAsc = sortDirection.toLowerCase() !== 'desc'
                    this.sort(sortColumn, true)
                }
            }
        },

        /*
        * Call initSort only first time (For example async data).
        */
        checkSort() {
            const newColumns = (this as unknown as TableSortMixinHost).newColumns
            if (newColumns.length && this.firstTimeSort) {
                this.initSort()
                this.firstTimeSort = false
            } else if (newColumns.length) {
                if (toRaw(this.currentSortColumn) !== BLANK_COLUMN) {
                    for (let i = 0; i < newColumns.length; i++) {
                        if (newColumns[i].field === this.currentSortColumn.field) {
                            this.currentSortColumn = newColumns[i]
                            break
                        }
                    }
                }
            }
        }
    }
})
