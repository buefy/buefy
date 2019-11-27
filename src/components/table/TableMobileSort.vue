<template>
    <div class="field table-mobile-sort">
        <div class="field has-addons">
            <b-select v-model="mobileSort" expanded>
                <template v-if="placeholder">
                    <option
                        v-show="showPlaceholder"
                        :value="{}"
                        selected
                        disabled
                        hidden>
                        {{ placeholder }}
                    </option>
                </template>
                <option
                    v-for="(column, index) in columns"
                    v-if="column.sortable"
                    :key="index"
                    :value="column">
                    {{ column.label }}
                </option>
            </b-select>
            <div class="control">
                <button
                    class="button is-primary"
                    @click="sort">
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
import Select from '../select/Select'
import Icon from '../icon/Icon'

export default {
    name: 'BTableMobileSort',
    components: {
        [Select.name]: Select,
        [Icon.name]: Icon
    },
    props: {
        currentSortColumn: Object,
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
        }
    },
    data() {
        return {
            mobileSort: this.currentSortColumn
        }
    },
    computed: {
        showPlaceholder() {
            return !this.columns || !this.columns.some((column) => column === this.mobileSort)
        }
    },
    watch: {
        mobileSort(column) {
            if (this.currentSortColumn === column) return

            this.$emit('sort', column)
        },
        currentSortColumn(column) {
            this.mobileSort = column
        }
    },
    methods: {
        sort() {
            this.$emit('sort', this.mobileSort)
        }
    }
}
</script>
