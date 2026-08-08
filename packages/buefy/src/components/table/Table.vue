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
                            :style="[column.thStyle, stickyLeftStyles[index]]"
                            @click.stop="sort(column, null, $event)"
                            :draggable="canDragColumn"
                            @dragstart="handleColumnDragStart($event, column, index)"
                            @dragend="handleColumnDragEnd($event, column, index)"
                            @drop="handleColumnDrop($event, column, index)"
                            @dragover="handleColumnDragOver($event, column, index)"
                            @dragleave="handleColumnDragLeave($event, column, index)"
                            @touchstart="handleColumnTouchStart($event)"
                            @touchmove="handleColumnTouchMove($event)"
                            @touchend="handleColumnTouchEnd($event)"
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
                                </template>
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
                            :style="[column.thStyle, stickyLeftStyles[index]]"
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
                                        v-model="filters[column.field!]"
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
                            @touchstart="handleTouchStart($event, row)"
                            @touchmove="handleTouchMove($event)"
                            @touchend="handleTouchEnd($event)"
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
                                        :style="[
                                            column.getRootStyle(row), stickyLeftStyles[colindex]
                                        ]"
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

<script lang="ts">
import { camelize, defineComponent, toHandlerKey } from 'vue'
import type { PropType } from 'vue'

import type { VueClassAttribute } from '../../utils/config'
import { toCssWidth, isFragment } from '../../utils/helpers'
import CompatFallthroughMixin from '../../utils/CompatFallthroughMixin'
import TableCheckableMixin from './mixins/TableCheckableMixin'
import TableDetailMixin from './mixins/TableDetailMixin'
import TableDragMixin from './mixins/TableDragMixin'
import TableSortMixin from './mixins/TableSortMixin'
import TableFilterMixin from './mixins/TableFilterMixin'
import BCheckbox from '../checkbox/Checkbox.vue'
import BIcon from '../icon/Icon.vue'
import BInput from '../input/Input.vue'
import BLoading from '../loading/Loading.vue'
import BSlotComponent from '../../utils/SlotComponent'
import BTableMobileSort from './TableMobileSort.vue'
import BTablePagination from './TablePagination.vue'
import mockTableColumn from './mockTableColumn'
import { computeStickyOffsets } from './tableStickyOffsets'
import type {
    ITableColumn,
    TableColumnProps,
    TableRow
} from './types'

export default defineComponent({
    name: 'BTable',
    components: {
        BCheckbox,
        BIcon,
        BInput,
        BLoading,
        BSlotComponent,
        BTableMobileSort,
        BTablePagination
    },
    mixins: [
        CompatFallthroughMixin,
        TableCheckableMixin,
        TableDetailMixin,
        TableDragMixin,
        TableSortMixin,
        TableFilterMixin
    ],
    provide() {
        return {
            $table: this
        }
    },
    props: {
        data: {
            type: Array as PropType<TableRow[]>,
            default: () => []
        },
        columns: {
            type: Array as PropType<TableColumnProps[]>,
            default: () => []
        },
        bordered: Boolean,
        striped: Boolean,
        narrowed: Boolean,
        hoverable: Boolean,
        loading: Boolean,
        selected: Object as PropType<TableRow>,
        isRowSelectable: {
            type: Function,
            default: () => true
        },
        focusable: Boolean,
        mobileCards: {
            type: Boolean,
            default: true
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
        paginationPosition: {
            type: String,
            default: 'bottom',
            validator: (value) => {
                return [
                    'bottom',
                    'top',
                    'both'
                ].indexOf(value as string) >= 0
            }
        },
        paginationRounded: Boolean,
        rowClass: {
            type: Function as PropType<(row: TableRow, index: number) => VueClassAttribute>,
            default: () => ''
        },
        backendPagination: Boolean,
        total: {
            type: [Number, String],
            default: 0
        },
        iconPack: String,
        customRowKey: String,
        scrollable: Boolean,
        ariaNextLabel: String,
        ariaPreviousLabel: String,
        ariaPageLabel: String,
        ariaCurrentLabel: String,
        stickyHeader: Boolean,
        height: [Number, String],
        cardLayout: Boolean,
        showHeader: {
            type: Boolean,
            default: true
        },
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
    emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        cellclick: (
            _row: TableRow,
            _column: ITableColumn,
            _rowIndex: number,
            _colIndex: number
        ) => true,
        click: (_row: TableRow) => true,
        contextmenu: (_row: TableRow, _event: MouseEvent) => true,
        dblclick: (_row: TableRow) => true,
        'page-change': (_page: string | number) => true,
        select: (_new: TableRow, _old: TableRow) => true,
        'update:currentPage': (_page: string | number) => true,
        'update:selected': (_row: TableRow) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
    },
    data() {
        return {
            newData: this.data,
            newDataTotal: this.backendPagination ? this.total : this.data.length,
            newCurrentPage: this.currentPage,
            defaultSlots: [] as ITableColumn[],
            // row tapped before a touch-drag may begin; see `TableDragMixin`
            _selectedRow: null
        }
    },
    computed: {
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
                height: toCssWidth(this.height)!
            }
        },
        touchDraggedCellClasses() {
            return {
                'has-mobile-cards': this.mobileCards
            }
        },

        /*
        * Splitted data based on the pagination.
        */
        visibleData() {
            if (!this.paginated) return this.newData

            const currentPage = this.newCurrentPage
            const perPage = +this.perPage

            if (this.newData.length <= perPage) {
                return this.newData
            } else {
                const start = (currentPage - 1) * perPage
                const end = parseInt(start + '', 10) + parseInt(perPage + '', 10)
                return this.newData.slice(start, end)
            }
        },

        visibleColumns() {
            if (!this.newColumns) return this.newColumns
            return this.newColumns.filter((column) => {
                return column.visible || column.visible === undefined
            })
        },

        /*
        * Check if has any column using subheading.
        */
        hasCustomSubheadings() {
            if (this.$slots && this.$slots.subheading) return true
            return this.newColumns.some((column) => {
                return column.subheading || column.$slots.subheading
            })
        },

        /*
        * Return total column count based if it's checkable or expanded
        */
        columnCount() {
            let count = this.visibleColumns.length
            count += this.checkable ? 1 : 0
            count += (this.detailed && this.showDetailIcon) ? 1 : 0

            return count
        },

        /*
        * return if detailed row tabled
        * will be with chevron column & icon or not
        */
        showDetailRowIcon() {
            return this.detailed && this.showDetailIcon
        },

        /*
        * return if scrollable table
        */
        isScrollable() {
            if (this.scrollable) return true
            if (!this.newColumns) return false
            return this.newColumns.some((column) => {
                return column.sticky
            })
        },

        /*
        * Cumulative `left` px offset for each visible column, so stacked
        * sticky columns don't all pin to `left: 0` and overlap.
        * See https://github.com/buefy/buefy/discussions/4028.
        */
        stickyOffsetsPx() {
            return computeStickyOffsets(this.visibleColumns, {
                hasStickyCheckboxLeft:
                    this.checkable && this.stickyCheckbox && this.checkboxPosition === 'left'
            })
        },
        stickyLeftStyles() {
            return this.visibleColumns.map((column, index) => {
                return column.sticky ? { left: `${this.stickyOffsetsPx[index]}px` } : undefined
            })
        },

        newColumns() {
            if (this.columns && this.columns.length) {
                return this.columns.map((column) => {
                    return mockTableColumn(this, column)
                })
            }
            return this.defaultSlots
        }
    },
    watch: {
        /*
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
                    (row: TableRow) => this.isRowFiltered(row))
            }
            if (!this.backendSorting) {
                this.sort(this.currentSortColumn, true)
            }
            if (!this.backendPagination) {
                this.newDataTotal = this.newData.length
            }
        },

        /*
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
        }
    },
    methods: {
        isRowSelected(row: TableRow, selected: TableRow | undefined) {
            if (!selected) {
                return false
            }
            if (this.customRowKey) {
                return row[this.customRowKey] === selected[this.customRowKey]
            }
            return row === selected
        },

        /*
        * Row click listener.
        * Emit all necessary events.
        */
        selectRow(row: TableRow) {
            this.$emit('click', row)

            this._selectedRow = row // row must be clicked before dragging by touch
            if (this.selected === row) return
            if (!this.isRowSelectable(row)) return

            // Emit new and old row
            this.$emit('select', row, this.selected)

            // Emit new row to update user variable
            this.$emit('update:selected', row)
        },

        /*
        * Check if footer slot has custom content.
        *
        * Assumes that `$slots.footer` is specified.
        */
        hasCustomFooterSlot() {
            const footer = this.$slots.footer!()
            if (footer.length > 1) return true

            // if a template is specified to `footer`, `footer.length` is 1
            // but should contain multiple elements.
            if (isFragment(footer[0])) return true

            const tag = footer[0].el?.tag
            if (tag !== 'th' && tag !== 'td') return false

            return true
        },

        /*
        * Check if bottom-left slot exists.
        */
        hasBottomLeftSlot() {
            return typeof this.$slots['bottom-left'] !== 'undefined'
        },

        /*
        * Table arrow keys listener, change selection.
        */
        pressedArrow(pos: number) {
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
                if (newIndex! >= 0) {
                    this.selectRow(this.visibleData[newIndex!])
                }
            } else {
                this.selectRow(row)
            }
        },

        /*
        * Focus table element if has selected prop.
        */
        focus() {
            if (!this.focusable) return

            this.$el.querySelector('table').focus()
        },

        // this method is for "mouseenter", and "mouseleave" events.
        // the original idea of this method was introduced by the PR
        // https://github.com/buefy/buefy/pull/2150
        // to address some performance issues related to these events.
        // I am not sure whether the justification made at the PR is still
        // relevant to Vue 3.
        // btw, this function was made by the PR https://github.com/buefy/buefy/pull/3236
        emitEventForRow(eventName: string, event: Event, row: TableRow) {
            // eventName should not be in `emits` because it won't be included
            // in `$attrs` if it is listed in `emits`.
            // less known `toHandlerKey` helps us to make a proper name for the
            // listener. the following code also supports camelCase event names
            // but may be too much for our use case.
            // reference: https://github.com/vuejs/core/blob/a48ffdad65d9c97eb0a342a6cd53836a16289afe/packages/runtime-core/src/componentEmits.ts#L194-L197
            const listener =
                this.$attrs[toHandlerKey(eventName)] ||
                this.$attrs[toHandlerKey(camelize(eventName))]
            // @ts-expect-error $emit expects a name in the `emits` list
            return listener != null ? this.$emit(eventName, row, event) : null
        },

        _registerTableColumn(column: ITableColumn) {
            if (column._isTableColumn) {
                this.defaultSlots.push(column)
            }
        },
        _unregisterTableColumn(column: ITableColumn) {
            const index = this.defaultSlots.indexOf(column)
            if (index !== -1) {
                this.defaultSlots.splice(index, 1)
            }
        }
    },
    mounted() {
        this.checkPredefinedDetailedRows()
        this.checkSort()
    }
})
</script>
