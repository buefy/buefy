import { defineComponent } from 'vue'

import { escapeRegExpChars, getValueByPath, removeDiacriticsFromString } from '../../../utils/helpers'
import debounce from '../../../utils/debounce'
import type { TableFilterMixinHost, TableRow } from '../types'

// Handler for filters' changes.
type FiltersChangeHandler = (filters: Record<string, string | number>) => void

export default defineComponent({
    props: {
        backendFiltering: Boolean,
        filtersEvent: {
            type: String,
            default: ''
        },
        debounceSearch: Number
    },
    emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        'filters-change': (_value: Record<string, string | number>) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
    },
    data() {
        return {
            filters: {} as Record<string, string | number>,
            debouncedHandleFiltersChange: undefined as FiltersChangeHandler | undefined
        }
    },
    computed: {
        /*
        * Check if has any searchable column.
        */
        hasSearchablenewColumns() {
            return (this as unknown as TableFilterMixinHost).newColumns.some((column) => {
                return column.searchable
            })
        }
    },
    watch: {
        debounceSearch: {
            handler(value) {
                this.debouncedHandleFiltersChange = debounce(this.handleFiltersChange, value)
            },
            immediate: true
        },

        filters: {
            handler(value) {
                if (this.debounceSearch) {
                    this.debouncedHandleFiltersChange!(value)
                } else {
                    this.handleFiltersChange(value)
                }
            },
            deep: true
        }
    },
    methods: {
        onFiltersEvent(event: Event) {
            // @ts-expect-error  `filtersEvent` may be any native event, so we cannot exhaustively list possible values in `emits`. btw, the motivation for `filtersEvent`: https://github.com/buefy/buefy/issues/2297
            this.$emit(`filters-event-${this.filtersEvent}`, { event, filters: this.filters })
        },

        handleFiltersChange(value: Record<string, string | number>) {
            const host = this as unknown as TableFilterMixinHost
            if (this.backendFiltering) {
                this.$emit('filters-change', value)
            } else {
                host.newData = host.data.filter(
                    (row) => this.isRowFiltered(row))
                if (!host.backendPagination) {
                    host.newDataTotal = host.newData.length
                }
                if (!host.backendSorting) {
                    if (host.sortMultiple &&
                        host.sortMultipleDataLocal && host.sortMultipleDataLocal.length > 0) {
                        host.doSortMultiColumn()
                    } else if (Object.keys(host.currentSortColumn).length > 0) {
                        host.doSortSingleColumn(host.currentSortColumn)
                    }
                }
            }
        },

        isRowFiltered(row: TableRow) {
            const newColumns = (this as unknown as TableFilterMixinHost).newColumns
            for (const key in this.filters) {
                if (!this.filters[key]) continue
                const input = this.filters[key]
                const column = newColumns.filter((c) => c.field === key)[0]
                if (column && column.customSearch && typeof column.customSearch === 'function') {
                    if (!column.customSearch(row, input)) return false
                } else {
                    const value = getValueByPath(row, key)
                    if (value == null) return false
                    if (Number.isInteger(value)) {
                        if (value !== Number(input)) return false
                    } else {
                        const re = new RegExp(escapeRegExpChars(input + '')!, 'i')
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
        }
    }
})
