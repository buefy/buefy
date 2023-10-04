<template>
    <b-carousel :autoplay="false" indicator-custom :indicator-inside="false" :overlay="gallery" @click="switchGallery(true)">
        <b-carousel-item v-for="(item, i) in 20" :key="i">
            <a class="image ">
                <img :src="getImgUrl(i)">
            </a>
        </b-carousel-item>
        <span v-if="gallery" @click="switchGallery(false)" class="modal-close is-large"/>
        <template #indicators="props">
            <figure class="al image" :draggable="false">
                <img :draggable="false" :src="getImgUrl(props.i)" :title="props.i">
            </figure>
        </template>
    </b-carousel>
</template>

<script>
export default {
    data() {
        return {
            gallery: false
        }
    },
    methods: {
        getImgUrl(value) {
            value += 50
            return `https://picsum.photos/id/10${value}/1230/500`
        },
        switchGallery(value) {
            this.gallery = value
            if (value) {
                return document.documentElement.classList.add('is-clipped')
            } else {
                return document.documentElement.classList.remove('is-clipped')
            }
        }
    }
}
</script>

<style>
.is-active .al img {
    border: 1px solid #fff;
    filter: grayscale(0%);
}
.al img {
    border: 1px solid transparent;
    filter: grayscale(100%);
}
</style>
