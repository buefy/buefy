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
                    :current="currentPage"
                    :rounded="rounded"
                    @change="pageChanged"
                    :aria-next-label="ariaNextLabel"
                    :aria-previous-label="ariaPreviousLabel"
                    :aria-page-label="ariaPageLabel"
                    :aria-current-label="ariaCurrentLabel" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BTablePagination',
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
        ariaCurrentLabel: String
    },
    data() {
        return {
            newCurrentPage: this.currentPage
        }
    },
    watch: {
        current(newVal) {
            this.newCurrentPage = newVal
        }
    },
    methods: {
        /**
        * Paginator change listener.
        */
        pageChanged(page) {
            this.newCurrentPage = page > 0 ? page : 1
            this.$emit('page-change', this.newCurrentPage)
            this.$emit('update:currentPage', this.newCurrentPage)
        }
    }
}
</script>
