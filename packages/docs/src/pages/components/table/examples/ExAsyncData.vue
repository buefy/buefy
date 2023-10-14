<template>
    <section>
        <b-table
            :data="data"
            :loading="loading"

            paginated
            backend-pagination
            :total="total"
            :per-page="perPage"
            @page-change="onPageChange"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page"

            backend-sorting
            :default-sort-direction="defaultSortOrder"
            :default-sort="[sortField, sortOrder]"
            @sort="onSort">

            <b-table-column field="original_title" label="Title" sortable v-slot="props">
                {{ props.row.original_title }}
            </b-table-column>

            <b-table-column field="vote_average" label="Vote Average" numeric sortable v-slot="props">
                <span class="tag" :class="type(props.row.vote_average)">
                    {{ props.row.vote_average }}
                </span>
            </b-table-column>

            <b-table-column field="vote_count" label="Vote Count" numeric sortable v-slot="props">
                    {{ props.row.vote_count }}
            </b-table-column>

            <b-table-column field="release_date" label="Release Date" sortable centered v-slot="props">
                {{ props.row.release_date ? new Date(props.row.release_date).toLocaleDateString() : 'unknown' }}
            </b-table-column>

            <b-table-column label="Overview" width="500" v-slot="props">
                {{ truncate(props.row.overview, 80) }}
            </b-table-column>

        </b-table>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                data: [],
                total: 0,
                loading: false,
                sortField: 'vote_count',
                sortOrder: 'desc',
                defaultSortOrder: 'desc',
                page: 1,
                perPage: 20
            }
        },
        methods: {
            /*
        * Load async data
        */
            loadAsyncData() {
                const params = [
                    'api_key=bb6f51bef07465653c3e553d6ab161a8',
                    'language=en-US',
                    'include_adult=false',
                    'include_video=false',
                    `sort_by=${this.sortField}.${this.sortOrder}`,
                    `page=${this.page}`
                ].join('&')

                this.loading = true
                this.$http.get(`https://api.themoviedb.org/3/discover/movie?${params}`)
                    .then(({ data }) => {
                        // api.themoviedb.org manage max 1000 pages
                        this.data = []
                        let currentTotal = data.total_results
                        if (data.total_results / this.perPage > 1000) {
                            currentTotal = this.perPage * 1000
                        }
                        this.total = currentTotal
                        data.results.forEach((item) => {
                            item.release_date = item.release_date ? item.release_date.replace(/-/g, '/') : null
                            this.data.push(item)
                        })
                        this.loading = false
                    })
                    .catch((error) => {
                        this.data = []
                        this.total = 0
                        this.loading = false
                        throw error
                    })
            },
            /*
        * Handle page-change event
        */
            onPageChange(page) {
                this.page = page
                this.loadAsyncData()
            },
            /*
        * Handle sort event
        */
            onSort(field, order) {
                this.sortField = field
                this.sortOrder = order
                this.loadAsyncData()
            },
            /*
        * Type style in relation to the value
        */
            type(value) {
                const number = parseFloat(value)
                if (number < 6) {
                    return 'is-danger'
                } else if (number >= 6 && number < 8) {
                    return 'is-warning'
                } else if (number >= 8) {
                    return 'is-success'
                }
            },
            // filter is no longer supported on Vue 3
            truncate(value, length) {
                return value.length > length
                    ? value.substr(0, length) + '...'
                    : value
            }
        },
        mounted() {
            this.loadAsyncData()
        }
    }
</script>
