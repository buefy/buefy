<template>
    <section>
        <p class="content"><b>Selected:</b> {{ selected }}</p>
        <b-field label="Find a movie">
            <b-autocomplete
                :data="data"
                placeholder="e.g. Fight Club"
                field="title"
                :loading="isFetching"
                @typing="getAsyncData"
                @select="(option: DataItem) => selected = option">

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
            </b-autocomplete>
        </b-field>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import debounce from 'lodash/debounce'
import { BAutocomplete, BField } from '@ntohq/buefy-next'

interface DataItem {
    title: string
    poster_path: string
    release_date: string
    vote_average: number
}

const ExCustomAsync = defineComponent({
    components: {
        BAutocomplete,
        BField
    },
    data() {
        return {
            data: [] as DataItem[],
            selected: null as DataItem | null,
            isFetching: false
        }
    },
    methods: {
        // You have to install and import debounce to use it,
        // it's not mandatory though.
        getAsyncData: debounce(function (name) {
            // @ts-expect-error debounce obscures `this` type but passes it through
            const self: InstanceType<typeof ExCustomAsync> = this
            if (!name.length) {
                self.data = []
                return
            }
            self.isFetching = true
            self.$http.get(`https://api.themoviedb.org/3/search/movie?api_key=bb6f51bef07465653c3e553d6ab161a8&query=${name}`)
                .then(({ data }) => {
                    self.data = []
                    data.results.forEach((item: DataItem) => self.data.push(item))
                })
                .catch((error) => {
                    self.data = []
                    throw error
                })
                .finally(() => {
                    self.isFetching = false
                })
        }, 500)
    }
})
export default ExCustomAsync
</script>
