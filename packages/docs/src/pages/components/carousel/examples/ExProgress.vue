<template>
    <section>
        <div class="example-component">
            <b-field grouped group-multiline>
                <div class="control">
                    <b-switch v-model="progress"><strong>Progress</strong></b-switch>
                </div>
                <b-field label="Type" label-position="on-border">
                    <b-select v-model="progressType" :disabled="!progress">
                        <option value="is-primary">is-primary</option>
                        <option value="is-info">is-info</option>
                        <option value="is-success">is-success</option>
                        <option value="is-warning">is-warning</option>
                        <option value="is-danger">is-danger</option>
                        <option value="is-white">is-white</option>
                        <option value="is-light">is-light</option>
                        <option value="is-dark">is-dark</option>
                    </b-select>
                </b-field>
            </b-field>
        </div>

        <b-carousel
            :progress="progress"
            :progress-type="progressType">
            <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
                <section :class="`hero is-medium is-${carousel.color}`">
                    <div class="hero-body has-text-centered">
                        <h1 class="title">{{carousel.title}}</h1>
                    </div>
                </section>
            </b-carousel-item>
        </b-carousel>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BCarousel, BCarouselItem, BField, BSelect, BSwitch } from '@ntohq/buefy-next'

export default defineComponent({
    components: {
        BCarousel,
        BCarouselItem,
        BField,
        BSelect,
        BSwitch
    },
    data() {
        return {
            progress: true,
            progressType: 'is-primary',
            carousels: [
                { title: 'Slide 1', color: 'grey' },
                { title: 'Slide 2', color: 'dark' },
                { title: 'Slide 3', color: 'primary' },
                { title: 'Slide 4', color: 'info' }
            ]
        }
    }
})
</script>
