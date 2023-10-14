<template>
    <section>
        <p class="content"><b>Selected:</b> {{ selected }}</p>
        <b-field label="Find a movie">
            <b-autocomplete
                :data="data"
                placeholder="e.g. Fight Club"
                field="title"
                :loading="isFetching"
                :check-infinite-scroll="true"
                @typing="getAsyncData"
                @select="option => selected = option"
                @infinite-scroll="getMoreAsyncData">

                <template v-slot="props">
                    <div class="media">
                        <div class="media-left">
                            <img width="32" :src="`https://image.tmdb.org/t/p/w500/${props.option.poster_path}`">
                        </div>
                        <div class="media-content">
                            {{ props.option.title }}
                            <br>
                            <small>
                                Released at {{ props.option.release_date }},
                                rated <b>{{ props.option.vote_average }}</b>
                            </small>
                        </div>
                    </div>
                </template>
                <template #footer>
                    <span v-show="page > totalPages" class="has-text-grey"> Thats it! No more movies found. </span>
                </template>
            </b-autocomplete>
        </b-field>
    </section>
</template>

<script>
    import debounce from 'lodash/debounce'

    export default {
        data() {
            return {
                data: [],
                selected: null,
                isFetching: false,
                name: '',
                page: 1,
                totalPages: 1
            }
        },
        methods: {
            // You have to install and import debounce to use it,
            // it's not mandatory though.
            getAsyncData: debounce(function (name) {
                // String update
                if (this.name !== name) {
                    this.name = name
                    this.data = []
                    this.page = 1
                    this.totalPages = 1
                }
                // String cleared
                if (!name.length) {
                    this.data = []
                    this.page = 1
                    this.totalPages = 1
                    return
                }
                // Reached last page
                if (this.page > this.totalPages) {
                    return
                }
                this.isFetching = true
                this.$http.get(`https://api.themoviedb.org/3/search/movie?api_key=bb6f51bef07465653c3e553d6ab161a8&query=${name}&page=${this.page}`)
                    .then(({ data }) => {
                        data.results.forEach((item) => this.data.push(item))

                        this.page++
                        this.totalPages = data.total_pages
                    })
                    .catch((error) => {
                        throw error
                    })
                    .finally(() => {
                        this.isFetching = false
                    })
            }, 500),
            getMoreAsyncData: debounce(function () {
                this.getAsyncData(this.name)
            }, 250)
        }
    }
</script>
