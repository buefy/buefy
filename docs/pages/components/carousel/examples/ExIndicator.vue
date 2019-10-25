<template>
    <b-carousel :indicator-inside="false">
        <b-carousel-item v-for="(item, i) in 6" :key="i">
            <a class="image">
              <img :src="getImgUrl(i)">
            </a>
        </b-carousel-item>
        <template slot="indicators" slot-scope="props">
            <span class="al image">
                <img :src="getImgUrl(props.i)" :title="props.i">
            </span>
        </template>     
    </b-carousel>
</template>

<script>
export default {
    methods: {
      getImgUrl(value) {
          return `https://source.unsplash.com/1230x500/?${value}`
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
