<template>
    <b-carousel :indicator-inside="false">
        <b-carousel-item v-for="s in 6" :key="s">
            <a class="image">
              <img :src="getImgUrl(s)" alt="">
            </a>
        </b-carousel-item>
        <template slot="indicators" slot-scope="props">
            <span
                class="al image"
                :class="{'is-active': (props.i === props.active)}">
                <img :src="getImgUrl(props.i + 1)">
            </span>    
        </template>                      
    </b-carousel>
</template>

<script>
export default {
    methods: {
      getImgUrl(i) {
          return `https://picsum.photos/id/43${i}/1230/500`
      }
    }
}
</script>

<style>
.al img {
    filter: grayscale(100%);
}
.al.is-active img {
    filter: grayscale(0%);
}
</style>
