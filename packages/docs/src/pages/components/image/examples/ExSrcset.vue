<template>
    <section>
        <p>Source loaded: {{loadedSrc1}}</p>
        <b-image
            src="https://picsum.photos/id/1062/1600/900"
            srcset="https://picsum.photos/id/1062/400/225 400w, https://picsum.photos/id/1062/800/450 800w, https://picsum.photos/id/1062/1600/900 1600w"
            ratio="16by9"
            @load="onLoad1"
        ></b-image>
        <br>
        <p>Source loaded: {{loadedSrc2}}</p>
        <b-image
            src="https://picsum.photos/id/1074/1600/800"
            :srcset-sizes="[400, 800, 1600]"
            :srcset-formatter="this.formatSrcset"
            ratio="16by8"
            @load="onLoad2"
        ></b-image>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                loadedSrc1: '',
                loadedSrc2: '',
            }
        },
        methods: {
            onLoad1(event, src) {
                this.loadedSrc1 = src
            },
            onLoad2(event, src) {
                this.loadedSrc2 = src
            },
            formatSrcset(src, size) {
                return `https://picsum.photos/id/1074/${size}/${size / 2}`
            }
        }
    }
</script>
