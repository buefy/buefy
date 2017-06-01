<template>
    <div class="b-table" :class="{ 'is-loading': loading }">
        <div class="b-table-content">
            <div class="field  is-hidden-tablet" v-if="mobileCards && hasSortableColumns">
                <div v-if="mobileCards && hasSortableColumns" class="field is-hidden-tablet has-addons">
                    <b-select v-model="mobileSort" expanded>
                        <option
                            v-for="column in columns"
                            v-if="column.isSortable"
                            :value="column">
                            {{ column.label }}
                        </option>
                    </b-select>
                    <p class="control">
                        <button class="button is-primary" @click="sort(mobileSort)">
                            <b-icon
                                icon="arrow_upward"
                                both
                                size="is-small"
                                :class="{
                                    'is-desc': !mobileSort.isAsc,
                                    'is-visible': currentSortColumn === mobileSort
                                }">
                            </b-icon>
                        </button>
                    </p>
                </div>
            </div>

            <div class="table-wrapper">
                <table
                    class="table"
                    :class="{
                        'is-bordered': bordered,
                        'is-striped': striped,
                        'is-narrow': narrowed,
                        'has-mobile-cards': mobileCards
                    }">
                    <thead>
                        <tr>
                            <th class="checkbox-cell" v-if="checkable">
                                <b-checkbox :value="isAllChecked" @change="checkAll" nosync></b-checkbox>
                            </th>
                            <th v-for="column in columns" @click.stop="sort(column)"
                                :class="{ 'is-current-sort': currentSortColumn === column, 'is-sortable': column.isSortable }"
                                :style="{ width: column.width + 'px' }">
                                <div class="th-wrap" :class="{ 'is-numeric': column.isNumeric }">
                                    {{ column.label }}
                                    <b-icon
                                        icon="arrow_upward"
                                        both
                                        size="is-small"
                                        :class="{ 'is-desc': !column.isAsc, 'is-visible': currentSortColumn === column }">
                                    </b-icon>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, index) in visibleData"
                            @click="selectRow(row)"
                            @dblclick="$emit('dblclick', row)"
                            :class="{ 'is-selected': row === selected, 'is-checked': isRowChecked(row) }">

                            <td class="checkbox-cell" v-if="checkable">
                                <b-checkbox :value="isRowChecked(row)" @change="checkRow(row)" nosync></b-checkbox>
                            </td>

                            <slot :row="row" :index="index"></slot>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="level">
                <div class="level-left">
                    <div class="level-item">
                        <p v-if="checkable && this.checkedRows.length > 0">({{ this.checkedRows.length }})</p>
                    </div>
                </div>

                <div class="level-right" v-if="paginated">
                    <div class="level-item">
                        <b-pagination
                            :total="newData.length"
                            :per-page="perPage"
                            :simple="paginationSimple"
                            :current="currentPage"
                            @change="pageChanged">
                        </b-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
                default: []
            },
            bordered: Boolean,
            striped: Boolean,
            narrowed: Boolean,
            loading: Boolean,
            checkable: Boolean,
            selected: Object,
            checkedRows: {
                type: Array,
                default: () => []
            },
            mobileCards: {
                type: Boolean,
                default: true
            },
            defaultSort: [String, Array],
            paginated: Boolean,
            perPage: {
                type: [Number, String],
                default: 20
            },
            paginationSimple: Boolean,
            backendSorting: Boolean
        },
        data() {
            return {
                columns: [],
                newData: this.data,
                newCheckedRows: [...this.checkedRows],
                currentSortColumn: {},
                mobileSort: {},
                currentPage: 1,
                _isTable: true // Used by TableColumn
            }
        },
        watch: {
            /**
             * When data prop change, update internal value and sort again,
             * do not sort however if it's backend-sort.
             */
            data(value) {
                this.newData = value
                if (!this.backendSorting) {
                    this.sort(this.currentSortColumn, true)
                }
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
                    return this.checkedRows.indexOf(currentVisibleRow) < 0
                })
                return !isAllChecked
            },

            /**
             * Check if has any sortable column.
             */
            hasSortableColumns() {
                return this.columns.some(column => {
                    return column.isSortable
                })
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
                if (!fn || typeof fn !== 'function') {
                    sorted = [...array].sort((a, b) => {
                        // Get values even if it's a dot notation string (e.g. 'user.name')
                        let newA = key.split('.').reduce((obj, i) => obj[i], a)
                        let newB = key.split('.').reduce((obj, i) => obj[i], b)

                        if (!newA && newA !== 0) return 1
                        if (!newB && newB !== 0) return 0

                        newA = (typeof newA === 'string')
                            ? newA.toUpperCase()
                            : newA
                        newB = (typeof newB === 'string')
                            ? newB.toUpperCase()
                            : newB

                        return newA > newB ? 1 : -1
                    })
                } else {
                    sorted = [...array].sort(fn)
                }

                if (!isAsc) sorted.reverse()

                return sorted
            },

            /**
             * Sort the column.
             * Toggle current direction on column if it's really a column click
             * and not just updating the prop.
             */
            sort(column, updatingData = false) {
                if (!column || !column.isSortable) return

                if (!updatingData) {
                    column.isAsc = column === this.currentSortColumn
                        ? !column.isAsc
                        : column.isAsc = true
                }
                if (!this.backendSorting) {
                    this.newData = this.sortBy(this.newData, column.field, column.customSort, column.isAsc)
                }
                this.currentSortColumn = column
                this.$emit('sort', column.field, column.isAsc ? 'asc' : 'desc')
            },

            /**
             * Check if the row is checked (is added to the array).
             */
            isRowChecked(row) {
                return this.checkedRows.indexOf(row) >= 0
            },

            /**
             * Remove a checked row from the array.
             */
            removeCheckedRow(row) {
                const index = this.newCheckedRows.indexOf(row)
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
            },

            /**
             * Paginator change listener.
             */
            pageChanged(page) {
                this.currentPage = page > 0 ? page : 1
                this.$emit('page-change', this.currentPage)
            },

            /**
             * Initial sorted column based on the default-sort prop.
             */
            initSort() {
                if (!this.defaultSort) return

                const sortField = Array.isArray(this.defaultSort)
                    ? this.defaultSort[0]
                    : this.defaultSort
                const direction = this.defaultSort[1] || ''

                this.columns.forEach(column => {
                    if (column.field === sortField) {
                        this.sort(column)
                        if (direction.toLowerCase() === 'desc') {
                            // Call sort again to reverse the array
                            this.sort(column)
                        }
                    }
                })
            }
        },
        mounted() {
            this.initSort()
        }
    }
</script>
