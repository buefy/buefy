<template>
    <div class="b-table" :class="{ 'is-loading': loading }">
        <b-table-mobile-sort
            v-if="mobileCards && hasSortablenewColumns"
            :current-sort-column="currentSortColumn"
            :is-asc="isAsc"
            :columns="newColumns"
            @sort="(column) => sortColumn(column)"
        />

        <div class="table-wrapper">
            <table
                class="table"
                :class="tableClasses"
                :tabindex="!focusable ? false : 0"
                @keydown.prevent.up="pressedArrow(-1)"
                @keydown.prevent.down="pressedArrow(1)">
                <thead v-if="newColumns.length">
                    <tr>
                        <th v-if="detailed" width="40px"/>
                        <th class="checkbox-cell" v-if="checkable">
                            <b-checkbox
                                :value="isAllChecked"
                                :disabled="isAllUncheckable"
                                @change.native="checkAll"/>
                        </th>
                        <th
                            v-for="(column, index) in newColumns"
                            v-if="column.visible || column.visible === undefined"
                            :key="index"
                            :class="{
                                'is-current-sort': currentSortColumns.indexOf(column) !== -1,
                                'is-sortable': column.sortable
                            }"
                            :style="{ width: column.width + 'px' }"
                            @click.stop="sortColumn(column, false, $event)">
                            <div
                                class="th-wrap"
                                :class="{
                                    'is-numeric': column.numeric,
                                    'is-centered': column.centered
                            }">
                                <slot
                                    v-if="$scopedSlots.header"
                                    name="header"
                                    :column="column"
                                    :index="index"
                                />
                                <template v-else>{{ column.label }}</template>

                                <b-icon
                                    v-show="currentSortColumns.indexOf(column) !== -1"
                                    icon="arrow-up"
                                    :pack="iconPack"
                                    both
                                    size="is-small"
                                    :class="{ 'is-desc': !column.isAsc }"/>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody v-if="visibleData.length">
                    <template v-for="(row, index) in visibleData">
                        <tr
                            :key="index"
                            :class="[rowClass(row, index), {
                                'is-selected': row === selected,
                                'is-checked': isRowChecked(row)
                            }]"
                            @click="selectRow(row)"
                            @dblclick="$emit('dblclick', row)">

                            <td
                                v-if="detailed"
                                class="chevron-cell"
                            >
                                <a
                                    v-if="hasDetailedVisible(row)"
                                    role="button"
                                    @click.stop="toggleDetails(row)">
                                    <b-icon
                                        icon="chevron-right"
                                        :pack="iconPack"
                                        both
                                        :class="{'is-expanded': isVisibleDetailRow(row)}"/>
                                </a>
                            </td>

                            <td class="checkbox-cell" v-if="checkable">
                                <b-checkbox
                                    :disabled="!isRowCheckable(row)"
                                    :value="isRowChecked(row)"
                                    @change.native="checkRow(row)"
                                />
                            </td>

                            <slot
                                v-if="$scopedSlots.default"
                                :row="row"
                                :index="index"
                            />
                            <template v-else>
                                <BTableColumn
                                    v-for="column in newColumns"
                                    v-bind="column"
                                    :key="column.field"
                                    internal>
                                    <span
                                        v-if="column.renderHtml"
                                        v-html="getValueByPath(row, column.field)"
                                    />
                                    <template v-else>
                                        {{ getValueByPath(row, column.field) }}
                                    </template>
                                </BTableColumn>
                            </template>
                        </tr>

                        <!-- Do not add `key` here (breaks details) -->
                        <!-- eslint-disable-next-line -->
                        <tr
                            v-if="detailed && isVisibleDetailRow(row)"
                            class="detail">
                            <td :colspan="columnCount">
                                <div class="detail-container">
                                    <slot
                                        name="detail"
                                        :row="row"
                                        :index="index"/>
                                </div>
                            </td>
                        </tr>
                    </template>
                </tbody>
                <tbody v-else>
                    <tr class="is-empty">
                        <td :colspan="columnCount">
                            <slot name="empty"/>
                        </td>
                    </tr>
                </tbody>
                <tfoot v-if="$slots.footer !== undefined">
                    <tr class="table-footer">
                        <slot name="footer" v-if="hasCustomFooterSlot()"/>
                        <th :colspan="columnCount" v-else>
                            <slot name="footer"/>
                        </th>
                    </tr>
                </tfoot>
            </table>
        </div>

        <div v-if="(checkable && hasBottomLeftSlot()) || paginated" class="level">
            <div class="level-left">
                <slot name="bottom-left"/>
            </div>

            <div class="level-right">
                <div v-if="paginated" class="level-item">
                    <b-pagination
                        :icon-pack="iconPack"
                        :total="newDataTotal"
                        :per-page="perPage"
                        :simple="paginationSimple"
                        :size="paginationSize"
                        :current="newCurrentPage"
                        @change="pageChanged"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { getValueByPath, indexOf } from '../../utils/helpers'

    import Checkbox from '../checkbox/Checkbox'
    import Icon from '../icon/Icon'
    import Pagination from '../pagination/Pagination'

    import TableMobileSort from './TableMobileSort'
    import TableColumn from './TableColumn'

    export default {
        name: 'BTable',
        components: {
            [Checkbox.name]: Checkbox,
            [Icon.name]: Icon,
            [Pagination.name]: Pagination,
            [TableMobileSort.name]: TableMobileSort,
            [TableColumn.name]: TableColumn
        },
        props: {
            data: {
                type: Array,
                default: () => []
            },
            columns: {
                type: Array,
                default: () => []
            },
            bordered: Boolean,
            striped: Boolean,
            narrowed: Boolean,
            hoverable: Boolean,
            loading: Boolean,
            detailed: Boolean,
            checkable: Boolean,
            selected: Object,
            focusable: Boolean,
            customIsChecked: Function,
            isRowCheckable: {
                type: Function,
                default: () => true
            },
            checkedRows: {
                type: Array,
                default: () => []
            },
            mobileCards: {
                type: Boolean,
                default: true
            },
            defaultSort: {
                type: Array,
                default: () => []
            },
            defaultSortDirection: {
                type: String,
                default: 'asc'
            },
            paginated: Boolean,
            currentPage: {
                type: Number,
                default: 1
            },
            perPage: {
                type: [Number, String],
                default: 20
            },
            paginationSimple: Boolean,
            paginationSize: String,
            backendSorting: Boolean,
            rowClass: {
                type: Function,
                default: () => ''
            },
            openedDetailed: {
                type: Array,
                default: () => []
            },
            hasDetailedVisible: {
                type: Function,
                default: () => true
            },
            detailKey: {
                type: String,
                default: ''
            },
            backendPagination: Boolean,
            total: {
                type: [Number, String],
                default: 0
            },
            iconPack: String
        },
        data() {
            return {
                getValueByPath,
                newColumns: [...this.columns],
                visibleDetailRows: this.openedDetailed,
                newData: this.data,
                newDataTotal: this.backendPagination ? this.total : this.data.length,
                newCheckedRows: [...this.checkedRows],
                newCurrentPage: this.currentPage,
                currentSortColumns: [],
                firstTimeSort: true, // Used by first time initSort
                _isTable: true // Used by TableColumn
            }
        },
        computed: {
            tableClasses() {
                return {
                    'is-bordered': this.bordered,
                    'is-striped': this.striped,
                    'is-narrow': this.narrowed,
                    'has-mobile-cards': this.mobileCards,
                    'is-hoverable': (
                        (this.hoverable || this.focusable) &&
                        this.visibleData.length
                    )
                }
            },

            /**
             * Splitted data based on the pagination.
             */
            visibleData() {
                if (!this.paginated) return this.newData

                const currentPage = this.newCurrentPage
                const perPage = this.perPage

                if (this.newData.length <= perPage) {
                    return this.newData
                } else {
                    const start = (currentPage - 1) * perPage
                    const end = parseInt(start, 10) + parseInt(perPage, 10)
                    return this.newData.slice(start, end)
                }
            },

            /**
             * Check if all rows in the page are checked.
             */
            isAllChecked() {
                const validVisibleData = this.visibleData.filter(
                        (row) => this.isRowCheckable(row))
                if (validVisibleData.length === 0) return false
                const isAllChecked = validVisibleData.some((currentVisibleRow) => {
                    return indexOf(this.newCheckedRows, currentVisibleRow, this.customIsChecked) < 0
                })
                return !isAllChecked
            },

            /**
             * Check if all rows in the page are checkable.
             */
            isAllUncheckable() {
                const validVisibleData = this.visibleData.filter(
                        (row) => this.isRowCheckable(row))
                return validVisibleData.length === 0
            },

            /**
             * Check if has any sortable column.
             */
            hasSortablenewColumns() {
                return this.newColumns.some((column) => {
                    return column.sortable
                })
            },

            /**
             * Return total column count based if it's checkable or expanded
             */
            columnCount() {
                let count = this.newColumns.length
                count += this.checkable ? 1 : 0
                count += this.detailed ? 1 : 0

                return count
            }
        },
        watch: {
            /**
             * When data prop change:
             *   1. Update internal value.
             *   2. Reset newColumns (thead), in case it's on a v-for loop.
             *   3. Sort again if it's not backend-sort.
             *   4. Set new total if it's not backend-paginated.
             */
            data(value) {
                // Save newColumns before resetting
                const newColumns = this.newColumns

                this.newColumns = []
                this.newData = value

                // Prevent table from being headless, data could change and created hook
                // on column might not trigger
                this.$nextTick(() => {
                    if (!this.newColumns.length) this.newColumns = newColumns
                })

                if (!this.backendSorting) {
                    this.sort()
                }
                if (!this.backendPagination) {
                    this.newDataTotal = value.length
                }
            },

            /**
             * When Pagination total change, update internal total
             * only if it's backend-paginated.
             */
            total(newTotal) {
                if (!this.backendPagination) return

                this.newDataTotal = newTotal
            },

            /**
             * When checkedRows prop change, update internal value without
             * mutating original data.
             */
            checkedRows(rows) {
                this.newCheckedRows = [...rows]
            },

            columns(value) {
                this.newColumns = [...value]
            },

            /**
             * When newColumns change, call initSort only first time (For example async data).
             */
            newColumns(newColumns) {
                if (newColumns.length && this.firstTimeSort) {
                    this.initSort()
                    this.firstTimeSort = false
                } else if (newColumns.length) {
                    let columns = []
                    for (let i = 0; i < newColumns.length; i++) {
                        newColumns[i].defaultSortDirection = this.defaultSortDirection
                        this.currentSortColumns.some((col) => {
                            if (newColumns[i].field === col.field) {
                                newColumns[i].isAsc = col.isAsc
                                newColumns[i].defaultSortDirection = col.defaultSortDirection
                                columns.push(newColumns[i])
                                return true
                            }
                            return false
                        })
                    }
                    this.currentSortColumns = columns
                }
            },

            /**
            * When the user wants to control the detailed rows via props.
            * Or wants to open the details of certain row with the router for example.
            */
            openedDetailed(expandedRows) {
                this.visibleDetailRows = expandedRows
            },

            currentPage(newVal) {
                this.newCurrentPage = newVal
            }
        },
        methods: {
            /**
             * Sort an array by key without mutating original data.
             * Call the user sort function if it was passed.
             */
            // sortBy(array, key, fn, isAsc) {
            sortBy(array, columns) {
                let sorted = []
                // Sorting without mutating original data
                sorted = [...array].sort((a, b) => {
                    var result = 0
                    for (var i = 0; i < columns.length; i++) {
                        result = 0
                        const key = columns[i].field
                        const fn = columns[i].customSort
                        const isAsc = columns[i].isAsc
                        if (fn && typeof fn === 'function') {
                            result = fn(a, b, isAsc)
                        } else {
                            // Get nested values from objects
                            let newA = getValueByPath(a, key)
                            let newB = getValueByPath(b, key)

                            // sort boolean type
                            if (typeof newA === 'boolean' && typeof newB === 'boolean') {
                                result = isAsc ? newA - newB : newB - newA
                            } else if (!newA && newA !== 0) {
                                return 1
                            } else if (!newB && newB !== 0) {
                                return -1
                            } else if (newA === newB) {
                                result = 0
                            } else {
                                newA = (typeof newA === 'string')
                                    ? newA.toUpperCase()
                                    : newA
                                newB = (typeof newB === 'string')
                                    ? newB.toUpperCase()
                                    : newB

                                result = isAsc
                                    ? newA > newB ? -1 : 1
                                    : newA > newB ? 1 : -1
                            }
                        }
                        if (result !== 0) break
                    }
                    return result
                })

                return sorted
            },

            /**
             * Sort the column.
             * Toggle current direction on column if it's sortable
             * and not just updating the prop.
             */
            sortColumn(column, updatingData = false, event = null) {
                if (!column || !column.sortable) return

                let columns = this.currentSortColumns

                if (!updatingData) {
                    if (!column.defaultSortDirection) {
                        column.defaultSortDirection = this.defaultSortDirection
                    }
                    if (columns.length === 0) { // No columns
                        column.isAsc = column.defaultSortDirection.toLowerCase() !== 'desc'
                        columns.push(column)
                    } else if (event && event.shiftKey) { // Multiple columns
                        let index = columns.indexOf(column)
                        if (index === -1) {
                            columns.push(column)
                            columns[columns.length - 1].isAsc = column.defaultSortDirection.toLowerCase() !== 'desc'
                        } else {
                            columns[index].isAsc = !columns[index].isAsc
                        }
                    } else { // Single column
                        if (column === columns[0]) {
                            columns[0].isAsc = !columns[0].isAsc
                        } else {
                            columns[0] = column
                            columns[0].isAsc = column.defaultSortDirection.toLowerCase() !== 'desc'
                        }
                        columns.length = 1
                    }
                }

                if (!this.firstTimeSort) {
                    this.sort()
                }

                this.currentSortColumns = columns
            },

            /**
             * Sort the data
             * Run the sorting functions, based on the selected columns
             */
            sort() {
                if (!this.backendSorting) {
                    this.newData = this.sortBy(this.newData, this.currentSortColumns)
                } else {
                    this.$emit('sort', this.currentSortColumns.map((col) => [col.field, col.isAsc ? 'asc' : 'desc']))
                }
            },

            /**
             * Check if the row is checked (is added to the array).
             */
            isRowChecked(row) {
                return indexOf(this.newCheckedRows, row, this.customIsChecked) >= 0
            },

            /**
             * Remove a checked row from the array.
             */
            removeCheckedRow(row) {
                const index = indexOf(this.newCheckedRows, row, this.customIsChecked)
                if (index >= 0) {
                    this.newCheckedRows.splice(index, 1)
                }
            },

            /**
             * Header checkbox click listener.
             * Add or remove all rows in current page.
             */
            checkAll() {
                const isAllChecked = this.isAllChecked
                this.visibleData.forEach((currentRow) => {
                    this.removeCheckedRow(currentRow)
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

            /**
             * Row checkbox click listener.
             * Add or remove a single row.
             */
            checkRow(row) {
                if (!this.isRowChecked(row)) {
                    this.newCheckedRows.push(row)
                } else {
                    this.removeCheckedRow(row)
                }

                this.$emit('check', this.newCheckedRows, row)

                // Emit checked rows to update user variable
                this.$emit('update:checkedRows', this.newCheckedRows)
            },

            /**
             * Row click listener.
             * Emit all necessary events.
             */
            selectRow(row, index) {
                this.$emit('click', row)

                if (this.selected === row) return

                // Emit new and old row
                this.$emit('select', row, this.selected)

                // Emit new row to update user variable
                this.$emit('update:selected', row)
            },

            /**
             * Paginator change listener.
             */
            pageChanged(page) {
                this.newCurrentPage = page > 0 ? page : 1
                this.$emit('page-change', this.newCurrentPage)
                this.$emit('update:currentPage', this.newCurrentPage)
            },

            /**
             * Toggle to show/hide details slot
             */
            toggleDetails(obj) {
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

            openDetailRow(obj) {
                const index = this.handleDetailKey(obj)
                this.visibleDetailRows.push(index)
            },

            closeDetailRow(obj) {
                const index = this.handleDetailKey(obj)
                const i = this.visibleDetailRows.indexOf(index)
                this.visibleDetailRows.splice(i, 1)
            },

            isVisibleDetailRow(obj) {
                const index = this.handleDetailKey(obj)
                const result = this.visibleDetailRows.indexOf(index) >= 0
                return result
            },

            /**
            * When the detailKey is defined we use the object[detailKey] as index.
            * If not, use the object reference by default.
            */
            handleDetailKey(index) {
                const key = this.detailKey
                return !key.length
                    ? index
                    : index[key]
            },

            checkPredefinedDetailedRows() {
                const defaultExpandedRowsDefined = this.openedDetailed.length > 0
                if (defaultExpandedRowsDefined && !this.detailKey.length) {
                    throw new Error('If you set a predefined opened-detailed, you must provide a unique key using the prop "detail-key"')
                }
            },

            /**
             * Check if footer slot has custom content.
             */
            hasCustomFooterSlot() {
                if (this.$slots.footer.length > 1) return true

                const tag = this.$slots.footer[0].tag
                if (tag !== 'th' && tag !== 'td') return false

                return true
            },

            /**
             * Check if bottom-left slot exists.
             */
            hasBottomLeftSlot() {
                return typeof this.$slots['bottom-left'] !== 'undefined'
            },

            /**
             * Table arrow keys listener, change selection.
             */
            pressedArrow(pos) {
                if (!this.visibleData.length) return

                let index = this.visibleData.indexOf(this.selected) + pos

                // Prevent from going up from first and down from last
                index = index < 0
                    ? 0
                    : index > this.visibleData.length - 1
                        ? this.visibleData.length - 1
                        : index

                this.selectRow(this.visibleData[index])
            },

            /**
             * Focus table element if has selected prop.
             */
            focus() {
                if (!this.focusable) return

                this.$el.querySelector('table').focus()
            },

            /**
             * Initial sorted column based on the default-sort prop.
             */
            initSort() {
                if (!this.defaultSort) return

                this.defaultSort.forEach((sort) => {
                    let field = ''
                    let direction = this.defaultSortDirection
                    if (Array.isArray(sort)) {
                        field = sort[0]
                        if (sort[1]) {
                            direction = sort[1]
                        }
                    } else {
                        field = sort
                    }
                    this.newColumns.some((column) => {
                        if (column.field === field) {
                            column.defaultSortDirection = direction
                            this.sortColumn(column, false, { shiftKey: true })
                            return true
                        }
                        return false
                    })
                })
            }
        },

        mounted() {
            this.checkPredefinedDetailedRows()
        }
    }
</script>
