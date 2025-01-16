<template>
    <b-carousel-list v-model="test" :data="items" :items-to-show="2">
        <template #item="list">
            <div class="card">
                <div class="card-image">
                    <figure class="image is-5by4">
                        <a @click="info(list.index)"><img :src="list.image"></a>
                    </figure>
                    <b-tag type="is-danger" rounded style="position: absolute; top: 0;"><b>50%</b></b-tag>
                </div>
                <div class="card-content">
                    <div class="content">
                        <p class="title is-6">{{ list.title }}</p>
                        <p class="subtitle is-7">@johnsmith</p>
                        <b-field grouped >
                            <p class="control" v-if="list.rating">
                                <b-rate :value="list.rating" show-score disabled/>
                            </p>
                            <p class="control" style="margin-left: auto">
                                <b-button size="is-small" type="is-danger" icon-left="heart" outlined />
                            </p>
                        </b-field>
                    </div>
                </div>
            </div>
        </template>
    </b-carousel-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BButton, BCarouselList, BField, BRate, BTag } from '@ntohq/buefy-next'

export default defineComponent({
    components: {
        BButton,
        BCarouselList,
        BField,
        BRate,
        BTag
    },
    data() {
        return {
            test: 0,
            items: [
                {
                    title: 'Slide 1',
                    image: 'https://buefy.org/static/img/placeholder-1280x960.png',
                    rating: 4.4
                },
                {
                    title: 'Slide 2',
                    image: 'https://buefy.org/static/img/placeholder-1280x960.png',
                    rating: 3.5
                },
                {
                    title: 'Slide 3',
                    image: 'https://buefy.org/static/img/placeholder-1280x960.png',
                    rating: 5
                },
                {
                    title: 'Slide 4',
                    image: 'https://buefy.org/static/img/placeholder-1280x960.png'
                },
                {
                    title: 'Slide 5',
                    image: 'https://buefy.org/static/img/placeholder-1280x960.png',
                    rating: 5
                },
                {
                    title: 'Slide 6',
                    image: 'https://buefy.org/static/img/placeholder-1280x960.png',
                    rating: 4
                },
                {
                    title: 'Slide 7',
                    image: 'https://buefy.org/static/img/placeholder-1280x960.png',
                    rating: 2.7
                },
                {
                    title: 'Slide 8',
                    image: 'https://buefy.org/static/img/placeholder-1280x960.png',
                    rating: 1.5
                }
            ]
        }
    },
    methods: {
        info(value: number) {
            this.test = value
        }
    }
})
</script>
