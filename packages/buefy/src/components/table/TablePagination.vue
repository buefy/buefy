<template>
    <div class="top level">
        <div class="level-left">
            <slot />
        </div>

        <div class="level-right">
            <div v-if="paginated" class="level-item">
                <b-pagination
                    :icon-pack="iconPack"
                    :total="total"
                    :per-page="perPage"
                    :simple="paginationSimple"
                    :size="paginationSize"
                    :model-value="newCurrentPage"
                    :rounded="rounded"
                    @change="pageChanged"
                    :aria-next-label="ariaNextLabel"
                    :aria-previous-label="ariaPreviousLabel"
                    :aria-page-label="ariaPageLabel"
                    :aria-current-label="ariaCurrentLabel"
                    :page-input="pageInput"
                    :order="paginationOrder"
                    :page-input-position="pageInputPosition"
                    :debounce-page-input="debouncePageInput"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BPagination from '../pagination/Pagination.vue'

export default defineComponent({
    name: 'BTablePagination',
    components: {
        BPagination
    },
    props: {
        paginated: Boolean,
        total: [Number, String],
        perPage: [Number, String],
        currentPage: [Number, String],
        paginationSimple: Boolean,
        paginationSize: String,
        rounded: Boolean,
        iconPack: String,
        ariaNextLabel: String,
        ariaPreviousLabel: String,
        ariaPageLabel: String,
        ariaCurrentLabel: String,
        pageInput: Boolean,
        paginationOrder: String,
        pageInputPosition: String,
        debouncePageInput: [Number, String]
    },
    emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        'page-change': (_page: string | number) => true,
        'update:currentPage': (_page: string | number) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
    },
    data() {
        return {
            newCurrentPage: this.currentPage
        }
    },
    watch: {
        currentPage(newVal) {
            this.newCurrentPage = newVal
        }
    },
    methods: {
        /*
        * Paginator change listener.
        */
        pageChanged(page: number) {
            this.newCurrentPage = page > 0 ? page : 1
            this.$emit('update:currentPage', this.newCurrentPage)
            this.$emit('page-change', this.newCurrentPage)
        }
    }
})
</script>
