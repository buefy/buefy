<template>
    <b-carousel :indicator-inside="false">
        <b-carousel-item v-for="(item, i) in 6" :key="i">
            <b-image class="image" :src="getImgUrl(i)"></b-image>
        </b-carousel-item>
        <template #indicators="props">
            <b-image class="al image" :src="getImgUrl(props.i)" :title="props.i"></b-image>
        </template>
    </b-carousel>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BCarousel, BCarouselItem, BImage } from '@ntohq/buefy-next'

export default defineComponent({
    components: {
        BCarousel,
        BCarouselItem,
        BImage
    },
    methods: {
      getImgUrl(value: number) {
          return `https://picsum.photos/id/43${value}/1230/500`
      }
    }
})
</script>

<style>
.is-active .al img {
    filter: grayscale(0%);
}
.al img {
    filter: grayscale(100%);
}
</style>
