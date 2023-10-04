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

<script>
export default {
    methods: {
      getImgUrl(value) {
          return `https://picsum.photos/id/43${value}/1230/500`
      }
    }
}
</script>

<style>
.is-active .al img {
    filter: grayscale(0%);
}
.al img {
    filter: grayscale(100%);
}
</style>
