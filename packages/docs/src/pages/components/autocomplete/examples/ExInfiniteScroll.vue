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
                @select="(option: DataItem) => selected = option"
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
                    <span v-show="page > totalPages" class="has-text-grey">
                        Thats it! No more movies found.
                    </span>
                </template>
            </b-autocomplete>
        </b-field>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import debounce from 'lodash/debounce'
import { BAutocomplete } from '@ntohq/buefy-next'

interface DataItem {
    title: string
    poster_path: string
    release_date: string
    vote_average: number
}

const ExInfiniteScroll = defineComponent({
    compnents: { BAutocomplete },
    data() {
        return {
            data: [] as DataItem[],
            selected: null as DataItem | null,
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
            // @ts-expect-error debounce obscures `this` type but passes it through
            const self = this as InstanceType<typeof ExInfiniteScroll>
            // String update
            if (self.name !== name) {
                self.name = name
                self.data = []
                self.page = 1
                self.totalPages = 1
            }
            // String cleared
            if (!name.length) {
                self.data = []
                self.page = 1
                self.totalPages = 1
                return
            }
            // Reached last page
            if (self.page > self.totalPages) {
                return
            }
            self.isFetching = true
            self.$http.get(`https://api.themoviedb.org/3/search/movie?api_key=bb6f51bef07465653c3e553d6ab161a8&query=${name}&page=${self.page}`)
                .then(({ data }) => {
                    data.results.forEach((item: DataItem) => self.data.push(item))

                    self.page++
                    self.totalPages = data.total_pages
                })
                .catch((error) => {
                    throw error
                })
                .finally(() => {
                    self.isFetching = false
                })
        }, 500),
        getMoreAsyncData: debounce(function () {
            // @ts-expect-error - debounce obscures `this` type but passes it through
            const self = this as InstanceType<typeof ExInfiniteScroll>
            self.getAsyncData(self.name)
        }, 250)
    }
})
export default ExInfiniteScroll
</script>
