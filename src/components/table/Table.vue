<template>
    <div class="b-table">
        <table class="table" :class="{ 'is-bordered': bordered, 'is-striped': striped, 'is-narrow': narrow }">
            <slot></slot>
            <thead>
                <tr>
                    <th class="checkbox-cell" v-if="checkable">
                        <b-checkbox :value="isAllChecked" @change="checkAll($event)"></b-checkbox>
                    </th>
                    <th
                        v-for="column in columns" @click="sort(column)"
                        :class="{ 'is-current-sort': column.isCurrentSort, 'is-sortable': column.isSortable }"
                        :style="{ width: column.width + 'px' }">
                        <div class="th-wrap" :class="{ 'is-numeric': column.isNumeric }">
                            {{ column.label }}
                            <b-icon
                                icon="arrow_upward"
                                both
                                size="is-small"
                                :class="{ 'is-reverse': column.isReverse, 'is-visible': column.isCurrentSort }">
                            </b-icon>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody :style="{ height: height + 'px' }">
                <tr
                    v-for="(item, index) in visibleData"
                    @click="selectItem(item)"
                    @dblclick="$emit('dblclick', item)"
                    :class="{ 'is-selected': item === selectedItem }">

                    <td class="checkbox-cell" v-if="checkable">
                        <b-checkbox :value="isItemChecked(item)" @change="checkItem(item, $event)"></b-checkbox>
                    </td>
                    <td v-for="column in columns" :class="{ 'has-text-right': column.isNumeric }" :style="{ width: column.width + 'px' }">
                        <template v-for="(cell, key) in item" v-if="key === column.field">
                            <span v-if="html" v-html="html ? cell : null"></span>
                            {{ !html ? cell : null }}
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
                        :simple="simplePagination"
                        :current="currentPage"
                        @change="pageChanged">
                    </b-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import sortBy from 'lodash/sortBy'
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
            data: Array,
            height: [Number, String],
            bordered: Boolean,
            striped: Boolean,
            narrow: Boolean,
            selectable: Boolean,
            checkable: Boolean,
            defaultSort: String,
            paginated: Boolean,
            perPage: [Number, String],
            simplePagination: Boolean,
            html: Boolean
        },
        data() {
            return {
                columns: [],
                newData: this.data,
                selectedItem: {},
                checkedItems: [],
                currentPage: 1
            }
        },
        watch: {
            data(value) {
                this.newData = value
                this.resetCurrentSortColumn()
            }
        },
        computed: {
            visibleData() {
                if (!this.paginated) return this.newData

                const currentPage = this.currentPage || 1
                const perPage = this.perPage || 20

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
            }
        },
        methods: {
            sort(column) {
                if (!column.isSortable) return

                if (!column.isCurrentSort) {
                    this.resetCurrentSortColumn()
                    column.isReverse = false
                    this.newData = sortBy(this.newData, column.field)
                } else {
                    column.isReverse = !column.isReverse
                    this.newData.reverse()
                }
                column.isCurrentSort = true
            },
            resetCurrentSortColumn() {
                this.columns.forEach(column => {
                    column.isCurrentSort = false
                    column.isReverse = false
                })
            },

            checkAll(isChecked) {
                this.visibleData.forEach(currentItem => {
                    this.removeCheckedItem(currentItem)
                    if (isChecked) {
                        this.checkedItems.push(currentItem)
                    }
                })

                this.$emit('check', this.checkedItems)
                this.$emit('check-all')
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
                this.columns.forEach(column => {
                    if (column.field === this.defaultSort) {
                        this.sort(column)
                    }
                })
            }
        },
        mounted() {
            this.initSort()
        }
    }
</script>
