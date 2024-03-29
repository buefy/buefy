<template>
    <div class="b-table" v-bind="rootAttrs">
        <slot />

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
            @remove-priority="(column) => removeSortingPriority(column)"
        />

        <template
            v-if="paginated && (paginationPosition === 'top' || paginationPosition === 'both')"
        >
            <slot name="pagination">
                <b-table-pagination
                    v-bind="fallthroughAttrs"
                    :per-page="perPage"
                    :paginated="paginated"
                    :rounded="paginationRounded"
                    :icon-pack="iconPack"
                    :total="newDataTotal"
                    v-model:current-page="newCurrentPage"
                    :aria-next-label="ariaNextLabel"
                    :aria-previous-label="ariaPreviousLabel"
                    :aria-page-label="ariaPageLabel"
                    :aria-current-label="ariaCurrentLabel"
                    @page-change="(event) => $emit('page-change', event)"
                    :page-input="pageInput"
                    :pagination-order="paginationOrder"
                    :page-input-position="pageInputPosition"
                    :debounce-page-input="debouncePageInput"
                >
                    <slot name="top-left" />
                </b-table-pagination>
            </slot>
        </template>

        <div
            class="table-wrapper"
            :class="tableWrapperClasses"
            :style="tableStyle"
        >
            <table
                class="table"
                :class="tableClasses"
                :tabindex="!focusable ? undefined : 0"
                @keydown.self.prevent.up="pressedArrow(-1)"
                @keydown.self.prevent.down="pressedArrow(1)"
            >
                <caption v-show="showCaption" v-if="caption">
                    {{ caption }}
                </caption>
                <thead v-if="newColumns.length && showHeader">
                    <tr>
                        <th v-if="showDetailRowIcon" width="40px" />
                        <th
                            :class="['checkbox-cell', { 'is-sticky': stickyCheckbox } ]"
                            v-if="checkable && checkboxPosition === 'left'"
                        >
                            <template v-if="headerCheckable">
                                <slot
                                    name="check-all"
                                    :is-all-checked="isAllChecked"
                                    :is-all-uncheckable="isAllUncheckable"
                                    :check-all="checkAll"
                                >
                                    <b-checkbox
                                        autocomplete="off"
                                        :model-value="isAllChecked"
                                        :type="checkboxType"
                                        :disabled="isAllUncheckable"
                                        @change="checkAll"
                                    />
                                </slot>
                            </template>
                        </th>
                        <th
                            v-for="(column, index) in visibleColumns"
                            :key="column.newKey + ':' + index + 'header'"
                            v-bind="column.thAttrs(column)"
                            :class="[column.thClasses, {
                                'is-current-sort': !sortMultiple && currentSortColumn === column,
                            }]"
                            :style="column.thStyle"
                            @click.stop="sort(column, null, $event)"
                            :draggable="canDragColumn"
                            @dragstart="handleColumnDragStart($event, column, index)"
                            @dragend="handleColumnDragEnd($event, column, index)"
                            @drop="handleColumnDrop($event, column, index)"
                            @dragover="handleColumnDragOver($event, column, index)"
                            @dragleave="handleColumnDragLeave($event, column, index)"
                            @touchstart="handleColumnTouchStart($event, column, index)"
                            @touchmove="handleColumnTouchMove($event, column, index)"
                            @touchend="handleColumnTouchEnd($event, column, index)"
                        >
                            <div
                                class="th-wrap is-relative"
                                :class="{
                                    'is-numeric': column.numeric,
                                    'is-centered': column.centered
                                }"
                                :style="column.thWrapStyle"
                            >
                                <template v-if="column.$slots.header">
                                    <b-slot-component
                                        :component="column"
                                        scoped
                                        name="header"
                                        tag="span"
                                        :props="{ column, index }"
                                    />
                                </template>
                                <template v-else>
                                    {{ column.label }}
                                    <template
                                        v-if="sortMultiple &&
                                            sortMultipleDataComputed &&
                                            sortMultipleDataComputed.length > 0 &&
                                            sortMultipleDataComputed.filter(i =>
                                                i.field === column.field).length > 0"
                                    >
                                        <span class="multi-sort-icons">
                                            <b-icon
                                                :icon="sortIcon"
                                                :pack="iconPack"
                                                both
                                                :size="sortIconSize"
                                                :class="{
                                                    'is-desc': sortMultipleDataComputed
                                                        .filter(i => i.field === column.field)[0]
                                                        .order === 'desc'}"
                                            />
                                            {{ findIndexOfSortData(column) }}
                                            <button
                                                class="delete is-small multi-sort-cancel-icon"
                                                type="button"
                                                @click.stop="removeSortingPriority(column)"
                                            />
                                        </span>
                                    </template>

                                    <b-icon
                                        v-else
                                        :icon="sortIcon"
                                        :pack="iconPack"
                                        both
                                        :size="sortIconSize"
                                        class="sort-icon"
                                        :class="{
                                            'is-desc': !isAsc,
                                            'is-invisible': currentSortColumn !== column
                                        }"
                                    />
                                </template>
                            </div>
                        </th>
                        <th
                            :class="['checkbox-cell', { 'is-sticky': stickyCheckbox } ]"
                            v-if="checkable && checkboxPosition === 'right'"
                        >
                            <template v-if="headerCheckable">
                                <slot
                                    name="check-all"
                                    :is-all-checked="isAllChecked"
                                    :is-all-uncheckable="isAllUncheckable"
                                    :check-all="checkAll"
                                >
                                    <b-checkbox
                                        autocomplete="off"
                                        :model-value="isAllChecked"
                                        :type="checkboxType"
                                        :disabled="isAllUncheckable"
                                        @change="checkAll"
                                    />
                                </slot>
                            </template>
                        </th>
                    </tr>
                    <tr v-if="hasCustomSubheadings" class="is-subheading">
                        <th v-if="showDetailRowIcon" width="40px" />
                        <th v-if="checkable && checkboxPosition === 'left'" />
                        <th
                            v-for="(column, index) in visibleColumns"
                            :key="column.newKey + ':' + index + 'subheading'"
                            :style="column.style"
                        >
                            <div
                                class="th-wrap"
                                :class="{
                                    'is-numeric': column.numeric,
                                    'is-centered': column.centered
                                }"
                                :style="column.thWrapStyle"
                            >
                                <template
                                    v-if="column.$slots.subheading"
                                >
                                    <b-slot-component
                                        :component="column"
                                        scoped
                                        name="subheading"
                                        tag="span"
                                        :props="{ column, index }"
                                    />
                                </template>
                                <template v-else>
                                    {{ column.subheading }}
                                </template>
                            </div>
                        </th>
                        <th v-if="checkable && checkboxPosition === 'right'" />
                    </tr>
                    <tr v-if="hasSearchablenewColumns">
                        <th v-if="showDetailRowIcon" width="40px" />
                        <th v-if="checkable && checkboxPosition === 'left'" />
                        <th
                            v-for="(column, index) in visibleColumns"
                            :key="column.newKey + ':' + index + 'searchable'"
                            v-bind="column.thAttrs(column)"
                            :style="column.thStyle"
                            :class="{'is-sticky': column.sticky}"
                        >
                            <div class="th-wrap" :style="column.thWrapStyle">
                                <template v-if="column.searchable">
                                    <template
                                        v-if="column.$slots.searchable"
                                    >
                                        <b-slot-component
                                            :component="column"
                                            :scoped="true"
                                            name="searchable"
                                            tag="span"
                                            :props="{ column, filters }"
                                        />
                                    </template>
                                    <b-input
                                        v-else
                                        @[filtersEvent]="onFiltersEvent"
                                        v-model="filters[column.field]"
                                        :type="column.numeric ? 'number' : 'text'"
                                    />
                                </template>
                            </div>
                        </th>
                        <th v-if="checkable && checkboxPosition === 'right'" />
                    </tr>
                </thead>
                <tbody>
                    <template
                        v-for="(row, index) in visibleData"
                        :key="customRowKey ? row[customRowKey] : index"
                    >
                        <tr
                            :class="[rowClass(row, index), {
                                'is-selected': isRowSelected(row, selected),
                                'is-checked': isRowChecked(row),
                            }]"
                            @click="selectRow(row)"
                            @dblclick="$emit('dblclick', row)"
                            @mouseenter="emitEventForRow('mouseenter', $event, row)"
                            @mouseleave="emitEventForRow('mouseleave', $event, row)"
                            @contextmenu="$emit('contextmenu', row, $event)"
                            :draggable="canDragRow"
                            @dragstart="handleDragStart($event, row, index)"
                            @dragend="handleDragEnd($event, row, index)"
                            @drop="handleDrop($event, row, index)"
                            @dragover="handleDragOver($event, row, index)"
                            @dragleave="handleDragLeave($event, row, index)"
                            @touchstart="handleTouchStart($event, row, index)"
                            @touchmove="handleTouchMove($event, row, index)"
                            @touchend="handleTouchEnd($event, row, index)"
                        >
                            <td
                                v-if="showDetailRowIcon"
                                class="chevron-cell"
                            >
                                <a
                                    v-if="hasDetailedVisible(row)"
                                    role="button"
                                    @click.stop="toggleDetails(row)"
                                >
                                    <b-icon
                                        :icon="detailIcon"
                                        :pack="iconPack"
                                        both
                                        :class="{'is-expanded': isVisibleDetailRow(row)}"
                                    />
                                </a>
                            </td>

                            <td
                                :class="['checkbox-cell', { 'is-sticky': stickyCheckbox } ]"
                                v-if="checkable && checkboxPosition === 'left'"
                            >
                                <b-checkbox
                                    autocomplete="off"
                                    :model-value="isRowChecked(row)"
                                    :type="checkboxType"
                                    :disabled="!isRowCheckable(row)"
                                    @click.prevent.stop="checkRow(row, index, $event)"
                                />
                            </td>

                            <template
                                v-for="(column, colindex) in visibleColumns"
                                :key="column.newKey + ':' + index + ':' + colindex"
                            >
                                <template v-if="column.$slots.default">
                                    <b-slot-component
                                        :component="column"
                                        v-bind="column.tdAttrs(row, column)"
                                        scoped
                                        name="default"
                                        tag="td"
                                        :class="column.getRootClasses(row)"
                                        :style="column.getRootStyle(row)"
                                        :data-label="column.label"
                                        :props="{
                                            row, column, index, colindex,
                                            toggleDetails, isActiveDetailRow
                                        }"
                                        @click="$emit('cellclick',row,column,index,colindex)"
                                    />
                                </template>
                            </template>

                            <td
                                :class="['checkbox-cell', { 'is-sticky': stickyCheckbox } ]"
                                v-if="checkable && checkboxPosition === 'right'"
                            >
                                <b-checkbox
                                    autocomplete="off"
                                    :model-value="isRowChecked(row)"
                                    :type="checkboxType"
                                    :disabled="!isRowCheckable(row)"
                                    @click.prevent.stop="checkRow(row, index, $event)"
                                />
                            </td>
                        </tr>

                        <transition
                            :name="detailTransition"
                        >
                            <tr
                                v-if="isActiveDetailRow(row)"
                                class="detail"
                            >
                                <td :colspan="columnCount">
                                    <div class="detail-container">
                                        <slot
                                            name="detail"
                                            :row="row"
                                            :index="index"
                                        />
                                    </div>
                                </td>
                            </tr>
                        </transition>
                        <slot
                            v-if="isActiveCustomDetailRow(row)"
                            name="detail"
                            :row="row"
                            :index="index"
                        />
                    </template>

                    <tr
                        v-if="!visibleData.length"
                        class="is-empty"
                    >
                        <td :colspan="columnCount">
                            <slot name="empty" />
                        </td>
                    </tr>
                </tbody>

                <tfoot v-if="$slots.footer !== undefined">
                    <tr class="table-footer">
                        <slot name="footer" v-if="hasCustomFooterSlot()" />
                        <th :colspan="columnCount" v-else>
                            <slot name="footer" />
                        </th>
                    </tr>
                </tfoot>
            </table>

            <template v-if="loading">
                <slot name="loading">
                    <b-loading :is-full-page="false" :model-value="loading" />
                </slot>
            </template>
        </div>

        <template
            v-if="(checkable && hasBottomLeftSlot()) ||
                (paginated && (paginationPosition === 'bottom' || paginationPosition === 'both'))"
        >
            <slot name="pagination">
                <b-table-pagination
                    v-bind="fallthroughAttrs"
                    :per-page="perPage"
                    :paginated="paginated"
                    :rounded="paginationRounded"
                    :icon-pack="iconPack"
                    :total="newDataTotal"
                    v-model:current-page="newCurrentPage"
                    :aria-next-label="ariaNextLabel"
                    :aria-previous-label="ariaPreviousLabel"
                    :aria-page-label="ariaPageLabel"
                    :aria-current-label="ariaCurrentLabel"
                    @page-change="(event) => $emit('page-change', event)"
                    :page-input="pageInput"
                    :pagination-order="paginationOrder"
                    :page-input-position="pageInputPosition"
                    :debounce-page-input="debouncePageInput"
                >
                    <slot name="bottom-left" />
                </b-table-pagination>
            </slot>
        </template>

        <!-- eslint-disable vue/no-v-html -->
        <div
            v-show="mayBeTouchDragging && (isDraggingRow || isDraggingColumn)"
            ref="draggedCell"
            class="touch-dragged-cell"
            :class="touchDraggedCellClasses"
            v-html="draggedCellContent"
        />
        <!-- eslint-enable vue/no-v-html -->
    </div>
</template>

<script>
import { toRaw } from 'vue'
import { getValueByPath, indexOf, multiColumnSort, escapeRegExpChars, toCssWidth, removeDiacriticsFromString, isFragment, isNil, translateTouchAsDragEvent, createAbsoluteElement, removeElement } from '../../utils/helpers'
import debounce from '../../utils/debounce'
import CompatFallthroughMixin from '../../utils/CompatFallthroughMixin'
import Checkbox from '../checkbox/Checkbox.vue'
import Icon from '../icon/Icon.vue'
import Input from '../input/Input.vue'
import Loading from '../loading/Loading.vue'
import SlotComponent from '../../utils/SlotComponent'
import TableMobileSort from './TableMobileSort.vue'
import TableColumn from './TableColumn.vue'
import TablePagination from './TablePagination.vue'
import mockTableColumn from './mockTableColumn'

export default {
    name: 'BTable',
    components: {
        [Checkbox.name]: Checkbox,
        [Icon.name]: Icon,
        [Input.name]: Input,
        [Loading.name]: Loading,
        [SlotComponent.name]: SlotComponent,
        [TableMobileSort.name]: TableMobileSort,
        [TableColumn.name]: TableColumn,
        [TablePagination.name]: TablePagination
    },
    mixins: [CompatFallthroughMixin],
    provide() {
        return {
            $table: this
        }
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
                ].indexOf(value) >= 0
            }
        },
        stickyCheckbox: {
            type: Boolean,
            default: false
        },
        selected: Object,
        isRowSelectable: {
            type: Function,
            default: () => true
        },
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
        detailIcon: {
            type: String,
            default: 'chevron-right'
        },
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
        paginationRounded: Boolean,
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
        detailTransition: {
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
        draggableColumn: {
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
        },
        cardLayout: Boolean,
        showHeader: {
            type: Boolean,
            default: true
        },
        debounceSearch: Number,
        caption: String,
        showCaption: {
            type: Boolean,
            default: true
        },
        pageInput: {
            type: Boolean,
            default: false
        },
        paginationOrder: String,
        pageInputPosition: String,
        debouncePageInput: [Number, String]
    },
    emits: [
        'cellclick',
        'check',
        'check-all',
        'click',
        'columndragend',
        'columndragleave',
        'columndragover',
        'columndragstart',
        'columndrop',
        'contextmenu',
        'dblclick',
        'details-close',
        'details-open',
        'dragend',
        'dragleave',
        'dragover',
        'dragstart',
        'drop',
        'filters-change',
        'page-change',
        'select',
        'sort',
        'sorting-priority-removed',
        'update:checkedRows',
        'update:currentPage',
        'update:openedDetailed',
        'update:selected'
    ],
    data() {
        return {
            sortMultipleDataLocal: [],
            getValueByPath,
            visibleDetailRows: this.openedDetailed,
            newData: this.data,
            newDataTotal: this.backendPagination ? this.total : this.data.length,
            newCheckedRows: [...this.checkedRows],
            lastCheckedRowIndex: null,
            newCurrentPage: this.currentPage,
            currentSortColumn: {},
            isAsc: true,
            filters: {},
            defaultSlots: [],
            firstTimeSort: true, // Used by first time initSort
            _isTable: true, // Used by TableColumn
            isDraggingRow: false,
            isDraggingColumn: false,
            // for touch-enabled devices
            _selectedRow: null,
            mayBeTouchDragging: false,
            touchDragoverTarget: null,
            _draggedCellEl: undefined,
            draggedCellContent: ''
        }
    },
    computed: {
        sortMultipleDataComputed() {
            return this.backendSorting ? this.sortMultipleData : this.sortMultipleDataLocal
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
                'is-card-list': this.cardLayout,
                'table-container': this.isScrollable
            }
        },
        tableStyle() {
            return {
                height: toCssWidth(this.height)
            }
        },
        touchDraggedCellClasses() {
            return {
                'has-mobile-cards': this.mobileCards
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
            if (this.$slots && this.$slots.subheading) return true
            return this.newColumns.some((column) => {
                return column.subheading || column.$slots.subheading
            })
        },

        /**
        * Return total column count based if it's checkable or expanded
        */
        columnCount() {
            let count = this.visibleColumns.length
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
        },

        newColumns() {
            if (this.columns && this.columns.length) {
                return this.columns.map((column) => {
                    return mockTableColumn(this, column)
                })
            }
            return this.defaultSlots
        },
        canDragRow() {
            return this.draggable && !this.isDraggingColumn
        },
        canDragColumn() {
            return this.draggableColumn && !this.isDraggingRow
        }
    },
    watch: {
        /**
        * When data prop change:
        *   1. Update internal value.
        *   2. Filter data if it's not backend-filtered.
        *   3. Sort again if it's not backend-sorted.
        *   4. Set new total if it's not backend-paginated.
        */
        data(value) {
            this.newData = value
            if (!this.backendFiltering) {
                this.newData = value.filter(
                    (row) => this.isRowFiltered(row))
            }
            if (!this.backendSorting) {
                this.sort(this.currentSortColumn, true)
            }
            if (!this.backendPagination) {
                this.newDataTotal = this.newData.length
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

        currentPage(newVal) {
            this.newCurrentPage = newVal
        },

        newCurrentPage(newVal) {
            this.$emit('update:currentPage', newVal)
        },

        /**
        * When checkedRows prop change, update internal value without
        * mutating original data.
        */
        checkedRows(rows) {
            this.newCheckedRows = [...rows]
        },

        /*
        newColumns(value) {
            this.checkSort()
        },
        */

        debounceSearch: {
            handler(value) {
                this.debouncedHandleFiltersChange = debounce(this.handleFiltersChange, value)
            },
            immediate: true
        },

        filters: {
            handler(value) {
                if (this.debounceSearch) {
                    this.debouncedHandleFiltersChange(value)
                } else {
                    this.handleFiltersChange(value)
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
        }
    },
    methods: {
        onFiltersEvent(event) {
            this.$emit(`filters-event-${this.filtersEvent}`, { event, filters: this.filters })
        },
        handleFiltersChange(value) {
            if (this.backendFiltering) {
                this.$emit('filters-change', value)
            } else {
                this.newData = this.data.filter(
                    (row) => this.isRowFiltered(row))
                if (!this.backendPagination) {
                    this.newDataTotal = this.newData.length
                }
                if (!this.backendSorting) {
                    if (this.sortMultiple &&
                        this.sortMultipleDataLocal && this.sortMultipleDataLocal.length > 0) {
                        this.doSortMultiColumn()
                    } else if (Object.keys(this.currentSortColumn).length > 0) {
                        this.doSortSingleColumn(this.currentSortColumn)
                    }
                }
            }
        },
        findIndexOfSortData(column) {
            const sortObj = this.sortMultipleDataComputed.filter((i) =>
                i.field === column.field)[0]
            return this.sortMultipleDataComputed.indexOf(sortObj) + 1
        },
        removeSortingPriority(column) {
            if (this.backendSorting) {
                this.$emit('sorting-priority-removed', column.field)
            } else {
                this.sortMultipleDataLocal = this.sortMultipleDataLocal.filter(
                    (priority) => priority.field !== column.field)

                if (this.sortMultipleDataLocal.length === 0) {
                    this.resetMultiSorting()
                } else {
                    this.newData = multiColumnSort(this.newData, this.sortMultipleDataLocal)
                }
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

        sortMultiColumn(column) {
            this.currentSortColumn = {}
            if (!this.backendSorting) {
                const existingPriority = this.sortMultipleDataLocal.filter((i) =>
                    i.field === column.field)[0]
                if (existingPriority) {
                    existingPriority.order = existingPriority.order === 'desc' ? 'asc' : 'desc'
                } else {
                    this.sortMultipleDataLocal.push({
                        field: column.field,
                        order: column.isAsc,
                        customSort: column.customSort
                    })
                }
                this.doSortMultiColumn()
            }
        },

        doSortMultiColumn() {
            this.newData = multiColumnSort(this.newData, this.sortMultipleDataLocal)
        },

        /**
        * Sort the column.
        * Toggle current direction on column if it's sortable
        * and not just updating the prop.
        */
        sort(column, updatingData = false, event = null) {
            if (!column || !column.sortable) return
            if (
                // if backend sorting is enabled, just emit the sort press like usual
                // if the correct key combination isnt pressed, sort like usual
                !this.backendSorting &&
                this.sortMultiple &&
                ((this.sortMultipleKey && event[this.sortMultipleKey]) || !this.sortMultipleKey)
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

        doSortSingleColumn(column) {
            this.newData = this.sortBy(
                this.newData,
                column.field,
                column.customSort,
                this.isAsc
            )
        },

        isRowSelected(row, selected) {
            if (!selected) {
                return false
            }
            if (this.customRowKey) {
                return row[this.customRowKey] === selected[this.customRowKey]
            }
            return row === selected
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

            this._selectedRow = row // row must be clicked before dragging by touch
            if (this.selected === row) return
            if (!this.isRowSelectable(row)) return

            // Emit new and old row
            this.$emit('select', row, this.selected)

            // Emit new row to update user variable
            this.$emit('update:selected', row)
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
            if (i >= 0) {
                this.visibleDetailRows.splice(i, 1)
            }
        },

        isVisibleDetailRow(obj) {
            const index = this.handleDetailKey(obj)
            return this.visibleDetailRows.indexOf(index) >= 0
        },

        isActiveDetailRow(row) {
            return this.detailed && !this.customDetailRow && this.isVisibleDetailRow(row)
        },

        isActiveCustomDetailRow(row) {
            return this.detailed && this.customDetailRow && this.isVisibleDetailRow(row)
        },

        isRowFiltered(row) {
            for (const key in this.filters) {
                if (!this.filters[key]) continue
                const input = this.filters[key]
                const column = this.newColumns.filter((c) => c.field === key)[0]
                if (column && column.customSearch && typeof column.customSearch === 'function') {
                    if (!column.customSearch(row, input)) return false
                } else {
                    const value = this.getValueByPath(row, key)
                    if (value == null) return false
                    if (Number.isInteger(value)) {
                        if (value !== Number(input)) return false
                    } else {
                        const re = new RegExp(escapeRegExpChars(input), 'i')
                        if (Array.isArray(value)) {
                            const valid = value.some((val) =>
                                re.test(removeDiacriticsFromString(val)) || re.test(val)
                            )
                            if (!valid) return false
                        } else {
                            if (!re.test(removeDiacriticsFromString(value)) && !re.test(value)) {
                                return false
                            }
                        }
                    }
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
                if (Object.keys(this.currentSortColumn).length > 0) {
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
        *
        * Assumes that `$slots.footer` is specified.
        */
        hasCustomFooterSlot() {
            const footer = this.$slots.footer()
            if (footer.length > 1) return true

            // if a template is specified to `footer`, `footer.length` is 1
            // but should contain multiple elements.
            if (isFragment(footer[0])) return true

            const tag = footer[0].tag
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

            const row = this.visibleData[index]

            if (!this.isRowSelectable(row)) {
                let newIndex = null
                if (pos > 0) {
                    for (let i = index; i < this.visibleData.length && newIndex === null; i++) {
                        if (this.isRowSelectable(this.visibleData[i])) newIndex = i
                    }
                } else {
                    for (let i = index; i >= 0 && newIndex === null; i--) {
                        if (this.isRowSelectable(this.visibleData[i])) newIndex = i
                    }
                }
                if (newIndex >= 0) {
                    this.selectRow(this.visibleData[newIndex])
                }
            } else {
                this.selectRow(row)
            }
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

                const sortColumn = this.newColumns.filter(
                    (column) => (column.field === sortField))[0]
                if (sortColumn) {
                    this.isAsc = sortDirection.toLowerCase() !== 'desc'
                    this.sort(sortColumn, true)
                }
            }
        },
        /**
        * Emits drag start event (row)
        */
        handleDragStart(event, row, index) {
            if (!this.canDragRow) return
            this.isDraggingRow = true
            this.$emit('dragstart', { event, row, index })
        },
        /**
        * Emits drag leave event (row)
        */
        handleDragEnd(event, row, index) {
            if (!this.canDragRow) return
            this.isDraggingRow = false
            this.$emit('dragend', { event, row, index })
        },
        /**
        * Emits drop event (row)
        */
        handleDrop(event, row, index) {
            if (!this.canDragRow) return
            this.$emit('drop', { event, row, index })
        },
        /**
        * Emits drag over event (row)
        */
        handleDragOver(event, row, index) {
            if (!this.canDragRow) return
            this.$emit('dragover', { event, row, index })
        },
        /**
        * Emits drag leave event (row)
        */
        handleDragLeave(event, row, index) {
            if (!this.canDragRow) return
            this.$emit('dragleave', { event, row, index })
        },

        emitEventForRow(eventName, event, row) {
            // eventName should not be in `emits` because it is never included
            // in `$attrs` if it is listed in `emits`.
            return this.$attrs[`on${eventName}`] ? this.$emit(eventName, row, event) : null
        },

        /**
        * Emits drag start event (column)
        */
        handleColumnDragStart(event, column, index) {
            if (!this.canDragColumn) return
            this.isDraggingColumn = true
            this.$emit('columndragstart', { event, column, index })
        },

        /**
        * Emits drag leave event (column)
        */
        handleColumnDragEnd(event, column, index) {
            if (!this.canDragColumn) return
            this.isDraggingColumn = false
            this.$emit('columndragend', { event, column, index })
        },

        /**
        * Emits drop event (column)
        */
        handleColumnDrop(event, column, index) {
            if (!this.canDragColumn) return
            this.$emit('columndrop', { event, column, index })
        },

        /**
        * Emits drag over event (column)
        */
        handleColumnDragOver(event, column, index) {
            if (!this.canDragColumn) return
            this.$emit('columndragover', { event, column, index })
        },

        /**
        * Emits drag leave event (column)
        */
        handleColumnDragLeave(event, column, index) {
            if (!this.canDragColumn) return
            this.$emit('columndragleave', { event, column, index })
        },

        /**
        * Starts monitoring drag-by-touch events (row on touch-enabled devices)
        */
        handleTouchStart(event, row, index) {
            if (!this.canDragRow) return
            if (this.isDraggingColumn) return
            // drag won't start unless the row has been clicked (tapped)
            // I think trapping touch-scrolling is annoying
            if (this._selectedRow !== row) return
            event.preventDefault()
            this.mayBeTouchDragging = true
        },
        /**
        * Emits dragover and dragleave events (row on touch-enabled devices)
        *
        * Emits also dragstart if this is the first touchmove after touchstart.
        */
        handleTouchMove(event, row, index) {
            if (!this.canDragRow) return
            if (!this.mayBeTouchDragging) return
            if (!this.isDraggingRow) {
                const tr = event.target.closest('tr')
                this.draggedCellContent = tr
                    ? `<table class="table"><tr>${tr.innerHTML}</tr></table>`
                    : event.target.innerHTML
                this.$refs.draggedCell.style.width = tr
                    ? `${tr.offsetWidth}px`
                    : `${event.target.offsetWidth}px`
                event.target.dispatchEvent(translateTouchAsDragEvent(event, {
                    type: 'dragstart'
                }))
            }
            const touch = event.touches[0]
            const target = document.elementFromPoint(touch.clientX, touch.clientY)
            if (target != null) {
                if (target !== this.touchDragoverTarget) {
                    if (this.touchDragoverTarget != null) {
                        this.touchDragoverTarget.dispatchEvent(
                            translateTouchAsDragEvent(event, {
                                type: 'dragleave',
                                target: this.touchDragoverTarget
                            })
                        )
                    }
                    this.touchDragoverTarget = target
                    target.dispatchEvent(
                        translateTouchAsDragEvent(event, {
                            type: 'dragover',
                            target
                        })
                    )
                }
            } else if (this.touchDragoverTarget != null) {
                this.touchDragoverTarget.dispatchEvent(
                    translateTouchAsDragEvent(event, {
                        type: 'dragleave',
                        target: this.touchDragoverTarget
                    })
                )
                this.touchDragoverTarget = null
            }
            this.updateDraggedCell(touch)
        },
        /**
        * Emits drop and dragend events (row on touch-enabled devices)
        */
        handleTouchEnd(event, row, index) {
            if (!this.canDragRow) return
            if (this.isDraggingRow) {
                const touch = event.changedTouches[0]
                const target = document.elementFromPoint(touch.clientX, touch.clientY)
                if (target != null) {
                    target.dispatchEvent(translateTouchAsDragEvent(event, {
                        type: 'drop',
                        target
                    }))
                }
                event.target.dispatchEvent(translateTouchAsDragEvent(event, {
                    type: 'dragend'
                }))
                this._selectedRow = null
            }
            this.mayBeTouchDragging = false
        },

        /**
        * Starts monitoring drag-by-touch events (column on touch-enabled devices)
        */
        handleColumnTouchStart(event, column, index) {
            if (!this.canDragColumn) return
            if (this.isDraggingRow) return
            event.preventDefault() // otherwise triggers touch-scrolling
            this.mayBeTouchDragging = true
        },
        /**
        * Emits dragover and dragleave events (column on touch-enabled devices)
        *
        * Also emits dragstart if this is the first touchmove after touchstart.
        */
        handleColumnTouchMove(event, column, index) {
            if (!this.canDragColumn) return
            if (!this.mayBeTouchDragging) return
            if (!this.isDraggingColumn) {
                this.draggedCellContent = event.target.innerHTML
                this.$refs.draggedCell.style.width = `${event.target.offsetWidth}px`
                event.target.dispatchEvent(translateTouchAsDragEvent(event, {
                    type: 'dragstart'
                }))
            }
            const touch = event.touches[0]
            const target = document.elementFromPoint(touch.clientX, touch.clientY)
            if (target != null) {
                if (target !== this.touchDragoverTarget) {
                    if (this.touchDragoverTarget != null) {
                        this.touchDragoverTarget.dispatchEvent(
                            translateTouchAsDragEvent(event, {
                                type: 'dragleave',
                                target: this.touchDragoverTarget
                            })
                        )
                    }
                    this.touchDragoverTarget = target
                    target.dispatchEvent(
                        translateTouchAsDragEvent(event, {
                            type: 'dragover',
                            target
                        })
                    )
                }
            } else if (this.touchDragoverTarget != null) {
                this.touchDragoverTarget.dispatchEvent(
                    translateTouchAsDragEvent(event, {
                        type: 'dragleave',
                        target: this.touchDragoverTarget
                    })
                )
                this.touchDragoverTarget = null
            }
            this.updateDraggedCell(touch)
        },
        /**
        * Emits drop and dragend events (column on touch-enabled devices)
        */
        handleColumnTouchEnd(event, column, index) {
            if (!this.canDragColumn) return
            if (this.isDraggingColumn) {
                const touch = event.changedTouches[0]
                const target = document.elementFromPoint(touch.clientX, touch.clientY)
                if (target != null) {
                    target.dispatchEvent(translateTouchAsDragEvent(event, {
                        type: 'drop',
                        target
                    }))
                }
                event.target.dispatchEvent(translateTouchAsDragEvent(event, {
                    type: 'dragend'
                }))
            }
            this.mayBeTouchDragging = false
        },

        updateDraggedCell({ clientX, clientY }) {
            const cellRect = this.$refs.draggedCell.getBoundingClientRect()
            const top = clientY + window.scrollY - cellRect.height / 2
            const left = clientX + window.scrollX - cellRect.width / 2
            this.$refs.draggedCell.style.top = `calc(${top}px)`
            this.$refs.draggedCell.style.left = `calc(${left}px)`
        },

        _registerTableColumn(column) {
            if (column._isTableColumn) {
                this.defaultSlots.push(column)
            }
        },
        _unregisterTableColumn(column) {
            const index = this.defaultSlots.indexOf(column)
            if (index !== -1) {
                this.defaultSlots.splice(index, 1)
            }
        }
    },
    mounted() {
        this.checkPredefinedDetailedRows()
        this.checkSort()
        // appends `draggedCell` to the body whenever `draggable` or
        // `draggableColumn` becomes true
        // starts watching here to make sure the DOM is ready
        function prepareDraggedCell(isDraggable) {
            if (isDraggable && this.$data._draggedCellEl == null) {
                this.$data._draggedCellEl = createAbsoluteElement(this.$refs.draggedCell)
            }
        }
        this.$watch('draggable', prepareDraggedCell, { immediate: true })
        this.$watch('draggableColumn', prepareDraggedCell, { immediate: true })
    },
    beforeUnmount() {
        if (this.$data._draggedCellEl) {
            removeElement(this.$data._draggedCellEl)
        }
    }
}
</script>
