<template>
    <div class="b-table" :class="rooClasses">
        <b-table-mobile-sort
            v-if="mobileCards && hasSortablenewColumns"
            :current-sort-column="currentSortColumn"
            :sort-multiple="sortMultiple"
            :sort-multiple-data="sortMultipleDataComputed"
            :is-asc="isAsc"
            :columns="newColumns"
            :placeholder="mobileSortPlaceholder"
            :icon-pack="iconPack"
            :sort-icon="sortIcon"
            :sort-icon-size="sortIconSize"
            @sort="(column, event) => sort(column, null, event)"
            @removePriority="(column) => removeSortingPriority(column)"
        />

        <div
            v-if="paginated && (paginationPosition === 'top' || paginationPosition === 'both')"
            class="top level">
            <div class="level-left">
                <slot name="top-left"/>
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
                        @change="pageChanged"
                        :aria-next-label="ariaNextLabel"
                        :aria-previous-label="ariaPreviousLabel"
                        :aria-page-label="ariaPageLabel"
                        :aria-current-label="ariaCurrentLabel" />
                </div>
            </div>
        </div>

        <div
            class="table-wrapper"
            :class="tableWrapperClasses"
            :style="{
                height: height === undefined ? null :
                (isNaN(height) ? height : height + 'px')
            }"
        >
            <table
                class="table"
                :class="tableClasses"
                :tabindex="!focusable ? false : 0"
                @keydown.self.prevent.up="pressedArrow(-1)"
                @keydown.self.prevent.down="pressedArrow(1)">
                <thead v-if="newColumns.length">
                    <tr>
                        <th v-if="showDetailRowIcon" width="40px"/>
                        <th class="checkbox-cell" v-if="checkable && checkboxPosition === 'left'">
                            <template v-if="headerCheckable">
                                <b-checkbox
                                    :value="isAllChecked"
                                    :disabled="isAllUncheckable"
                                    @change.native="checkAll"/>
                            </template>
                        </th>
                        <th
                            v-for="(column, index) in visibleColumns"
                            :key="index"
                            :class="[column.headerClass, {
                                'is-current-sort': !sortMultiple && currentSortColumn === column,
                                'is-sortable': column.sortable,
                                'is-sticky': column.sticky,
                                'is-unselectable': !column.headerSelectable
                            }]"
                            :style="{
                                width: column.width === undefined ? null :
                                (isNaN(column.width) ? column.width : column.width + 'px')
                            }"
                            @click.stop="sort(column, null, $event)">
                            <div
                                class="th-wrap"
                                :class="{
                                    'is-numeric': column.numeric,
                                    'is-centered': column.centered
                            }">
                                <template v-if="column.$scopedSlots && column.$scopedSlots.header">
                                    <b-slot-component
                                        :component="column"
                                        :scoped="true"
                                        name="header"
                                        tag="span"
                                        :props="{ column, index }"
                                    />
                                </template>
                                <template v-else-if="$scopedSlots.header">
                                    <slot
                                        name="header"
                                        :column="column"
                                        :index="index"
                                    />
                                </template>
                                <template v-else>{{ column.label }}</template>

                                <template
                                    v-if="sortMultiple &&
                                        sortMultipleDataComputed &&
                                        sortMultipleDataComputed.length > 0 &&
                                        sortMultipleDataComputed.filter(i =>
                                    i.field === column.field).length > 0">
                                    <b-icon
                                        :icon="sortIcon"
                                        :pack="iconPack"
                                        both
                                        :size="sortIconSize"
                                        :class="{
                                            'is-desc': sortMultipleDataComputed.filter(i =>
                                                i.field === column.field)[0].order === 'desc'
                                        }"
                                    />
                                    {{ findIndexOfSortData(column) }}
                                    <button
                                        class="delete is-small multi-sort-cancel-icon"
                                        type="button"
                                        @click.stop="removeSortingPriority(column)"/>
                                </template>

                                <b-icon
                                    v-else-if="column.sortable && !sortMultiple"
                                    :icon="sortIcon"
                                    :pack="iconPack"
                                    both
                                    :size="sortIconSize"
                                    :class="{
                                        'is-desc': !isAsc,
                                        'is-invisible': currentSortColumn !== column
                                    }"
                                />
                            </div>
                        </th>
                        <th class="checkbox-cell" v-if="checkable && checkboxPosition === 'right'">
                            <template v-if="headerCheckable">
                                <b-checkbox
                                    :value="isAllChecked"
                                    :disabled="isAllUncheckable"
                                    @change.native="checkAll"/>
                            </template>
                        </th>
                    </tr>
                    <tr v-if="hasCustomSubheadings" class="is-subheading">
                        <th v-if="showDetailRowIcon" width="40px"/>
                        <th v-if="checkable && checkboxPosition === 'left'" />
                        <th
                            v-for="(column, index) in visibleColumns"
                            :key="index"
                            :style="{
                                width: column.width === undefined ? null
                            : (isNaN(column.width) ? column.width : column.width + 'px') }">
                            <div
                                class="th-wrap"
                                :class="{
                                    'is-numeric': column.numeric,
                                    'is-centered': column.centered
                            }">
                                <template
                                    v-if="column.$scopedSlots && column.$scopedSlots.subheading"
                                >
                                    <b-slot-component
                                        :component="column"
                                        :scoped="true"
                                        name="subheading"
                                        tag="span"
                                        :props="{ column, index }"
                                    />
                                </template>
                                <template v-else-if="$scopedSlots.subheading">
                                    <slot
                                        name="subheading"
                                        :column="column"
                                        :index="index"
                                    />
                                </template>
                                <template v-else>{{ column.subheading }}</template>
                            </div>
                        </th>
                        <th v-if="checkable && checkboxPosition === 'right'" />
                    </tr>
                    <tr v-if="hasSearchablenewColumns">
                        <th v-if="showDetailRowIcon" width="40px"/>
                        <th v-if="checkable && checkboxPosition === 'left'" />
                        <th
                            v-for="(column, index) in visibleColumns"
                            :key="index"
                            :style="{
                                width: column.width === undefined ? null
                            : (isNaN(column.width) ? column.width : column.width + 'px') }">
                            <div class="th-wrap">
                                <template v-if="column.searchable">
                                    <b-input
                                        @[filtersEvent].native="onFiltersEvent"
                                        v-model="filters[column.field]"
                                        :type="column.numeric ? 'number' : 'text'" />
                                </template>
                            </div>
                        </th>
                        <th v-if="checkable && checkboxPosition === 'right'" />
                    </tr>
                </thead>
                <tbody v-if="visibleData.length">
                    <template v-for="(row, index) in visibleData">
                        <tr
                            :key="customRowKey ? row[customRowKey] : index"
                            :class="[rowClass(row, index), {
                                'is-selected': row === selected,
                                'is-checked': isRowChecked(row),
                            }]"
                            @click="selectRow(row)"
                            @dblclick="$emit('dblclick', row)"
                            @mouseenter="$listeners.mouseenter ? $emit('mouseenter', row) : null"
                            @mouseleave="$listeners.mouseleave ? $emit('mouseleave', row) : null"
                            @contextmenu="$emit('contextmenu', row, $event)"
                            :draggable="draggable"
                            @dragstart="handleDragStart($event, row, index)"
                            @dragend="handleDragEnd($event, row, index)"
                            @drop="handleDrop($event, row, index)"
                            @dragover="handleDragOver($event, row, index)"
                            @dragleave="handleDragLeave($event, row, index)">

                            <td
                                v-if="showDetailRowIcon"
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

                            <td
                                class="checkbox-cell"
                                v-if="checkable && checkboxPosition === 'left'">
                                <b-checkbox
                                    :disabled="!isRowCheckable(row)"
                                    :value="isRowChecked(row)"
                                    @click.native.prevent.stop="checkRow(row, index, $event)"
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
                                    :key="column.customKey || column.label"
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

                            <td
                                class="checkbox-cell"
                                v-if="checkable && checkboxPosition === 'right'">
                                <b-checkbox
                                    :disabled="!isRowCheckable(row)"
                                    :value="isRowChecked(row)"
                                    @click.native.prevent.stop="checkRow(row, index, $event)"
                                />
                            </td>
                        </tr>

                        <!-- Do not add `key` here (breaks details) -->
                        <!-- eslint-disable-next-line -->
                        <tr
                            v-if="isActiveDetailRow(row)"
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
                        <slot
                            v-if="isActiveCustomDetailRow(row)"
                            name="detail"
                            :row="row"
                            :index="index"
                        />
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

        <div
            v-if="(checkable && hasBottomLeftSlot()) ||
            (paginated && (paginationPosition === 'bottom' || paginationPosition === 'both'))"
            class="level">
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
                        @change="pageChanged"
                        :aria-next-label="ariaNextLabel"
                        :aria-previous-label="ariaPreviousLabel"
                        :aria-page-label="ariaPageLabel"
                        :aria-current-label="ariaCurrentLabel" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getValueByPath, indexOf, multiColumnSort } from '../../utils/helpers'
import Checkbox from '../checkbox/Checkbox'
import Icon from '../icon/Icon'
import Input from '../input/Input'
import Pagination from '../pagination/Pagination'
import SlotComponent from '../../utils/SlotComponent'
import TableMobileSort from './TableMobileSort'
import TableColumn from './TableColumn'

export default {
    name: 'BTable',
    components: {
        [Checkbox.name]: Checkbox,
        [Icon.name]: Icon,
        [Input.name]: Input,
        [Pagination.name]: Pagination,
        [SlotComponent.name]: SlotComponent,
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
        headerCheckable: {
            type: Boolean,
            default: true
        },
        checkboxPosition: {
            type: String,
            default: 'left',
            validator: (value) => {
                return [
                    'left',
                    'right'
                ].indexOf(value) >= 0
            }
        },
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
        defaultSort: [String, Array],
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
            type: Array,
            default: () => []
        },
        sortMultipleKey: {
            type: String,
            default: null
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
        showDetailIcon: {
            type: Boolean,
            default: true
        },
        paginationSimple: Boolean,
        paginationSize: String,
        paginationPosition: {
            type: String,
            default: 'bottom',
            validator: (value) => {
                return [
                    'bottom',
                    'top',
                    'both'
                ].indexOf(value) >= 0
            }
        },
        backendSorting: Boolean,
        backendFiltering: Boolean,
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
        customDetailRow: {
            type: Boolean,
            default: false
        },
        backendPagination: Boolean,
        total: {
            type: [Number, String],
            default: 0
        },
        iconPack: String,
        mobileSortPlaceholder: String,
        customRowKey: String,
        draggable: {
            type: Boolean,
            default: false
        },
        scrollable: Boolean,
        ariaNextLabel: String,
        ariaPreviousLabel: String,
        ariaPageLabel: String,
        ariaCurrentLabel: String,
        stickyHeader: Boolean,
        height: [Number, String],
        filtersEvent: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            sortMultipleDataLocal: [],
            getValueByPath,
            newColumns: [...this.columns],
            visibleDetailRows: this.openedDetailed,
            newData: this.data,
            newDataTotal: this.backendPagination ? this.total : this.data.length,
            newCheckedRows: [...this.checkedRows],
            lastCheckedRowIndex: null,
            newCurrentPage: this.currentPage,
            currentSortColumn: {},
            isAsc: true,
            filters: {},
            firstTimeSort: true, // Used by first time initSort
            _isTable: true // Used by TableColumn
        }
    },
    computed: {
        sortMultipleDataComputed() {
            if (this.backendSorting) {
                return this.sortMultipleData
            } else {
                return this.sortMultipleDataLocal
            }
        },
        tableClasses() {
            return {
                'is-bordered': this.bordered,
                'is-striped': this.striped,
                'is-narrow': this.narrowed,
                'is-hoverable': (
                    (this.hoverable || this.focusable) &&
                    this.visibleData.length
                )
            }
        },
        tableWrapperClasses() {
            return {
                'has-mobile-cards': this.mobileCards,
                'has-sticky-header': this.stickyHeader,
                'table-container': this.isScrollable
            }
        },
        rooClasses() {
            return {
                'is-loading': this.loading
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

        visibleColumns() {
            if (!this.newColumns) return this.newColumns
            return this.newColumns.filter((column) => {
                return column.visible || column.visible === undefined
            })
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
        * Check if has any searchable column.
        */
        hasSearchablenewColumns() {
            return this.newColumns.some((column) => {
                return column.searchable
            })
        },

        /**
        * Check if has any column using subheading.
        */
        hasCustomSubheadings() {
            if (this.$scopedSlots && this.$scopedSlots.subheading) return true
            return this.newColumns.some((column) => {
                return column.subheading || (column.$scopedSlots && column.$scopedSlots.subheading)
            })
        },

        /**
        * Return total column count based if it's checkable or expanded
        */
        columnCount() {
            let count = this.newColumns.length
            count += this.checkable ? 1 : 0
            count += (this.detailed && this.showDetailIcon) ? 1 : 0

            return count
        },

        /**
        * return if detailed row tabled
        * will be with chevron column & icon or not
        */
        showDetailRowIcon() {
            return this.detailed && this.showDetailIcon
        },

        /**
        * return if scrollable table
        */
        isScrollable() {
            if (this.scrollable) return true
            if (!this.newColumns) return false
            return this.newColumns.some((column) => {
                return column.sticky
            })
        }
    },
    watch: {
        /**
        * When data prop change:
        *   1. Update internal value.
        *   2. Sort again if it's not backend-sort.
        *   3. Set new total if it's not backend-paginated.
        */
        data(value) {
            this.newData = value
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
        * When checkedRows prop change, update internal value without
        * mutating original data.
        */
        checkedRows(rows) {
            this.newCheckedRows = [...rows]
        },

        columns(value) {
            this.newColumns = [...value]
        },

        newColumns(value) {
            this.checkSort()
        },

        filters: {
            handler(value) {
                if (this.backendFiltering) {
                    this.$emit('filters-change', value)
                } else {
                    this.newData = this.data.filter(
                        (row) => this.isRowFiltered(row))
                    if (!this.backendPagination) {
                        this.newDataTotal = this.newData.length
                    }
                }
            },
            deep: true
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
        onFiltersEvent(event) {
            this.$emit(`filters-event-${this.filtersEvent}`, { event, filters: this.filters })
        },
        findIndexOfSortData(column) {
            let sortObj = this.sortMultipleDataComputed.filter((i) =>
                i.field === column.field)[0]
            return this.sortMultipleDataComputed.indexOf(sortObj) + 1
        },
        removeSortingPriority(column) {
            if (this.backendSorting) {
                this.$emit('sorting-priority-removed', column.field)
            } else {
                this.sortMultipleDataLocal = this.sortMultipleDataLocal.filter(
                    (priority) => priority.field !== column.field)

                let formattedSortingPriority = this.sortMultipleDataLocal.map((i) => {
                    return (i.order && i.order === 'desc' ? '-' : '') + i.field
                })
                this.newData = multiColumnSort(this.newData, formattedSortingPriority)
            }
        },
        resetMultiSorting() {
            this.sortMultipleDataLocal = []
            this.currentSortColumn = {}
            this.newData = this.data
        },
        /**
        * Sort an array by key without mutating original data.
        * Call the user sort function if it was passed.
        */
        sortBy(array, key, fn, isAsc) {
            let sorted = []
            // Sorting without mutating original data
            if (fn && typeof fn === 'function') {
                sorted = [...array].sort((a, b) => fn(a, b, isAsc))
            } else {
                sorted = [...array].sort((a, b) => {
                    // Get nested values from objects
                    let newA = getValueByPath(a, key)
                    let newB = getValueByPath(b, key)

                    // sort boolean type
                    if (typeof newA === 'boolean' && typeof newB === 'boolean') {
                        return isAsc ? newA - newB : newB - newA
                    }

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

        sortMultiColumn(column) {
            this.currentSortColumn = {}
            if (!this.backendSorting) {
                let existingPriority = this.sortMultipleDataLocal.filter((i) =>
                    i.field === column.field)[0]
                if (existingPriority) {
                    existingPriority.order = existingPriority.order === 'desc' ? 'asc' : 'desc'
                } else {
                    this.sortMultipleDataLocal.push(
                        {field: column.field, order: column.isAsc}
                    )
                }
                let formattedSortingPriority = this.sortMultipleDataLocal.map((i) => {
                    return (i.order && i.order === 'desc' ? '-' : '') + i.field
                })

                this.newData = multiColumnSort(this.newData, formattedSortingPriority)
            }
        },
        /**
        * Sort the column.
        * Toggle current direction on column if it's sortable
        * and not just updating the prop.
        */
        sort(column, updatingData = false, event = null) {
            if (
                // if backend sorting is enabled, just emit the sort press like usual
                // if the correct key combination isnt pressed, sort like usual
                !this.backendSorting &&
                this.sortMultiple &&
                ((this.sortMultipleKey && event[this.sortMultipleKey]) || !this.sortMultipleKey)
            ) {
                this.sortMultiColumn(column)
            } else {
                if (!column || !column.sortable) return

                // sort multiple is enabled but the correct key combination isnt pressed so reset
                if (this.sortMultiple) {
                    this.sortMultipleDataLocal = []
                }

                if (!updatingData) {
                    this.isAsc = column === this.currentSortColumn
                        ? !this.isAsc
                        : (this.defaultSortDirection.toLowerCase() !== 'desc')
                }
                if (!this.firstTimeSort) {
                    this.$emit('sort', column.field, this.isAsc ? 'asc' : 'desc', event)
                }
                if (!this.backendSorting) {
                    this.newData = this.sortBy(
                        this.newData,
                        column.field,
                        column.customSort,
                        this.isAsc
                    )
                }
                this.currentSortColumn = column
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

        /**
        * Row checkbox click listener.
        */
        checkRow(row, index, event) {
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

        /**
         * Check row when shift is pressed.
         */
        shiftCheckRow(row, index, lastCheckedRowIndex) {
            // Get the subset of the list between the two indicies
            const subset = this.visibleData.slice(
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

        isActiveDetailRow(row) {
            return this.detailed && !this.customDetailRow && this.isVisibleDetailRow(row)
        },

        isActiveCustomDetailRow(row) {
            return this.detailed && this.customDetailRow && this.isVisibleDetailRow(row)
        },

        isRowFiltered(row) {
            for (const key in this.filters) {
                // remove key if empty
                if (!this.filters[key]) {
                    delete this.filters[key]
                    return true
                }
                let value = this.getValueByPath(row, key)
                if (value == null) return false
                if (Number.isInteger(value)) {
                    if (value !== Number(this.filters[key])) return false
                } else {
                    const re = new RegExp(this.filters[key], 'i')
                    if (typeof value === 'boolean') value = `${value}`
                    if (!value.match(re)) return false
                }
            }
            return true
        },

        /**
            * When the detailKey is defined we use the object[detailKey] as index.
            * If not, use the object reference by default.
            */
        handleDetailKey(index) {
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
        },

        /**
        * Call initSort only first time (For example async data).
        */
        checkSort() {
            if (this.newColumns.length && this.firstTimeSort) {
                this.initSort()
                this.firstTimeSort = false
            } else if (this.newColumns.length) {
                if (this.currentSortColumn.field) {
                    for (let i = 0; i < this.newColumns.length; i++) {
                        if (this.newColumns[i].field === this.currentSortColumn.field) {
                            this.currentSortColumn = this.newColumns[i]
                            break
                        }
                    }
                }
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

            this.newColumns.forEach((column) => {
                if (column.field === sortField) {
                    this.isAsc = sortDirection.toLowerCase() !== 'desc'
                    this.sort(column, true)
                }
            })
        },
        /**
        * Emits drag start event
        */
        handleDragStart(event, row, index) {
            this.$emit('dragstart', {event, row, index})
        },
        /**
        * Emits drag leave event
        */
        handleDragEnd(event, row, index) {
            this.$emit('dragend', {event, row, index})
        },
        /**
        * Emits drop event
        */
        handleDrop(event, row, index) {
            this.$emit('drop', {event, row, index})
        },
        /**
        * Emits drag over event
        */
        handleDragOver(event, row, index) {
            this.$emit('dragover', {event, row, index})
        },
        /**
        * Emits drag leave event
        */
        handleDragLeave(event, row, index) {
            this.$emit('dragleave', {event, row, index})
        }
    },

    mounted() {
        this.checkPredefinedDetailedRows()
        this.checkSort()
    },

    beforeDestroy() {
        this.newData = []
        this.newColumns = []
    }
}
</script>
