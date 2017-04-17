<template>
    <div class="b-table">
        <slot></slot>

        <div class="field  is-hidden-tablet" v-if="mobileCards && hasSortableColumns">
            <p class="control">
                <span class="select is-fullwidth">
                    <select v-model="mobileSort">
                        <option
                            v-for="column in columns"
                            v-if="column.isSortable"
                            :value="column">
                            {{ column.label }}
                        </option>
                    </select>
                </span>
            </p>
        </div>

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
                        <b-checkbox :value="isAllChecked" @change="checkAll($event)"></b-checkbox>
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
                <tr v-for="(item, index) in visibleData"
                    @click="selectItem(item)"
                    @dblclick="$emit('dblclick', item)"
                    :class="{ 'is-selected': item === selectedItem }">

                    <td class="checkbox-cell" v-if="checkable">
                        <b-checkbox :value="isItemChecked(item)" @change="checkItem(item, $event)"></b-checkbox>
                    </td>

                    <td v-for="column in columns"
                        :class="{ 'has-text-right': column.isNumeric }"
                        :data-label="column.label">

                        <template v-for="(cell, key) in item" v-if="key === column.field">
                            <span v-if="html" v-html="html ? column.format(cell, item) : null"></span>
                            <span v-if="!html">{{ !html ? column.format(cell, item) : null }}</span>
                        </template>

                    </td>

                </tr>
            </tbody>
        </table>

        <div class="level">
            <div class="level-left">
                <div class="level-item">
                    <p v-if="checkable && this.checkedItems.length > 0">({{ this.checkedItems.length }})</p>
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
            selectable: Boolean,
            checkable: Boolean,
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
            html: Boolean
        },
        data() {
            return {
                columns: [],
                newData: this.data,
                selectedItem: {},
                checkedItems: [],
                currentSortColumn: {},
                mobileSort: {},
                currentPage: 1,
                isTableComponent: true // Used by TableColumn
            }
        },
        watch: {
            data(value) {
                console.log('ciao')
                this.newData = value
                this.sort(this.currentSortColumn, true)
                // this.currentSortColumn = {}
            },
            selectable(value) {
                if (!value) this.selectedItem = {}
            },
            mobileSort(column) {
                if (this.currentSortColumn === column) return

                this.sort(column)
            },
            currentSortColumn(column) {
                this.mobileSort = column
            }
        },
        computed: {
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
            isAllChecked() {
                // check if all items on page are checked
                const isAllChecked = this.visibleData.some(currentVisibleItem => {
                    return this.checkedItems.indexOf(currentVisibleItem) < 0
                })
                return !isAllChecked
            },
            hasSortableColumns() {
                return this.columns.some(column => {
                    return column.isSortable
                })
            }
        },
        methods: {
            sortBy(array, key, fn) {
                // Sorting without mutating original data
                if (!fn) {
                    return [...array].sort((a, b) => {
                        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0

                        const newA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key]
                        const newB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key]

                        return newA > newB ? 1 : -1
                    })
                } else {
                    if (typeof fn !== 'function') return

                    return [...array].sort(fn)
                }
            },
            sort(column, updatingData) {
                if (!column || !column.isSortable) return

                if (column === this.currentSortColumn && !updatingData) {
                    column.isAsc = !column.isAsc
                    this.newData = this.newData.slice(0).reverse()
                } else {
                    column.isAsc = true
                    this.newData = this.sortBy(this.newData, column.field, column.customSort)
                }
                this.currentSortColumn = column
            },

            checkAll(isChecked) {
                this.visibleData.forEach(currentItem => {
                    this.removeCheckedItem(currentItem)
                    if (isChecked) {
                        this.checkedItems.push(currentItem)
                    }
                })

                this.$emit('check', this.checkedItems)
                this.$emit('check-all', this.checkedItems)
            },
            checkItem(item, isChecked) {
                if (isChecked) {
                    this.checkedItems.push(item)
                } else {
                    this.removeCheckedItem(item)
                }

                this.$emit('check', this.checkedItems, item)
            },
            removeCheckedItem(item) {
                const index = this.checkedItems.indexOf(item)
                if (index >= 0) {
                    this.checkedItems.splice(index, 1)
                }
            },
            isItemChecked(item) {
                return this.checkedItems.indexOf(item) >= 0
            },

            selectItem(item, index) {
                this.$emit('click', item)
                if (!this.selectable || this.selectedItem.item === item) return

                // Emit new and old item
                this.$emit('select', item, this.selectedItem.item)

                // Save new item
                this.selectedItem = item
            },
            pageChanged(page) {
                this.currentPage = page > 0 ? page : 1
            },
            initSort() {
                if (!this.defaultSort) return

                const sortField = Array.isArray(this.defaultSort) ? this.defaultSort[0] : this.defaultSort
                const direction = this.defaultSort[1] || ''

                this.columns.forEach(column => {
                    if (column.field === sortField) {
                        this.sort(column)
                        if (direction.toLowerCase() === 'desc') {
                            this.newData.reverse()
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
