<template>
    <div class="b-table" :class="{ 'is-loading': loading }">
        <div v-if="mobileCards && hasSortableColumns" class="field is-hidden-tablet">
            <div v-if="mobileCards && hasSortableColumns" class="field is-hidden-tablet has-addons">
                <b-select v-model="mobileSort" expanded>
                    <option v-for="(column, index) in columns"
                        v-if="column.sortable"
                        :key="index"
                        :value="column">
                        {{ column.label }}
                    </option>
                </b-select>
                <p class="control">
                    <button class="button is-primary" @click="sort(mobileSort)">
                        <b-icon
                            v-show="currentSortColumn === mobileSort"
                            icon="arrow_upward"
                            both
                            size="is-small"
                            :class="{ 'is-desc': !isAsc }">
                        </b-icon>
                    </button>
                </p>
            </div>
        </div>

        <div class="table-wrapper">
            <table
                class="table"
                :tabindex="!selected ? false : 0"
                :class="{
                    'is-bordered': bordered,
                    'is-striped': striped,
                    'is-narrow': narrowed,
                    'has-mobile-cards': mobileCards
                }"
                @keyup.prevent.enter="pressedEnter"
                @keydown.prevent.up="pressedArrow(-1)"
                @keydown.prevent.down="pressedArrow(1)"
                @focus="focused"
                @blur="hovered = null">
                <thead>
                    <tr>
                        <th v-if="detailed" width="40px"></th>
                        <th class="checkbox-cell" v-if="checkable">
                            <b-checkbox :value="isAllChecked" @change.native="checkAll"></b-checkbox>
                        </th>
                        <th v-for="(column, index) in columns"
                            v-if="column.visible"
                            :key="index"
                            :class="{ 'is-current-sort': currentSortColumn === column, 'is-sortable': column.sortable }"
                            :style="{ width: column.width + 'px' }"
                            @click.stop="sort(column)">
                            <div class="th-wrap" :class="{ 'is-numeric': column.numeric, 'is-centered': column.centered }">

                                <slot v-if="$scopedSlots.header" name="header" :column="column" :index="index"></slot>
                                <template v-else>{{ column.label }}</template>

                                <b-icon
                                    v-show="currentSortColumn === column"
                                    icon="arrow_upward"
                                    both
                                    size="is-small"
                                    :class="{ 'is-desc': !isAsc }">
                                </b-icon>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody v-if="visibleData.length">
                    <template v-for="(row, index) in visibleData">
                        <tr :key="index"
                            :class="[rowClass(row, index), {
                                'is-selected': row === selected,
                                'is-checked': isRowChecked(row),
                                'is-hovered': hovered === row
                            }]"
                            @click="selectRow(row)"
                            @dblclick="$emit('dblclick', row)">

                            <td v-if="detailed">
                                <a role="button" @click.stop="toggleDetails(row)">
                                    <b-icon icon="chevron_right"
                                        both
                                        :class="{'is-expanded': isVisibleDetailRow(row)}">
                                    </b-icon>
                                </a>
                            </td>

                            <td class="checkbox-cell" v-if="checkable">
                                <b-checkbox :value="isRowChecked(row)" @change.native="checkRow(row)"></b-checkbox>
                            </td>

                            <slot :row="row" :index="index"></slot>
                        </tr>

                        <tr v-if="detailed && isVisibleDetailRow(row)"
                            class="detail">
                            <td :colspan="columnCount">
                                <div class="detail-container">
                                    <slot name="detail" :row="row" :index="index"></slot>
                                </div>
                            </td>
                        </tr>
                    </template>
                </tbody>
                <tbody v-else>
                    <tr class="is-empty">
                        <td :colspan="columnCount">
                            <slot name="empty"></slot>
                        </td>
                    </tr>
                </tbody>
                <tfoot v-if="$slots.footer !== undefined">
                    <tr class="table-footer">
                        <slot name="footer" v-if="hasCustomFooterSlot()"></slot>
                        <th :colspan="columnCount" v-else>
                            <slot name="footer"></slot>
                        </th>
                    </tr>
                </tfoot>
            </table>
        </div>

        <div v-if="checkable || paginated" class="level">
            <div class="level-left">
                <slot name="bottom-left"></slot>
            </div>

            <div class="level-right">
                <div v-if="paginated" class="level-item">
                    <b-pagination
                        :total="newDataTotal"
                        :per-page="perPage"
                        :simple="paginationSimple"
                        :current="currentPage"
                        @change="pageChanged">
                    </b-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { getValueByPath, indexOf } from '../../utils/helpers'
    import Pagination from '../pagination'
    import Icon from '../icon'
    import { Checkbox } from '../checkbox'

    export default {
        name: 'bTable',
        components: {
            [Pagination.name]: Pagination,
            [Icon.name]: Icon,
            [Checkbox.name]: Checkbox
        },
        props: {
            data: {
                type: Array,
                default: () => []
            },
            bordered: Boolean,
            striped: Boolean,
            narrowed: Boolean,
            loading: Boolean,
            detailed: Boolean,
            checkable: Boolean,
            selected: Object,
            customIsChecked: Function,
            checkedRows: {
                type: Array,
                default: () => []
            },
            mobileCards: {
                type: Boolean,
                default: true
            },
            defaultSort: [String, Array],
            defaultSortDirection: {
                type: String,
                default: 'asc'
            },
            paginated: Boolean,
            perPage: {
                type: [Number, String],
                default: 20
            },
            paginationSimple: Boolean,
            backendSorting: Boolean,
            rowClass: {
                type: Function,
                default: () => ''
            },
            backendPagination: Boolean,
            total: {
                type: [Number, String],
                default: 0
            }
        },
        data() {
            return {
                columns: [],
                visibleDetailRows: [],
                newData: this.data,
                newDataTotal: this.backendPagination ? this.total : this.data.length,
                newCheckedRows: [...this.checkedRows],
                currentSortColumn: {},
                isAsc: true,
                mobileSort: {},
                currentPage: 1,
                hovered: this.selected || null,
                firstTimeSort: true, // Used by first time initSort
                _isTable: true // Used by TableColumn
            }
        },
        watch: {
            /**
             * When data prop change:
             *   1. Update internal value.
             *   2. Reset columns (thead), in case it's on a v-for loop.
             *   3. Sort again if it's not backend-sort.
             *   4. Set new total if it's not backend-paginated.
             */
            data(value) {
                // Save columns before resetting
                const columns = this.columns

                this.columns = []
                this.newData = value

                // Prevent table from being headless, data could change and created hook
                // on column might not trigger
                this.$nextTick(() => {
                    if (!this.columns.length) this.columns = columns
                })

                if (!this.backendSorting) {
                    this.sort(this.currentSortColumn, true)
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
             * When mobileSort change (mobile dropdown) call sort method.
             */
            mobileSort(column) {
                if (this.currentSortColumn === column) return

                this.sort(column)
            },

            /**
             * When currentSortColumn change, update mobileSort.
             */
            currentSortColumn(column) {
                this.mobileSort = column
            },

            /**
             * When checkedRows prop change, update internal value without
             * mutating original data.
             */
            checkedRows(rows) {
                this.newCheckedRows = [...rows]
            },

            /**
             * When columns change, call initSort only first time (For example async data).
             */
            columns(columns) {
                if (columns.length && this.firstTimeSort) {
                    this.initSort()
                    this.firstTimeSort = false
                } else if (columns.length) {
                    for (let i = 0; i < columns.length; i++) {
                        if (columns[i].newKey === this.currentSortColumn.newKey) {
                            this.currentSortColumn = columns[i]
                            break
                        }
                    }
                }
            }
        },
        computed: {
            /**
             * Splitted data based on the pagination.
             */
            visibleData() {
                if (!this.paginated) return this.newData

                const currentPage = this.currentPage
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
                const isAllChecked = this.visibleData.some(currentVisibleRow => {
                    return indexOf(this.checkedRows, currentVisibleRow, this.customIsChecked) < 0
                })
                return !isAllChecked
            },

            /**
             * Check if has any sortable column.
             */
            hasSortableColumns() {
                return this.columns.some(column => {
                    return column.sortable
                })
            },

            /**
             * Return total column count based if it's checkable or expanded
             */
            columnCount() {
                let count = this.columns.length
                count += this.checkable ? 1 : 0
                count += this.detailed ? 1 : 0

                return count
            }
        },
        methods: {
            /**
             * Sort an array by key without mutating original data.
             * Call the user sort function if it was passed.
             */
            sortBy(array, key, fn, isAsc) {
                let sorted = []
                // Sorting without mutating original data
                if (fn && typeof fn === 'function') {
                    sorted = [...array].sort(fn)
                } else {
                    sorted = [...array].sort((a, b) => {
                        // Get nested values from objects
                        let newA = getValueByPath(a, key)
                        let newB = getValueByPath(b, key)

                        if (!newA && newA !== 0) return 1
                        if (!newB && newB !== 0) return -1
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

            /**
             * Sort the column.
             * Toggle current direction on column if it's sortable
             * and not just updating the prop.
             */
            sort(column, updatingData = false) {
                if (!column || !column.sortable) return

                if (!updatingData) {
                    this.isAsc = column === this.currentSortColumn
                        ? !this.isAsc
                        : (this.defaultSortDirection.toLowerCase() !== 'desc')
                }
                if (!this.firstTimeSort) {
                    this.$emit('sort', column.field, this.isAsc ? 'asc' : 'desc')
                }
                if (!this.backendSorting) {
                    this.newData = this.sortBy(this.newData, column.field, column.customSort, this.isAsc)
                }
                this.currentSortColumn = column
            },

            /**
             * Check if the row is checked (is added to the array).
             */
            isRowChecked(row) {
                return indexOf(this.checkedRows, row, this.customIsChecked) >= 0
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
                this.visibleData.forEach(currentRow => {
                    this.removeCheckedRow(currentRow)
                    if (!isAllChecked) {
                        this.newCheckedRows.push(currentRow)
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

                // Set hovered if is selectable
                if (this.selected) this.hovered = row
            },

            /**
             * Paginator change listener.
             */
            pageChanged(page) {
                this.currentPage = page > 0 ? page : 1
                this.$emit('page-change', this.currentPage)
            },

            /**
             * Toggle to show/hide details slot
             */
            toggleDetails(index) {
                const found = this.isVisibleDetailRow(index)
                if (found) {
                    const i = this.visibleDetailRows.indexOf(index)
                    this.visibleDetailRows.splice(i, 1)
                    this.$emit('details-close', index)
                    return
                }
                this.visibleDetailRows.push(index)
                this.$emit('details-open', index)
            },

            isVisibleDetailRow(index) {
                return this.visibleDetailRows.indexOf(index) >= 0
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
             * Table enter key listener, set selected.
             */
            pressedEnter() {
                if (!this.visibleData.length || !this.hovered) return

                this.selectRow(this.hovered)
            },

            /**
             * Table arrow keys listener, change hovered.
             */
            pressedArrow(pos) {
                if (!this.visibleData.length) return

                let index = this.visibleData.indexOf(this.hovered) + pos

                // Prevent from going up from first and down from last
                index = index < 0
                    ? 0
                    : index > this.visibleData.length - 1
                        ? this.visibleData.length - 1
                        : index

                this.hovered = this.visibleData[index]
            },

            /**
             * Table focus listener, set initial hovered.
             */
            focused() {
                if (!this.visibleData.length) return

                this.hovered = this.selected && Object.keys(this.selected).length
                    ? this.selected
                    : null
            },

            /**
             * Initial sorted column based on the default-sort prop.
             */
            initSort() {
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

                this.columns.forEach(column => {
                    if (column.field === sortField) {
                        this.isAsc = sortDirection.toLowerCase() !== 'desc'
                        this.sort(column, true)
                    }
                })
            }
        }
    }
</script>

