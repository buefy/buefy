<template>
    <div class="field table-mobile-sort">
        <div class="field has-addons">
            <b-select
                v-model="sortMultipleSelectIndex"
                expanded
                v-if="sortMultiple"
            >
                <option
                    v-for="(column, index) in sortableColumns"
                    :key="index"
                    :value="index"
                >
                    {{ getLabel(column) }}
                    <template v-if="getSortingObjectOfColumn(column)">
                        <template v-if="columnIsDesc(column)">
                            &#8595;
                        </template>
                        <template v-else>
                            &#8593;
                        </template>
                    </template>
                </option>
            </b-select>
            <b-select
                v-model="mobileSortIndex"
                expanded
                v-else
            >
                <template v-if="placeholder">
                    <option
                        v-show="showPlaceholder"
                        :value="{}"
                        selected
                        disabled
                        hidden
                    >
                        {{ placeholder }}
                    </option>
                </template>
                <option
                    v-for="(column, index) in sortableColumns"
                    :key="index"
                    :value="index"
                >
                    {{ column.label }}
                </option>
            </b-select>
            <div class="control">
                <template
                    v-if="sortMultiple && sortMultipleData.length > 0"
                >
                    <button
                        class="button is-primary"
                        @click="sort"
                    >
                        <b-icon
                            :class="{ 'is-desc': columnIsDesc(sortMultipleSelect) }"
                            :icon="sortIcon"
                            :pack="iconPack"
                            :size="sortIconSize"
                            both
                        />
                    </button>
                    <button
                        class="button is-primary"
                        @click="removePriority"
                    >
                        <b-icon
                            icon="delete"
                            :size="sortIconSize"
                            both
                        />
                    </button>
                </template>
                <button
                    v-else-if="!sortMultiple"
                    class="button is-primary"
                    @click="sort"
                >
                    <b-icon
                        v-show="currentSortColumn === mobileSort"
                        :class="{ 'is-desc': !isAsc }"
                        :icon="sortIcon"
                        :pack="iconPack"
                        :size="sortIconSize"
                        both
                    />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import Select from '../select/Select.vue'
import Icon from '../icon/Icon.vue'

export default {
    name: 'BTableMobileSort',
    components: {
        [Select.name]: Select,
        [Icon.name]: Icon
    },
    props: {
        currentSortColumn: Object,
        sortMultipleData: Array,
        isAsc: Boolean,
        columns: Array,
        placeholder: String,
        iconPack: String,
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
        }
    },
    emits: ['removePriority', 'sort'],
    data() {
        return {
            sortMultipleSelect: '',
            sortMultipleSelectIndex: -1,
            mobileSort: this.currentSortColumn,
            mobileSortIndex: this.columns ? this.columns.indexOf(this.currentSortColumn) : -1,
            defaultEvent: {
                shiftKey: true,
                altKey: true,
                ctrlKey: true
            },
            ignoreSort: false
        }
    },
    computed: {
        showPlaceholder() {
            return !this.columns || !this.columns.some((column) => column === this.mobileSort)
        },
        sortableColumns() {
            return this.columns && this.columns.filter((column) => column.sortable)
        }
    },
    watch: {
        sortMultipleSelect(column) {
            if (this.ignoreSort) {
                this.ignoreSort = false
            } else {
                this.$emit('sort', column, this.defaultEvent)
            }
        },
        sortMultipleSelectIndex(index) {
            if (index !== -1) {
                this.sortMultipleSelect = this.columns[index]
            } else {
                this.sortMultipleSelect = null
            }
        },
        mobileSort(column) {
            if (this.currentSortColumn === column) return

            this.$emit('sort', column, this.defaultEvent)
        },
        mobileSortIndex(index) {
            if (index !== -1) {
                this.mobileSort = this.columns[index]
            }
            // `index` becomes -1 if `currentSortColumn` is not in `columns`
            // never resets to null but retains `mobileSort` in that case
        },
        currentSortColumn(column) {
            // replaces `mobileSort` whether `column` is in `columns` or not
            this.mobileSort = column
            this.mobileSortIndex = this.columns ? this.columns.indexOf(column) : -1
        },
        columns(newColumns) {
            if (this.sortMultiple) {
                this.sortMultipleSelectIndex = newColumns.indexOf(
                    this.sortMultipleSelect
                )
            } else {
                this.mobileSortIndex = newColumns.indexOf(this.mobileSort)
            }
        }
    },
    methods: {
        removePriority() {
            this.$emit('removePriority', this.sortMultipleSelect)
            // ignore the watcher to sort when we just change whats displayed in the select
            // otherwise the direction will be flipped
            // The sort event is already triggered by the emit
            this.ignoreSort = true
            // Select one of the other options when we reset one
            const remainingFields = this.sortMultipleData.filter((data) =>
                data.field !== this.sortMultipleSelect.field)
                .map((data) => data.field)
            this.sortMultipleSelectIndex = this.columns.findIndex((column) =>
                remainingFields.includes(column.field))
        },
        getSortingObjectOfColumn(column) {
            return this.sortMultipleData.filter((i) =>
                i.field === column.field)[0]
        },
        columnIsDesc(column) {
            const sortingObject = this.getSortingObjectOfColumn(column)
            if (sortingObject) {
                return !!(sortingObject.order && sortingObject.order === 'desc')
            }
            return true
        },
        getLabel(column) {
            const sortingObject = this.getSortingObjectOfColumn(column)
            if (sortingObject) {
                return column.label + '(' + (this.sortMultipleData.indexOf(sortingObject) + 1) + ')'
            }
            return column.label
        },
        sort() {
            this.$emit('sort', (this.sortMultiple ? this.sortMultipleSelect : this.mobileSort), this.defaultEvent)
        }
    }
}
</script>
